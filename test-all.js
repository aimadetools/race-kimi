const mockEl = () => ({
  addEventListener: () => {},
  classList: { add: () => {}, remove: () => {} },
  textContent: '',
  innerHTML: '',
  value: '',
  style: {},
  appendChild: () => {},
  remove: () => {}
});
global.document = {
  getElementById: () => mockEl(),
  querySelectorAll: () => [],
  querySelector: () => mockEl(),
  addEventListener: () => {},
  createElement: () => mockEl(),
  body: { appendChild: () => {}, removeChild: () => {} }
};
global.location = { hash: '', pathname: '/', origin: 'http://test' };
global.navigator = { clipboard: { writeText: () => Promise.resolve() } };
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.history = { replaceState: () => {} };
global.window = { matchMedia: () => ({ matches: false }) };

const fs = require('fs');
const html = fs.readFileSync('app.html', 'utf8');
const scripts = [...html.matchAll(/<script>(?!.*src)([\s\S]*?)<\/script>/g)].map(m => m[1]);
const script = scripts.find(s => s.includes('function parseSQL')) || scripts[scripts.length - 1];
const fn = new Function(script + '; return { parseSQL, diffSchemas, generateMigration, generateRollbackMigration, quoteId, detectBreakingChanges, generateMigrationWarnings };');
const { parseSQL, diffSchemas, generateMigration, generateRollbackMigration, quoteId, detectBreakingChanges, generateMigrationWarnings } = fn();

function testDialect(name, sql) {
  try {
    const schema = parseSQL(sql, name);
    const tables = Object.keys(schema.tables);
    console.log(name + ': OK —', tables.length, 'tables (' + tables.join(', ') + ')');
    return true;
  } catch (e) {
    console.log(name + ': FAIL —', e.message);
    return false;
  }
}

const pg = `CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL);`;
const my = `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL);`;
const sq = `CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);`;
const ms = `CREATE TABLE users (id INT IDENTITY(1,1) PRIMARY KEY, name NVARCHAR(100) NOT NULL);`;
const ora = `CREATE TABLE users (id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name VARCHAR2(100) NOT NULL);`;

let ok = 0;
if (testDialect('postgres', pg)) ok++;
if (testDialect('mysql', my)) ok++;
if (testDialect('sqlite', sq)) ok++;
if (testDialect('mssql', ms)) ok++;
if (testDialect('oracle', ora)) ok++;

// Trigger parsing test
const triggerSQL = `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE TRIGGER update_timestamp BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
`;

const triggerSQLB = `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE TRIGGER update_timestamp BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER audit_log AFTER INSERT OR DELETE ON users FOR EACH ROW EXECUTE FUNCTION audit_trigger();
`;

const schemaTrigA = parseSQL(triggerSQL, 'postgres');
const schemaTrigB = parseSQL(triggerSQLB, 'postgres');
const triggerDiff = diffSchemas(schemaTrigA, schemaTrigB);

if (schemaTrigA.triggers.length === 1 && schemaTrigB.triggers.length === 2 && triggerDiff.triggersAdded.length === 1) {
  console.log('trigger: OK — 1 trigger added detected');
  ok++;
} else {
  console.log('trigger: FAIL — expected 1 trigger added, got', triggerDiff.triggersAdded.length);
}

// Trigger modification test
const triggerSQLC = `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE TRIGGER update_timestamp AFTER UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_v2();
`;

const schemaTrigC = parseSQL(triggerSQLC, 'postgres');
const triggerModDiff = diffSchemas(schemaTrigA, schemaTrigC);

if (triggerModDiff.triggersModified.length === 1) {
  console.log('trigger-mod: OK — 1 trigger modification detected');
  ok++;
} else {
  console.log('trigger-mod: FAIL — expected 1 trigger modified, got', triggerModDiff.triggersModified.length);
}

// View parsing and diff test
const viewSQLA = `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE VIEW active_users AS SELECT * FROM users WHERE status = 'active';
`;

