// Mock document for headless testing
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

// Test SQL Server parsing
const sql = `CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(100) NOT NULL,
  email NVARCHAR(100) UNIQUE,
  role_id INT DEFAULT 1,
  created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE posts (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT NOT NULL,
  title NVARCHAR(255),
  body NVARCHAR(MAX),
  published BIT DEFAULT 0,
  created_at DATETIME DEFAULT GETDATE()
);`;

const schema = parseSQL(sql, 'mssql');
console.log('Tables:', Object.keys(schema.tables));
console.log('Users columns:', schema.tables.users.columns.map(c => c.name + ' ' + c.type + (c.autoIncrement ? ' IDENTITY' : '')));
console.log('Quote test:', quoteId('user id', 'mssql'));

// Test diff
const sqlB = sql + '\nCREATE TABLE tags (\n  id INT IDENTITY(1,1) PRIMARY KEY,\n  name NVARCHAR(50) NOT NULL\n);';
const diff = diffSchemas(parseSQL(sql, 'mssql'), parseSQL(sqlB, 'mssql'));
console.log('Added tables:', diff.tablesAdded.length);

const migration = generateMigration(diff, 'mssql');
console.log('Migration preview:');
console.log(migration.split('\n').slice(0, 6).join('\n'));
