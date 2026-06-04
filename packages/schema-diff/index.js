#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const engine = require('./engine.js');
const {
  parseSQL,
  diffSchemas,
  detectBreakingChanges,
  calculateRiskScore,
  generateMigration,
  generateRollbackMigration,
  generateMarkdown
} = engine;

const pkg = require('./package.json');

// ANSI colors
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function noColor(s) { return s; }
function useColor(ci) { return ci ? { reset: '', bold: '', dim: '', red: '', green: '', yellow: '', blue: '', cyan: '' } : C; }

function usage() {
  console.log(`
schema-diff v${pkg.version}

Compare SQL database schemas and generate migrations.

Usage:
  schema-diff <old.sql> <new.sql> [options]

Options:
  -d, --dialect <dialect>   SQL dialect: postgres | mysql | sqlite | mssql | oracle (default: postgres)
  -f, --format <format>     Output format: pretty | json | markdown | sql | github | gitlab | junit (default: pretty)
  -o, --output <file>       Write output to file instead of stdout
  --rollback                Generate rollback migration SQL
  --ci                      CI mode: concise, no colors, exit 1 on breaking changes
  --strict                  Exit with code 2 if breaking changes are detected
  -h, --help                Show this help message
  -v, --version             Show version

Examples:
  schema-diff old.sql new.sql
  schema-diff old.sql new.sql --dialect mysql --format json
  schema-diff old.sql new.sql --format markdown --output report.md
  schema-diff old.sql new.sql --ci --strict
  schema-diff old.sql new.sql --format github --dialect postgres
  cat new.sql | schema-diff old.sql - --format json
`);
}

function version() {
  console.log(pkg.version);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {
    files: [],
    dialect: 'postgres',
    format: 'pretty',
    output: null,
    ci: false,
    strict: false,
    rollback: false,
    help: false,
    version: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-h' || arg === '--help') {
      opts.help = true;
    } else if (arg === '-v' || arg === '--version') {
      opts.version = true;
    } else if (arg === '-d' || arg === '--dialect') {
      opts.dialect = args[++i];
    } else if (arg === '-f' || arg === '--format') {
      opts.format = args[++i];
    } else if (arg === '-o' || arg === '--output') {
      opts.output = args[++i];
    } else if (arg === '--ci') {
      opts.ci = true;
    } else if (arg === '--strict') {
      opts.strict = true;
    } else if (arg === '--rollback') {
      opts.rollback = true;
    } else if (arg === '-') {
      opts.files.push(arg);
    } else if (!arg.startsWith('-')) {
      opts.files.push(arg);
    }
  }
  return opts;
}

function readFileOrStdin(filepath) {
  if (filepath === '-') {
    return new Promise((resolve, reject) => {
      let data = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', chunk => { data += chunk; });
      process.stdin.on('end', () => resolve(data));
      process.stdin.on('error', reject);
    });
  }
  if (!fs.existsSync(filepath)) {
    throw new Error(`File not found: ${filepath}`);
  }
  return fs.promises.readFile(filepath, 'utf8');
}