const viewSQLB = `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE VIEW active_users AS SELECT id, name FROM users WHERE status = 'active' AND deleted_at IS NULL;
CREATE VIEW user_count AS SELECT COUNT(*) FROM users;
`;

const schemaViewA = parseSQL(viewSQLA, 'postgres');
const schemaViewB = parseSQL(viewSQLB, 'postgres');
const viewDiff = diffSchemas(schemaViewA, schemaViewB);

if (schemaViewA.views && schemaViewA.views.active_users && viewDiff.viewsAdded.length === 1 && viewDiff.viewsModified.length === 1) {
  console.log('view: OK — 1 view added, 1 view modified detected');
  ok++;
} else {
  console.log('view: FAIL — expected 1 added + 1 modified, got added:', viewDiff.viewsAdded.length, 'modified:', viewDiff.viewsModified.length);
}

// Function parsing and diff test
const funcSQLA = `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE FUNCTION update_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;
`;

const funcSQLB = `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE FUNCTION update_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;
CREATE FUNCTION get_user_count() RETURNS INTEGER LANGUAGE sql AS $$ SELECT COUNT(*) FROM users; $$;
`;

const funcSQLC = `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE FUNCTION update_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;
`;

const schemaFuncA = parseSQL(funcSQLA, 'postgres');
const schemaFuncB = parseSQL(funcSQLB, 'postgres');
const schemaFuncC = parseSQL(funcSQLC, 'postgres');
const funcDiff = diffSchemas(schemaFuncA, schemaFuncB);
const funcModDiff = diffSchemas(schemaFuncA, schemaFuncC);

if (schemaFuncA.functions && schemaFuncA.functions['update_updated_at'] && funcDiff.functionsAdded.length === 1) {
  console.log('function: OK — 1 function added detected');
  ok++;
} else {
  console.log('function: FAIL — expected 1 function added, got', funcDiff.functionsAdded.length, 'functions parsed:', Object.keys(schemaFuncA.functions || {}));
}

if (funcModDiff.functionsModified.length === 1) {
  console.log('function-mod: OK — 1 function modification detected');
  ok++;
} else {
  console.log('function-mod: FAIL — expected 1 function modified, got', funcModDiff.functionsModified.length);
}

// Procedure parsing test
const procSQL = `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE PROCEDURE archive_old_users() LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM users WHERE last_login < NOW() - INTERVAL '1 year';
END;
$$;
`;

const schemaProc = parseSQL(procSQL, 'postgres');
if (schemaProc.functions && schemaProc.functions['archive_old_users'] && schemaProc.functions['archive_old_users'].isProcedure) {
  console.log('procedure: OK — 1 procedure parsed');
  ok++;
} else {
  console.log('procedure: FAIL — expected 1 procedure parsed, keys:', Object.keys(schemaProc.functions || {}));
}

// Constraint parsing and diff test
const constraintSQLA = `CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  CONSTRAINT uq_sku UNIQUE (sku),
  CONSTRAINT chk_price_positive CHECK (price > 0)
);`;

const constraintSQLB = `CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  category_id INTEGER,
  CONSTRAINT uq_sku UNIQUE (sku),
  CONSTRAINT chk_price_positive CHECK (price > 0),
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id)
);`;

const schemaConsA = parseSQL(constraintSQLA, 'postgres');
const schemaConsB = parseSQL(constraintSQLB, 'postgres');
const consDiff = diffSchemas(schemaConsA, schemaConsB);

if (consDiff.tablesModified.length === 1 &&
    consDiff.tablesModified[0].constraintsAdded.length === 1 &&
    consDiff.tablesModified[0].constraintsAdded[0].type === 'FOREIGN KEY' &&
    consDiff.tablesModified[0].columnsAdded.length === 1) {
  console.log('constraint-diff: OK — FK constraint added detected');
  ok++;
} else {
  console.log('constraint-diff: FAIL — expected 1 FK added, got', consDiff.tablesModified[0]?.constraintsAdded?.length, 'constraints added');
}

