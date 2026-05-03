#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Resolve engine — try local copy first (published package), then parent lib/ (local dev)
let engine;
try {
  engine = require('./engine.js');
} catch (err) {
  try {
    engine = require(path.join(__dirname, '..', 'lib', 'engine.js'));
  } catch (err2) {
    console.error('Error: Could not load SchemaLens engine.');
    console.error('Make sure you are running from the SchemaLens repository or have installed the package correctly.');
    process.exit(1);
  }
}

const {
  parseSQL,
  diffSchemas,
  detectBreakingChanges,
  calculateRiskScore,
  generateMigration,
  generateMarkdown
} = engine;

// ANSI colors
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function usage() {
  console.log(`
${C.bold}schemalens${C.reset} — Compare SQL schemas and generate migrations

Usage:
  schemalens diff <old.sql> <new.sql> [options]

Options:
  -d, --dialect <dialect>   SQL dialect: postgres | mysql | sqlite | mssql | oracle (default: postgres)
  -f, --format <format>     Output format: json | markdown | sql | pretty (default: pretty)
  -o, --output <file>       Write output to file instead of stdout
  -h, --help                Show this help message
  -v, --version             Show version

Examples:
  schemalens diff old.sql new.sql
  schemalens diff old.sql new.sql --dialect mysql --format sql
  schemalens diff old.sql new.sql --format markdown --output report.md
  cat new.sql | schemalens diff old.sql - --format json
`);
}