function formatPretty(diff, breakingChanges, riskScore, migration, rollbackMigration, dialect, ci) {
  const c = useColor(ci);
  const lines = [];
  if (!ci) {
    lines.push(`${c.bold}${c.cyan}schema-diff${c.reset} v${pkg.version}\n`);
  }

  const totalChanges =
    (diff.tablesAdded?.length || 0) +
    (diff.tablesRemoved?.length || 0) +
    (diff.tablesRenamed?.length || 0) +
    (diff.tablesModified?.length || 0) +
    (diff.enumsAdded?.length || 0) +
    (diff.enumsRemoved?.length || 0) +
    (diff.viewsAdded?.length || 0) +
    (diff.viewsRemoved?.length || 0) +
    (diff.viewsModified?.length || 0) +
    (diff.triggersAdded?.length || 0) +
    (diff.triggersRemoved?.length || 0) +
    (diff.triggersModified?.length || 0) +
    (diff.functionsAdded?.length || 0) +
    (diff.functionsRemoved?.length || 0) +
    (diff.functionsModified?.length || 0);

  lines.push(`${totalChanges} change(s) detected`);
  if (!ci) {
    lines.push(`  ${c.green}Tables added:${c.reset}    ${diff.tablesAdded?.length || 0}`);
    lines.push(`  ${c.red}Tables removed:${c.reset}  ${diff.tablesRemoved?.length || 0}`);
    lines.push(`  ${c.cyan}Tables renamed:${c.reset}   ${diff.tablesRenamed?.length || 0}`);
    lines.push(`  ${c.yellow}Tables modified:${c.reset} ${diff.tablesModified?.length || 0}`);
  } else {
    lines.push(`Tables added: ${diff.tablesAdded?.length || 0}`);
    lines.push(`Tables removed: ${diff.tablesRemoved?.length || 0}`);
    lines.push(`Tables renamed: ${diff.tablesRenamed?.length || 0}`);
    lines.push(`Tables modified: ${diff.tablesModified?.length || 0}`);
  }

  const r = riskScore;
  const rColor = ci ? '' : (r.score >= 70 ? c.red : r.score >= 40 ? c.yellow : c.green);
  lines.push(`Risk Score: ${rColor}${r.score}/100 — ${r.label}${c.reset}`);

  if (breakingChanges.length > 0) {
    lines.push(`Breaking Changes: ${breakingChanges.length}`);
    for (const bc of breakingChanges) {
      lines.push(`  [${bc.type}] ${bc.message}`);
    }
  }

  if (!ci && migration) {
    lines.push('');
    lines.push(`${c.bold}Migration SQL (${dialect}):${c.reset}`);
    lines.push(`${c.dim}${'─'.repeat(60)}${c.reset}`);
    const preview = migration.split('\n').slice(0, 30);
    lines.push(...preview);
    if (migration.split('\n').length > 30) {
      lines.push(`${c.dim}... (${migration.split('\n').length - 30} more lines)${c.reset}`);
    }
    lines.push(`${c.dim}${'─'.repeat(60)}${c.reset}`);
  }

  if (!ci && rollbackMigration) {
    lines.push('');
    lines.push(`${c.bold}${c.yellow}Rollback Migration SQL (${dialect}):${c.reset}`);
    lines.push(`${c.dim}${'─'.repeat(60)}${c.reset}`);
    const preview = rollbackMigration.split('\n').slice(0, 30);
    lines.push(...preview);
    if (rollbackMigration.split('\n').length > 30) {
      lines.push(`${c.dim}... (${rollbackMigration.split('\n').length - 30} more lines)${c.reset}`);
    }
    lines.push(`${c.dim}${'─'.repeat(60)}${c.reset}`);
  }

  if (!ci) {
    lines.push(`\n${c.dim}Generated by schema-diff — https://schemalens.tech${c.reset}`);
  }
  return lines.join('\n');
}

function formatGitHub(diff, breakingChanges, riskScore, migration) {
  const lines = [];
  // GitHub Actions annotations
  for (const bc of breakingChanges) {
    lines.push(`::error title=Breaking Change::[${bc.type}] ${bc.message}`);
  }
  if (diff.tablesAdded?.length) {
    for (const t of diff.tablesAdded) {
      lines.push(`::notice title=Schema Change::Table added: ${t.name} (${t.columns.length} columns)`);
    }
  }
  if (diff.tablesRemoved?.length) {
    for (const t of diff.tablesRemoved) {
      lines.push(`::warning title=Schema Change::Table removed: ${t.name}`);
    }
  }
  if (diff.tablesModified?.length) {
    for (const td of diff.tablesModified) {
      if (td.columnsAdded?.length) {
        for (const c of td.columnsAdded) {
          lines.push(`::notice title=Schema Change::Column added: ${td.name}.${c.name} ${c.type}`);
        }
      }
      if (td.columnsRemoved?.length) {
        for (const c of td.columnsRemoved) {
          lines.push(`::warning title=Schema Change::Column removed: ${td.name}.${c.name}`);
        }
      }
    }
  }
  lines.push(`::notice title=Schema Diff Summary::Risk Score: ${riskScore.score}/100 (${riskScore.label}) — ${breakingChanges.length} breaking change(s)`);
  return lines.join('\n');
}

function formatGitLab(diff, breakingChanges, riskScore, migration) {
  // GitLab Code Quality-like format (simple text output)
  const lines = [];
  for (const bc of breakingChanges) {
    lines.push(`ERROR: [${bc.type}] ${bc.message}`);
  }
  if (diff.tablesAdded?.length) {
    for (const t of diff.tablesAdded) {
      lines.push(`INFO: Table added: ${t.name}`);
    }
  }
  if (diff.tablesRemoved?.length) {
    for (const t of diff.tablesRemoved) {
      lines.push(`WARNING: Table removed: ${t.name}`);
    }
  }
  lines.push(`INFO: Risk Score: ${riskScore.score}/100 (${riskScore.label})`);
  return lines.join('\n');
}