// EXCLUDE constraint parsing test
const excludeSQL = `CREATE TABLE room_reservations (
  room_id INT NOT NULL,
  during TSRANGE NOT NULL,
  EXCLUDE USING gist (room_id WITH =, during WITH &&)
);`;

const schemaExclude = parseSQL(excludeSQL, 'postgres');
const excludeTable = schemaExclude.tables['room_reservations'];
if (excludeTable && excludeTable.constraints.length === 1 &&
    excludeTable.constraints[0].type === 'EXCLUDE' &&
    excludeTable.constraints[0].using === 'gist' &&
    excludeTable.constraints[0].expression.includes('room_id')) {
  console.log('exclude: OK — EXCLUDE constraint parsed');
  ok++;
} else {
  console.log('exclude: FAIL — EXCLUDE constraint not parsed correctly, constraints:', excludeTable?.constraints);
}

// Constraint migration generation test
const migration = generateMigration(consDiff, 'postgres');
if (migration.includes('ADD CONSTRAINT') && migration.includes('FOREIGN KEY')) {
  console.log('constraint-migration: OK — migration SQL includes constraint changes');
  ok++;
} else {
  console.log('constraint-migration: FAIL — migration SQL missing constraint DDL');
}

// View parsing test
const viewSQL = `CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255));
CREATE VIEW active_users AS SELECT id, email FROM users WHERE email IS NOT NULL;
`;
const schemaView = parseSQL(viewSQL, 'postgres');
if (schemaView.views && schemaView.views['active_users'] && schemaView.views['active_users'].query.includes('SELECT')) {
  console.log('view-parse: OK — 1 view parsed');
  ok++;
} else {
  console.log('view-parse: FAIL — view not parsed correctly, views:', Object.keys(schemaView.views || {}));
}

// View dependency breaking change test — dropped table referenced by view
const viewDepSQLA = `CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255));
CREATE VIEW active_users AS SELECT id, email FROM users WHERE email IS NOT NULL;
`;
const viewDepSQLB = `CREATE TABLE orders (id SERIAL PRIMARY KEY, total DECIMAL(10,2));
CREATE VIEW active_users AS SELECT id, email FROM users WHERE email IS NOT NULL;
`;
const schemaViewDepA = parseSQL(viewDepSQLA, 'postgres');
const schemaViewDepB = parseSQL(viewDepSQLB, 'postgres');
const viewDepDiff = diffSchemas(schemaViewDepA, schemaViewDepB);
viewDepDiff.schemaA = schemaViewDepA;
viewDepDiff.schemaB = schemaViewDepB;
const viewDepBreaking = detectBreakingChanges(viewDepDiff);
if (viewDepBreaking.some(b => b.type === 'VIEW_DEPENDENCY' && b.table === 'users')) {
  console.log('view-dep-table: OK — breaking change detected for dropped table referenced by view');
  ok++;
} else {
  console.log('view-dep-table: FAIL — expected VIEW_DEPENDENCY breaking change for dropped table, got:', viewDepBreaking);
}

// View dependency breaking change test — dropped column referenced by view
const viewColSQLA = `CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255), name VARCHAR(100));
CREATE VIEW user_emails AS SELECT id, email, name FROM users;
`;
const viewColSQLB = `CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255));
CREATE VIEW user_emails AS SELECT id, email, name FROM users;
`;
const schemaViewColA = parseSQL(viewColSQLA, 'postgres');
const schemaViewColB = parseSQL(viewColSQLB, 'postgres');
const viewColDiff = diffSchemas(schemaViewColA, schemaViewColB);
viewColDiff.schemaA = schemaViewColA;
viewColDiff.schemaB = schemaViewColB;
const viewColBreaking = detectBreakingChanges(viewColDiff);
if (viewColBreaking.some(b => b.type === 'VIEW_DEPENDENCY' && b.column === 'name')) {
  console.log('view-dep-column: OK — breaking change detected for dropped column referenced by view');
  ok++;
} else {
  console.log('view-dep-column: FAIL — expected VIEW_DEPENDENCY breaking change for dropped column, got:', viewColBreaking);
}

