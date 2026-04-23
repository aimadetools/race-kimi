const mockEl = () => ({
  addEventListener: () => {},
  classList: { add: () => {}, remove: () => {} },
  textContent: '',
  innerHTML: '',
  value: '',
  style: {}
});
global.document = {
  getElementById: () => mockEl(),
  querySelectorAll: () => [],
  addEventListener: () => {},
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
const fn = new Function(script + '; return { parseSQL, diffSchemas, generateMigration, quoteId };');
const { parseSQL, diffSchemas, generateMigration, quoteId } = fn();

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

let ok = 0;
if (testDialect('postgres', pg)) ok++;
if (testDialect('mysql', my)) ok++;
if (testDialect('sqlite', sq)) ok++;
if (testDialect('mssql', ms)) ok++;

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

console.log('\n' + ok + '/10 tests passed');
process.exit(ok === 10 ? 0 : 1);