function version() {
  const pkg = require('./package.json');
  console.log(pkg.version);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {
    command: null,
    files: [],
    dialect: 'postgres',
    format: 'pretty',
    output: null,
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
    } else if (arg === '-') {
      opts.files.push(arg);
    } else if (!arg.startsWith('-')) {
      if (!opts.command) {
        opts.command = arg;
      } else {
        opts.files.push(arg);
      }
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

function formatPretty(diff, breakingChanges, riskScore, migration, dialect) {
  const lines = [];
  lines.push(`${C.bold}${C.cyan}SchemaLens Diff Report${C.reset}\n`);

  // Summary
  const s = diff;
  const totalChanges =
    (s.tablesAdded?.length || 0) +
    (s.tablesRemoved?.length || 0) +
    (s.tablesRenamed?.length || 0) +
    (s.tablesModified?.length || 0) +
    (s.enumsAdded?.length || 0) +
    (s.enumsRemoved?.length || 0) +
    (s.triggersAdded?.length || 0) +
    (s.triggersRemoved?.length || 0) +
    (s.triggersModified?.length || 0) +
    (s.viewsAdded?.length || 0) +
    (s.viewsRemoved?.length || 0) +
    (s.viewsModified?.length || 0) +
    (s.functionsAdded?.length || 0) +
    (s.functionsRemoved?.length || 0) +
    (s.functionsModified?.length || 0);

  lines.push(`${C.bold}Summary:${C.reset} ${totalChanges} change(s) detected`);
  lines.push(`  ${C.green}Tables added:${C.reset}    ${s.tablesAdded?.length || 0}`);
  lines.push(`  ${C.red}Tables removed:${C.reset}  ${s.tablesRemoved?.length || 0}`);
  lines.push(`  ${C.cyan}Tables renamed:${C.reset}   ${s.tablesRenamed?.length || 0}`);
  lines.push(`  ${C.yellow}Tables modified:${C.reset} ${s.tablesModified?.length || 0}`);
  if (s.enumsAdded?.length || s.enumsRemoved?.length) {
    lines.push(`  Enums added:     ${s.enumsAdded?.length || 0}`);
    lines.push(`  Enums removed:   ${s.enumsRemoved?.length || 0}`);
  }
  lines.push('');

  // Risk score
  const r = riskScore;
  const rColor = r.score >= 70 ? C.red : r.score >= 40 ? C.yellow : C.green;
  lines.push(`${C.bold}Risk Score:${C.reset} ${rColor}${r.score}/100 — ${r.label}${C.reset}`);
  lines.push('');

  // Breaking changes
  if (breakingChanges.length > 0) {
    lines.push(`${C.bold}${C.red}⚠ Breaking Changes (${breakingChanges.length}):${C.reset}`);
    for (const bc of breakingChanges) {
      lines.push(`  ${C.red}•${C.reset} [${bc.type}] ${bc.message}`);
    }
    lines.push('');
  }

  // Tables added
  if (s.tablesAdded?.length) {
    lines.push(`${C.bold}${C.green}Tables Added:${C.reset}`);
    for (const t of s.tablesAdded) {
      lines.push(`  + ${t.name} (${t.columns.length} columns)`);
    }
    lines.push('');
  }

  // Tables removed
  if (s.tablesRemoved?.length) {
    lines.push(`${C.bold}${C.red}Tables Removed:${C.reset}`);
    for (const t of s.tablesRemoved) {
      lines.push(`  − ${t.name}`);
    }
    lines.push('');
  }

  // Tables renamed
  if (s.tablesRenamed?.length) {
    lines.push(`${C.bold}${C.cyan}Tables Renamed:${C.reset}`);
    for (const ren of s.tablesRenamed) {
      lines.push(`  → ${ren.oldTable.name} → ${ren.newTable.name}`);
    }
    lines.push('');
  }

  // Tables modified
  if (s.tablesModified?.length) {
    lines.push(`${C.bold}${C.yellow}Tables Modified:${C.reset}`);
    for (const td of s.tablesModified) {
      lines.push(`  ~ ${td.name}`);
      if (td.columnsAdded?.length) {
        for (const c of td.columnsAdded) {
          lines.push(`      + ${c.name} ${c.type}${c.nullable ? '' : ' NOT NULL'}`);
        }
      }
      if (td.columnsRemoved?.length) {
        for (const c of td.columnsRemoved) {
          lines.push(`      − ${c.name}`);
        }
      }
      if (td.columnsRenamed?.length) {
        for (const c of td.columnsRenamed) {
          lines.push(`      → ${c.oldColumn.name} renamed to ${c.newColumn.name}`);
        }
      }
      if (td.columnsModified?.length) {
        for (const c of td.columnsModified) {
          const changes = c.changes.map(ch => `${ch.field}: ${ch.old} → ${ch.new}`).join(', ');
          lines.push(`      ~ ${c.column.name} (${changes})`);
        }
      }
      if (td.constraintsAdded?.length) {
        for (const c of td.constraintsAdded) {
          lines.push(`      + constraint ${c.type}${c.name ? ' ' + c.name : ''}`);
        }
      }
      if (td.constraintsRemoved?.length) {
        for (const c of td.constraintsRemoved) {
          lines.push(`      − constraint ${c.type}${c.name ? ' ' + c.name : ''}`);
        }
      }
    }
    lines.push('');
  }

  // Migration preview
  if (migration) {
    lines.push(`${C.bold}Migration SQL (${dialect}):${C.reset}`);
    lines.push(`${C.dim}${'─'.repeat(60)}${C.reset}`);
    const preview = migration.split('\n').slice(0, 30);
    lines.push(...preview);
    if (migration.split('\n').length > 30) {
      lines.push(`${C.dim}... (${migration.split('\n').length - 30} more lines)${C.reset}`);
    }
    lines.push(`${C.dim}${'─'.repeat(60)}${C.reset}`);
  }

  lines.push(`\n${C.dim}Generated by SchemaLens CLI — https://schemalens.tech${C.reset}`);
  return lines.join('\n');
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

  if (opts.command !== 'diff') {
    console.error('Error: Unknown command. Use "schemalens diff <old.sql> <new.sql>"');
    usage();
    process.exit(1);
  }

  if (opts.files.length !== 2) {
    console.error('Error: diff requires exactly 2 file arguments (use "-" for stdin).');
    usage();
    process.exit(1);
  }

  const validDialects = ['postgres', 'mysql', 'sqlite', 'mssql', 'oracle'];
  if (!validDialects.includes(opts.dialect)) {
    console.error(`Error: Invalid dialect "${opts.dialect}". Must be one of: ${validDialects.join(', ')}`);
    process.exit(1);
  }

  const validFormats = ['json', 'markdown', 'sql', 'pretty'];
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

  let oldSchema, newSchema, diff, breakingChanges, riskScore, migration, markdown;
  try {
    oldSchema = parseSQL(schemaA, opts.dialect);
    newSchema = parseSQL(schemaB, opts.dialect);
    diff = diffSchemas(oldSchema, newSchema);
    breakingChanges = detectBreakingChanges(diff);
    riskScore = calculateRiskScore(diff);
    migration = generateMigration(diff, opts.dialect);
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
        breakingChanges,
        riskScore: {
          score: riskScore.score,
          label: riskScore.label
        },
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
      output = migration;
      break;
    case 'pretty':
    default:
      output = formatPretty(diff, breakingChanges, riskScore, migration, opts.dialect);
      break;
  }

  if (opts.output) {
    fs.writeFileSync(opts.output, output, 'utf8');
    console.error(`Output written to ${opts.output}`);
  } else {
    console.log(output);
  }

  // Exit with error code if breaking changes exist (useful for CI)
  if (breakingChanges.length > 0 && process.env.SCHEMALENS_STRICT) {
    process.exit(2);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