// Rollback migration generation test
const rollbackMigration = generateRollbackMigration(consDiff, 'postgres');
if (rollbackMigration.includes('DROP CONSTRAINT') && rollbackMigration.includes('DROP COLUMN')) {
  console.log('rollback-migration: OK — rollback SQL includes inverse constraint and column changes');
  ok++;
} else {
  console.log('rollback-migration: FAIL — rollback SQL missing inverse constraint DDL');
}

// Rollback type change test
const typeChangeOld = `CREATE TABLE products (id SERIAL PRIMARY KEY, price DECIMAL(10,2));`;
const typeChangeNew = `CREATE TABLE products (id SERIAL PRIMARY KEY, price DECIMAL(12,2));`;
const schemaTypeOld = parseSQL(typeChangeOld, 'postgres');
const schemaTypeNew = parseSQL(typeChangeNew, 'postgres');
const typeDiff = diffSchemas(schemaTypeOld, schemaTypeNew);
const rollbackType = generateRollbackMigration(typeDiff, 'postgres');
if (rollbackType.includes('TYPE DECIMAL') && rollbackType.includes('10') && rollbackType.includes('2')) {
  console.log('rollback-type: OK — rollback reverts type change to old type');
  ok++;
} else {
  console.log('rollback-type: FAIL — expected old DECIMAL type in rollback, got:', rollbackType);
}

// Rollback table drop test
const tableDropOld = `CREATE TABLE orders (id SERIAL PRIMARY KEY, total DECIMAL(10,2));`;
const tableDropNew = ``;
const schemaDropOld = parseSQL(tableDropOld, 'postgres');
const schemaDropNew = parseSQL(tableDropNew, 'postgres');
const dropDiff = diffSchemas(schemaDropOld, schemaDropNew);
const rollbackDrop = generateRollbackMigration(dropDiff, 'postgres');
if (rollbackDrop.includes('CREATE TABLE "orders"') && rollbackDrop.includes('"id" SERIAL')) {
  console.log('rollback-table-drop: OK — rollback recreates dropped table');
  ok++;
} else {
  console.log('rollback-table-drop: FAIL — expected CREATE TABLE orders in rollback, got:', rollbackDrop);
}

// --- Migration Warning Tests ---
function testWarning(name, oldSQL, newSQL, dialect, checkFn) {
  try {
    const schemaOld = parseSQL(oldSQL, dialect);
    const schemaNew = parseSQL(newSQL, dialect);
    const d = diffSchemas(schemaOld, schemaNew);
    const warnings = generateMigrationWarnings(d, dialect);
    if (checkFn(warnings)) {
      console.log(name + ': OK');
      return true;
    } else {
      console.log(name + ': FAIL — warnings:', warnings.map(w => w.title));
      return false;
    }
  } catch (e) {
    console.log(name + ': FAIL —', e.message);
    return false;
  }
}

// 1. VARCHAR shrink
if (testWarning('warn-varchar-shrink',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, name VARCHAR(100));`,
  `CREATE TABLE t (id SERIAL PRIMARY KEY, name VARCHAR(50));`,
  'postgres',
  w => w.some(x => x.title.includes('VARCHAR shrink') && x.severity === 'critical')
)) ok++;

// 2. Integer downsizing
if (testWarning('warn-int-downsize',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, count INT);`,
  `CREATE TABLE t (id SERIAL PRIMARY KEY, count SMALLINT);`,
  'postgres',
  w => w.some(x => x.title.includes('Downsizing integer') && x.severity === 'critical')
)) ok++;

// 3. TEXT -> VARCHAR
if (testWarning('warn-text-to-varchar',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, body TEXT);`,
  `CREATE TABLE t (id SERIAL PRIMARY KEY, body VARCHAR(255));`,
  'postgres',
  w => w.some(x => x.title.includes('TEXT → VARCHAR') && x.severity === 'critical')
)) ok++;

// 4. DECIMAL precision reduction
if (testWarning('warn-decimal-reduce',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, price DECIMAL(10,2));`,
  `CREATE TABLE t (id SERIAL PRIMARY KEY, price DECIMAL(8,2));`,
  'postgres',
  w => w.some(x => x.title.includes('DECIMAL precision reduction') && x.severity === 'critical')
)) ok++;

