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

const fs = require('fs');
const html = fs.readFileSync('app.html', 'utf8');
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];
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

console.log('\n' + ok + '/4 dialects passed');
process.exit(ok === 4 ? 0 : 1);
