const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CLI = path.join(__dirname, 'index.js');

function run(args) {
  return execSync(`node "${CLI}" ${args}`, { encoding: 'utf8', cwd: __dirname });
}

// Test fixtures
const oldSQL = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
`;

const newSQL = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500)
);
`;

const oldFile = path.join(__dirname, 'test-old.sql');
const newFile = path.join(__dirname, 'test-new.sql');
fs.writeFileSync(oldFile, oldSQL);
fs.writeFileSync(newFile, newSQL);

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ ${name}: ${err.message}`);
    failed++;
  }
}

test('pretty format runs', () => {
  const out = run(`diff "${oldFile}" "${newFile}" --dialect postgres --format pretty`);
  if (!out.includes('Tables Added')) throw new Error('Missing expected output');
});

test('json format is valid', () => {
  const out = run(`diff "${oldFile}" "${newFile}" --dialect postgres --format json`);
  const json = JSON.parse(out);
  if (json.summary.tablesAdded !== 1) throw new Error('Expected 1 table added');
  if (json.summary.tablesModified !== 1) throw new Error('Expected 1 table modified');
});

test('sql format generates ALTER TABLE', () => {
  const out = run(`diff "${oldFile}" "${newFile}" --dialect postgres --format sql`);
  if (!out.includes('ALTER TABLE')) throw new Error('Missing ALTER TABLE');
});

test('markdown format runs', () => {
  const out = run(`diff "${oldFile}" "${newFile}" --dialect postgres --format markdown`);
  if (!out.includes('# Schema Diff Report')) throw new Error('Missing header');
});

test('mysql dialect works', () => {
  const out = run(`diff "${oldFile}" "${newFile}" --dialect mysql --format sql`);
  if (!out.includes('CREATE TABLE')) throw new Error('Missing CREATE TABLE');
});

test('output file works', () => {
  const outFile = path.join(__dirname, 'test-out.sql');
  run(`diff "${oldFile}" "${newFile}" --dialect postgres --format sql --output "${outFile}"`);
  if (!fs.existsSync(outFile)) throw new Error('Output file not created');
  const content = fs.readFileSync(outFile, 'utf8');
  if (!content.includes('ALTER TABLE')) throw new Error('Output missing SQL');
  fs.unlinkSync(outFile);
});

test('help flag works', () => {
  const out = run('--help');
  if (!out.includes('Usage:')) throw new Error('Missing usage');
});

test('version flag works', () => {
  const out = run('--version');
  if (!out.match(/^\d+\.\d+\.\d+/)) throw new Error('Missing version');
});

// Cleanup
fs.unlinkSync(oldFile);
fs.unlinkSync(newFile);

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