// 5. Timestamp -> date casting
if (testWarning('warn-timestamp-date',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, created_at TIMESTAMP);`,
  `CREATE TABLE t (id SERIAL PRIMARY KEY, created_at DATE);`,
  'postgres',
  w => w.some(x => x.title.includes('implicit casting') && x.severity === 'warning')
)) ok++;

// 6. NOT NULL without default
if (testWarning('warn-not-null-no-default',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, name VARCHAR(50));`,
  `CREATE TABLE t (id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL);`,
  'postgres',
  w => w.some(x => x.title.includes('SET NOT NULL') && x.severity === 'critical')
)) ok++;

// 7. Table drop
if (testWarning('warn-table-drop',
  `CREATE TABLE t (id SERIAL PRIMARY KEY);`,
  ``,
  'postgres',
  w => w.some(x => x.title.includes('DROP TABLE') && x.severity === 'critical')
)) ok++;

// 8. Column drop
if (testWarning('warn-column-drop',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, name VARCHAR(50));`,
  `CREATE TABLE t (id SERIAL PRIMARY KEY);`,
  'postgres',
  w => w.some(x => x.title.includes('DROP COLUMN') && x.severity === 'critical')
)) ok++;

// 9. Index drop
if (testWarning('warn-index-drop',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, name VARCHAR(50)); CREATE INDEX idx_name ON t(name);`,
  `CREATE TABLE t (id SERIAL PRIMARY KEY, name VARCHAR(50));`,
  'postgres',
  w => w.some(x => x.title.includes('Dropping index') && x.severity === 'warning')
)) ok++;

// 10. Foreign key drop
if (testWarning('warn-fk-drop',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, pid INT, CONSTRAINT fk_p FOREIGN KEY (pid) REFERENCES p(id)); CREATE TABLE p (id SERIAL PRIMARY KEY);`,
  `CREATE TABLE t (id SERIAL PRIMARY KEY, pid INT); CREATE TABLE p (id SERIAL PRIMARY KEY);`,
  'postgres',
  w => w.some(x => x.title.includes('Dropping foreign key') && x.severity === 'warning')
)) ok++;

// 11. PRIMARY KEY drop
if (testWarning('warn-pk-drop',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, name VARCHAR(50));`,
  `CREATE TABLE t (id SERIAL, name VARCHAR(50));`,
  'postgres',
  w => w.some(x => x.title.includes('Dropping PRIMARY KEY') && x.severity === 'critical')
)) ok++;

// 12. UNIQUE drop
if (testWarning('warn-unique-drop',
  `CREATE TABLE t (id SERIAL PRIMARY KEY, name VARCHAR(50), CONSTRAINT uq_name UNIQUE (name));`,
  `CREATE TABLE t (id SERIAL PRIMARY KEY, name VARCHAR(50));`,
  'postgres',
  w => w.some(x => x.title.includes('Dropping UNIQUE') && x.severity === 'warning')
)) ok++;

// 13. MySQL ADD COLUMN with DEFAULT
if (testWarning('warn-mysql-add-default',
  `CREATE TABLE t (id INT PRIMARY KEY AUTO_INCREMENT);`,
  `CREATE TABLE t (id INT PRIMARY KEY AUTO_INCREMENT, status VARCHAR(20) DEFAULT 'active');`,
  'mysql',
  w => w.some(x => x.title.includes('DEFAULT') && x.severity === 'warning')
)) ok++;

// 14. SQLite limitation warning
if (testWarning('warn-sqlite-limitation',
  `CREATE TABLE t (id INTEGER PRIMARY KEY, name TEXT);`,
  `CREATE TABLE t (id INTEGER PRIMARY KEY);`,
  'sqlite',
  w => w.some(x => x.title.includes('SQLite has limited') && x.severity === 'warning')
)) ok++;

