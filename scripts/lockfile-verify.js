#!/usr/bin/env node
/**
 * SchemaLens lockfile verifier
 * Usage: node scripts/lockfile-verify.js --schema db/schema.sql --lockfile schema.lock
 *
 * Canonicalizes a SQL schema dump exactly like the SchemaLens lockfile generator,
 * compares the SHA-256 fingerprint to the committed lockfile, and exits non-zero on drift.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const key = argv[i];
    if (key === '--schema' || key === '-s') args.schema = argv[++i];
    else if (key === '--lockfile' || key === '-l') args.lockfile = argv[++i];
    else if (key === '--help' || key === '-h') args.help = true;
  }
  return args;
}

function normalizeSchema(sql) {
  let cleaned = sql.replace(/\/\*[\s\S]*?\*\//g, ' ');
  cleaned = cleaned.replace(/--.*$/gm, ' ');
  cleaned = cleaned.toLowerCase();
  const statements = cleaned
    .split(';')
    .map(s => s.replace(/\s+/g, ' ').trim())
    .filter(s => s.length > 0 && /^\s*create\s+(table|index)\b/.test(s));
  statements.sort((a, b) => a.localeCompare(b));
  return statements.join(';\n') + (statements.length ? ';' : '');
}

function sortStatementColumns(stmt) {
  const m = stmt.match(/^create\s+table\s+(\S+)\s*\(/i);
  if (!m) return stmt;
  const tableName = m[1];
  let depth = 1;
  let i = m[0].length;
  while (i < stmt.length && depth > 0) {
    if (stmt[i] === '(') depth++;
    else if (stmt[i] === ')') depth--;
    i++;
  }
  if (depth !== 0) return stmt;
  const body = stmt.slice(m[0].length, i - 1);

  const lines = [];
  let start = 0;
  let d = 0;
  for (let j = 0; j < body.length; j++) {
    const ch = body[j];
    if (ch === '(') d++;
    else if (ch === ')') d--;
    else if (ch === ',' && d === 0) {
      lines.push(body.slice(start, j).trim());
      start = j + 1;
    }
  }
  const last = body.slice(start).trim();
  if (last) lines.push(last);

  const columns = [];
  const constraints = [];
  lines.forEach(line => {
    const lower = line.toLowerCase();
    if (
      lower.startsWith('primary key') ||
      lower.startsWith('foreign key') ||
      lower.startsWith('constraint') ||
      lower.startsWith('unique') ||
      lower.startsWith('check')
    ) {
      constraints.push(line);
    } else {
      columns.push(line);
    }
  });
  columns.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const sortedBody = [...columns, ...constraints].join(', ');
  return `create table ${tableName} (${sortedBody})`;
}

function stripEnvironmentDefaults(stmt) {
  return stmt.replace(/\s+default\s+[^,)]+/gi, '');
}

function buildCanonicalSchema(sql, options) {
  const normalized = normalizeSchema(sql);
  let statements = normalized
    .split(';')
    .map(s => s.trim())
    .filter(Boolean);
  if (options.sortColumns) statements = statements.map(sortStatementColumns);
  if (options.stripDefaults) statements = statements.map(stripEnvironmentDefaults);
  statements = statements
    .map(s => s.replace(/\s+/g, ' ').trim())
    .sort((a, b) => a.localeCompare(b));
  return statements.join(';\n') + (statements.length ? ';' : '');
}

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help || !args.schema || !args.lockfile) {
    console.log('Usage: node scripts/lockfile-verify.js --schema <path> --lockfile <path>');
    console.log('');
    console.log('Verify a SQL schema dump against a SchemaLens schema.lock file.');
    console.log('Exits with code 0 when fingerprints match, 1 on drift or error.');
    process.exit(args.help ? 0 : 1);
  }

  if (!fs.existsSync(args.schema)) {
    console.error(`❌ Schema file not found: ${args.schema}`);
    process.exit(1);
  }
  if (!fs.existsSync(args.lockfile)) {
    console.error(`❌ Lockfile not found: ${args.lockfile}`);
    process.exit(1);
  }

  let lockfile;
  try {
    lockfile = JSON.parse(fs.readFileSync(args.lockfile, 'utf8'));
  } catch (err) {
    console.error(`❌ Failed to parse lockfile: ${err.message}`);
    process.exit(1);
  }

  if (!lockfile.hash) {
    console.error('❌ Lockfile missing "hash" field.');
    process.exit(1);
  }

  const options = {
    sortColumns: Boolean(lockfile.options && lockfile.options.sortColumns),
    stripDefaults: Boolean(lockfile.options && lockfile.options.stripDefaults)
  };

  const sql = fs.readFileSync(args.schema, 'utf8');
  const canonical = buildCanonicalSchema(sql, options);

  if (!canonical) {
    console.error('❌ No CREATE TABLE or CREATE INDEX statements found in schema file.');
    process.exit(1);
  }

  const actualHash = sha256(canonical);
  const expectedHash = lockfile.hash;

  console.log(`Schema:   ${path.resolve(args.schema)}`);
  console.log(`Lockfile: ${path.resolve(args.lockfile)}`);
  console.log(`Expected: ${expectedHash}`);
  console.log(`Actual:   ${actualHash}`);

  if (actualHash !== expectedHash) {
    console.error('');
    console.error('❌ Schema drift detected. The committed lockfile does not match the current schema.');
    console.error('   Regenerate the lockfile at https://schemalens.tech/tools/schema-lockfile-generator.html');
    process.exit(1);
  }

  console.log('✅ Schema fingerprint matches.');
  process.exit(0);
}

main();