function formatJUnit(diff, breakingChanges, riskScore, dialect) {
  const totalTests =
    (diff.tablesAdded?.length || 0) +
    (diff.tablesRemoved?.length || 0) +
    (diff.tablesModified?.length || 0) +
    breakingChanges.length;

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<testsuites name="Schema Diff (${dialect})" tests="${totalTests}" failures="${breakingChanges.length}" errors="0">`,
    '  <testsuite name="Schema Changes" tests="' + totalTests + '" failures="' + breakingChanges.length + '">'
  ];

  for (const bc of breakingChanges) {
    lines.push(`    <testcase name="Breaking Change: ${bc.type}">`);
    lines.push(`      <failure message="${escapeXml(bc.message)}" />`);
    lines.push('    </testcase>');
  }

  if (diff.tablesAdded?.length) {
    for (const t of diff.tablesAdded) {
      lines.push(`    <testcase name="Table Added: ${escapeXml(t.name)}" />`);
    }
  }
  if (diff.tablesRemoved?.length) {
    for (const t of diff.tablesRemoved) {
      lines.push(`    <testcase name="Table Removed: ${escapeXml(t.name)}" />`);
    }
  }
  if (diff.tablesModified?.length) {
    for (const td of diff.tablesModified) {
      lines.push(`    <testcase name="Table Modified: ${escapeXml(td.name)}" />`);
    }
  }

  lines.push('  </testsuite>');
  lines.push('</testsuites>');
  return lines.join('\n');
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function main() {
  const opts = parseArgs(process.argv);

  if (opts.version) {
    version();
    process.exit(0);
  }
  if (opts.help) {
    usage();
    process.exit(0);
  }

  if (opts.files.length !== 2) {
    console.error('Error: schema-diff requires exactly 2 file arguments (use "-" for stdin).');
    usage();
    process.exit(1);
  }

  const validDialects = ['postgres', 'mysql', 'sqlite', 'mssql', 'oracle'];
  if (!validDialects.includes(opts.dialect)) {
    console.error(`Error: Invalid dialect "${opts.dialect}". Must be one of: ${validDialects.join(', ')}`);
    process.exit(1);
  }

  const validFormats = ['pretty', 'json', 'markdown', 'sql', 'github', 'gitlab', 'junit'];
  if (!validFormats.includes(opts.format)) {
    console.error(`Error: Invalid format "${opts.format}". Must be one of: ${validFormats.join(', ')}`);
    process.exit(1);
  }

  let schemaA, schemaB;
  try {
    schemaA = await readFileOrStdin(opts.files[0]);
    schemaB = await readFileOrStdin(opts.files[1]);
  } catch (err) {
    console.error(`Error reading files: ${err.message}`);
    process.exit(1);
  }

  let diff, breakingChanges, riskScore, migration, rollbackMigration, markdown;
  try {
    const oldSchema = parseSQL(schemaA, opts.dialect);
    const newSchema = parseSQL(schemaB, opts.dialect);
    diff = diffSchemas(oldSchema, newSchema);
    breakingChanges = detectBreakingChanges(diff);
    riskScore = calculateRiskScore(diff);
    migration = generateMigration(diff, opts.dialect);
    rollbackMigration = opts.rollback ? generateRollbackMigration(diff, opts.dialect) : null;
    markdown = generateMarkdown(diff, opts.dialect);
  } catch (err) {
    console.error(`Error diffing schemas: ${err.message}`);
    process.exit(1);
  }

  let output = '';
  switch (opts.format) {
    case 'json':
      output = JSON.stringify({
        diff,
        migration,
        rollbackMigration: opts.rollback ? rollbackMigration : undefined,
        breakingChanges,
        riskScore: { score: riskScore.score, label: riskScore.label },
        summary: {
          tablesAdded: diff.tablesAdded.length,
          tablesRemoved: diff.tablesRemoved.length,
          tablesModified: diff.tablesModified.length,
          breakingChangeCount: breakingChanges.length
        }
      }, null, 2);
      break;
    case 'markdown':
      output = markdown;
      break;
    case 'sql':
      output = opts.rollback && rollbackMigration ? rollbackMigration : migration;
      break;
    case 'github':
      output = formatGitHub(diff, breakingChanges, riskScore, migration);
      break;
    case 'gitlab':
      output = formatGitLab(diff, breakingChanges, riskScore, migration);
      break;
    case 'junit':
      output = formatJUnit(diff, breakingChanges, riskScore, opts.dialect);
      break;
    case 'pretty':
    default:
      output = formatPretty(diff, breakingChanges, riskScore, migration, rollbackMigration, opts.dialect, opts.ci);
      break;
  }

  if (opts.output) {
    fs.writeFileSync(opts.output, output, 'utf8');
    if (!opts.ci) {
      console.error(`Output written to ${opts.output}`);
    }
  } else {
    console.log(output);
  }

  // Exit codes for CI
  if (opts.strict && breakingChanges.length > 0) {
    process.exit(2);
  }
  if (opts.ci && breakingChanges.length > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