// ───────────────────────────────────────────────
// Migration Safety Score Badge API
// ───────────────────────────────────────────────

function testBadgeEndpoint() {
  const badgeHandler = require('./api/migration-safety-badge.js');
  let statusCode, headers, body;

  const res = {
    setHeader: (k, v) => { headers = headers || {}; headers[k] = v; },
    status: (c) => { statusCode = c; return { send: (b) => { body = b; } }; },
    send: (b) => { body = b; }
  };

  // Valid safe score
  badgeHandler({ query: { score: '85' } }, res);
  if (statusCode !== 200 || !body || !body.includes('85/100')) {
    console.log('badge safe score: FAIL');
    return false;
  }
  console.log('badge safe score: OK');

  // Valid risky score
  statusCode = null; body = null;
  badgeHandler({ query: { score: '35' } }, res);
  if (statusCode !== 200 || !body || !body.includes('35/100 risky')) {
    console.log('badge risky score: FAIL');
    return false;
  }
  console.log('badge risky score: OK');

  // Invalid score falls back to error badge
  statusCode = null; body = null;
  badgeHandler({ query: { score: 'abc' } }, res);
  if (statusCode !== 200 || !body || !body.includes('error')) {
    console.log('badge invalid score: FAIL');
    return false;
  }
  console.log('badge invalid score: OK');

  // Flat-square style
  statusCode = null; body = null;
  badgeHandler({ query: { score: '92', style: 'flat-square' } }, res);
  if (statusCode !== 200 || !body || !body.includes('shape-rendering="crispEdges"')) {
    console.log('badge flat-square style: FAIL');
    return false;
  }
  console.log('badge flat-square style: OK');

  return true;
}

if (testBadgeEndpoint()) ok += 4;

// ───────────────────────────────────────────────
// Schema Diff Report API
// ───────────────────────────────────────────────

function testSchemaDiffReportEndpoint() {
  const reportHandler = require('./api/schema-diff-report.js');
  let statusCode, headers, body;

  const res = {
    setHeader: (k, v) => { headers = headers || {}; headers[k] = v; },
    status: (c) => {
      statusCode = c;
      return {
        send: (b) => { body = b; },
        json: (b) => { body = b; },
        end: () => { body = body || ''; }
      };
    },
    send: (b) => { body = b; },
    json: (b) => { body = b; }
  };

  // Valid report request
  statusCode = null; headers = {}; body = null;
  reportHandler({
    method: 'POST',
    body: {
      response: {
        summary: { tablesAdded: 1, tablesRemoved: 0, tablesModified: 2, breakingChangeCount: 1 },
        riskScore: { score: 75, label: 'High', icon: '🔴' },
        breakingChanges: [{ severity: 'high', message: 'Dropped column', table: 'users' }],
        migration: 'ALTER TABLE users ADD COLUMN email VARCHAR(255);',
        rollback: 'ALTER TABLE users DROP COLUMN email;'
      },
      metadata: { repo: 'acme/app', branch: 'main', dialect: 'postgres' }
    }
  }, res);
  if (statusCode !== 200 || !body || !body.includes('SchemaLens Schema Diff Report') || !body.includes('users')) {
    console.log('schema-diff-report valid: FAIL');
    return false;
  }
  console.log('schema-diff-report valid: OK');

  // Missing response object
  statusCode = null; headers = {}; body = null;
  reportHandler({ method: 'POST', body: {} }, res);
  if (statusCode !== 400 || !body.error) {
    console.log('schema-diff-report missing response: FAIL');
    return false;
  }
  console.log('schema-diff-report missing response: OK');

  // Method not allowed
  statusCode = null; headers = {}; body = null;
  reportHandler({ method: 'GET' }, res);
  if (statusCode !== 405) {
    console.log('schema-diff-report method: FAIL');
    return false;
  }
  console.log('schema-diff-report method: OK');

  return true;
}

if (testSchemaDiffReportEndpoint()) ok += 3;

console.log('\n' + ok + '/41 tests passed');
process.exit(ok === 41 ? 0 : 1);
