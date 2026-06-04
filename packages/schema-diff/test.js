#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CLI = path.join(__dirname, 'index.js');

function run(args) {
  return execSync(`node "${CLI}" ${args}`, { encoding: 'utf8', cwd: __dirname });
}

function runWithCode(args) {
  try {
    const out = execSync(`node "${CLI}" ${args}`, { encoding: 'utf8', cwd: __dirname });
    return { code: 0, stdout: out, stderr: '' };
  } catch (err) {
    return { code: err.status, stdout: err.stdout || '', stderr: err.stderr || '' };
  }
}

// Create test schema files
const oldSchema = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);
`;

const newSchema = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  user_id INTEGER REFERENCES users(id)
);
`;

fs.writeFileSync(path.join(__dirname, 'test-old.sql'), oldSchema);
fs.writeFileSync(path.join(__dirname, 'test-new.sql'), newSchema);

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ❌ ${name}: ${err.message}`);
    failed++;
  }
}

console.log('Running schema-diff tests...\n');

test('Basic pretty diff works', () => {
  const out = run('test-old.sql test-new.sql');
  if (!out.includes('users')) throw new Error('Expected users table in output');
  if (!out.includes('posts')) throw new Error('Expected posts table in output');
});

test('JSON format works', () => {
  const out = run('test-old.sql test-new.sql --format json');
  const json = JSON.parse(out);
  if (!json.summary) throw new Error('Expected summary in JSON');
  if (json.summary.tablesAdded !== 1) throw new Error(`Expected 1 table added, got ${json.summary.tablesAdded}`);
});

test('Markdown format works', () => {
  const out = run('test-old.sql test-new.sql --format markdown');
  if (!out.includes('##')) throw new Error('Expected markdown headers');
});

test('SQL format works', () => {
  const out = run('test-old.sql test-new.sql --format sql');
  if (!out.includes('ALTER TABLE')) throw new Error('Expected ALTER TABLE in SQL output');
});

test('GitHub format works', () => {
  const out = run('test-old.sql test-new.sql --format github');
  if (!out.includes('::')) throw new Error('Expected GitHub annotation syntax');
});

test('GitLab format works', () => {
  const out = run('test-old.sql test-new.sql --format gitlab');
  if (!out.includes('INFO:') && !out.includes('ERROR:')) throw new Error('Expected GitLab CI output');
});

test('JUnit format works', () => {
  const out = run('test-old.sql test-new.sql --format junit');
  if (!out.includes('<?xml')) throw new Error('Expected XML header');
  if (!out.includes('<testsuites')) throw new Error('Expected testsuites element');
});

test('CI mode exits 0 when no breaking changes', () => {
  const result = runWithCode('test-old.sql test-new.sql --ci');
  if (result.code !== 0) throw new Error(`Expected exit code 0, got ${result.code}`);
});

test('Rollback generation works', () => {
  const out = run('test-old.sql test-new.sql --rollback --format sql');
  if (!out.includes('DROP TABLE')) throw new Error('Expected DROP TABLE in rollback');
});

test('Output file works', () => {
  const outPath = path.join(__dirname, 'test-output.json');
  run('test-old.sql test-new.sql --format json --output test-output.json');
  if (!fs.existsSync(outPath)) throw new Error('Output file not created');
  const content = fs.readFileSync(outPath, 'utf8');
  const json = JSON.parse(content);
  if (!json.summary) throw new Error('Expected summary in output file');
  fs.unlinkSync(outPath);
});

test('Strict mode exits 2 on breaking changes', () => {
  const breakingOld = `CREATE TABLE users (id INT);`;
  const breakingNew = ``;
  fs.writeFileSync(path.join(__dirname, 'test-break-old.sql'), breakingOld);
  fs.writeFileSync(path.join(__dirname, 'test-break-new.sql'), breakingNew);
  const result = runWithCode('test-break-old.sql test-break-new.sql --strict');
  if (result.code !== 2) throw new Error(`Expected exit code 2, got ${result.code}`);
});

test('Help flag works', () => {
  const out = run('--help');
  if (!out.includes('Usage:')) throw new Error('Expected usage in help');
});

test('Version flag works', () => {
  const out = run('--version');
  if (!out.includes('1.0.0')) throw new Error('Expected version 1.0.0');
});

// Cleanup
fs.unlinkSync(path.join(__dirname, 'test-old.sql'));
fs.unlinkSync(path.join(__dirname, 'test-new.sql'));
try { fs.unlinkSync(path.join(__dirname, 'test-break-old.sql')); } catch (e) {}
try { fs.unlinkSync(path.join(__dirname, 'test-break-new.sql')); } catch (e) {}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed > 0) process.exit(1);
