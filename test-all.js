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

console.log('\n' + ok + '/6 tests passed');
process.exit(ok === 6 ? 0 : 1);
