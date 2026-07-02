#!/usr/bin/env node
/**
 * SchemaLens MCP Server
 * Model Context Protocol (MCP) server that exposes SchemaLens schema diff tools
 * to AI assistants such as Claude Desktop, Cursor, and any MCP-compatible client.
 *
 * Usage:
 *   node mcp-server.js
 *
 * The server communicates over stdin/stdout using JSON-RPC 2.0 / MCP.
 * All diff computation runs locally via the SchemaLens engine — no schema data
 * is sent to remote servers.
 *
 * Tools exposed:
 *   - schemalens_diff_schemas         : semantic diff of two SQL schemas
 *   - schemalens_generate_migration   : forward + rollback migration SQL
 *   - schemalens_detect_breaking_changes : list breaking changes with severity
 *
 * Example Claude Desktop config:
 *   {
 *     "mcpServers": {
 *       "schemalens": {
 *         "command": "node",
 *         "args": ["/path/to/race-kimi/mcp-server.js"]
 *       }
 *     }
 *   }
 */

const path = require('path');

// Resolve the SchemaLens engine. Works when run from repo root or any cwd.
let engine;
try {
  engine = require('./lib/engine.js');
} catch (err) {
  try {
    engine = require(path.join(__dirname, 'lib', 'engine.js'));
  } catch (err2) {
    console.error('Error: Could not load SchemaLens engine from ./lib/engine.js');
    console.error('Make sure you are running mcp-server.js from the SchemaLens repository.');
    process.exit(1);
  }
}

const {
  parseSQL,
  diffSchemas,
  detectBreakingChanges,
  calculateRiskScore,
  generateMigration,
  generateRollbackMigration
} = engine;

const VALID_DIALECTS = ['postgres', 'mysql', 'sqlite', 'mssql', 'oracle'];
const DEFAULT_DIALECT = 'postgres';

function log(...args) {
  // All diagnostic output must go to stderr so stdout stays pure JSON-RPC.
  console.error('[SchemaLens MCP]', ...args);
}

function send(message) {
  process.stdout.write(JSON.stringify(message) + '\n');
}

function normalizeDialect(dialect) {
  if (!dialect) return DEFAULT_DIALECT;
  const d = String(dialect).toLowerCase();
  if (d === 'postgresql') return 'postgres';
  if (d === 'mariadb') return 'mysql';
  if (VALID_DIALECTS.includes(d)) return d;
  return DEFAULT_DIALECT;
}

function runDiff(schemaA, schemaB, dialect) {
  const d = normalizeDialect(dialect);
  const oldSchema = parseSQL(schemaA, d);
  const newSchema = parseSQL(schemaB, d);
  const diff = diffSchemas(oldSchema, newSchema);
  const breakingChanges = detectBreakingChanges(diff);
  const riskScore = calculateRiskScore(diff);
  const migration = generateMigration(diff, d);
  const rollback = generateRollbackMigration(diff, d);
  return { dialect: d, diff, breakingChanges, riskScore, migration, rollback };
}

function formatDiffSummary(result) {
  const { diff, riskScore, breakingChanges } = result;
  const lines = [
    `Risk score: ${riskScore.score}/100 (${riskScore.label})`,
    '',
    `Tables added:    ${diff.tablesAdded.length}`,
    `Tables removed:  ${diff.tablesRemoved.length}`,
    `Tables modified: ${diff.tablesModified.length}`,
    `Breaking changes: ${breakingChanges.length}`,
    ''
  ];

  if (diff.tablesAdded.length) {
    lines.push('Added tables:');
    diff.tablesAdded.forEach(t => lines.push(`  + ${t.name}`));
    lines.push('');
  }
  if (diff.tablesRemoved.length) {
    lines.push('Removed tables:');
    diff.tablesRemoved.forEach(t => lines.push(`  - ${t.name}`));
    lines.push('');
  }
  if (diff.tablesModified.length) {
    lines.push('Modified tables:');
    diff.tablesModified.forEach(t => {
      lines.push(`  ~ ${t.name}`);
      if (t.columnsAdded?.length) {
        t.columnsAdded.forEach(c => lines.push(`      + column ${c.name} ${c.type}`));
      }
      if (t.columnsRemoved?.length) {
        t.columnsRemoved.forEach(c => lines.push(`      - column ${c.name}`));
      }
      if (t.columnsModified?.length) {
        t.columnsModified.forEach(c => {
          lines.push(`      ~ column ${c.name}: ${c.oldType} → ${c.newType}`);
        });
      }
    });
    lines.push('');
  }
  if (breakingChanges.length) {
    lines.push('Breaking changes:');
    breakingChanges.forEach(b => lines.push(`  [${b.severity}] ${b.message}`));
  }
  return lines.join('\n').trim();
}

function formatMigration(result) {
  const lines = [
    `-- SchemaLens migration (${result.dialect})`,
    `-- Risk score: ${result.riskScore.score}/100 (${result.riskScore.label})`,
    '',
    '-- Forward migration',
    result.migration || '-- No migration needed',
    '',
    '-- Rollback migration',
    result.rollback || '-- No rollback needed'
  ];
  return lines.join('\n');
}

function formatBreakingChanges(result) {
  if (!result.breakingChanges.length) {
    return 'No breaking changes detected.';
  }
  return result.breakingChanges
    .map(b => `- [${b.severity}] ${b.message}`)
    .join('\n');
}

const tools = [
  {
    name: 'schemalens_diff_schemas',
    description:
      'Compare two SQL database schemas and return a semantic diff showing added/removed/modified tables, columns, indexes, and constraints.',
    inputSchema: {
      type: 'object',
      properties: {
        schemaA: {
          type: 'string',
          description: 'Original/current schema SQL (CREATE TABLE statements).'
        },
        schemaB: {
          type: 'string',
          description: 'Target/new schema SQL (CREATE TABLE statements).'
        },
        dialect: {
          type: 'string',
          enum: VALID_DIALECTS,
          default: DEFAULT_DIALECT,
          description: `SQL dialect. One of: ${VALID_DIALECTS.join(', ')}.`
        }
      },
      required: ['schemaA', 'schemaB']
    }
  },
  {
    name: 'schemalens_generate_migration',
    description:
      'Generate a forward migration SQL script to transform schemaA into schemaB, plus a rollback script and a risk score.',
    inputSchema: {
      type: 'object',
      properties: {
        schemaA: {
          type: 'string',
          description: 'Original/current schema SQL (CREATE TABLE statements).'
        },
        schemaB: {
          type: 'string',
          description: 'Target/new schema SQL (CREATE TABLE statements).'
        },
        dialect: {
          type: 'string',
          enum: VALID_DIALECTS,
          default: DEFAULT_DIALECT,
          description: `SQL dialect. One of: ${VALID_DIALECTS.join(', ')}.`
        }
      },
      required: ['schemaA', 'schemaB']
    }
  },
  {
    name: 'schemalens_detect_breaking_changes',
    description:
      'Detect breaking changes between two SQL schemas, including dropped columns/tables, type changes, and NOT NULL additions.',
    inputSchema: {
      type: 'object',
      properties: {
        schemaA: {
          type: 'string',
          description: 'Original/current schema SQL (CREATE TABLE statements).'
        },
        schemaB: {
          type: 'string',
          description: 'Target/new schema SQL (CREATE TABLE statements).'
        },
        dialect: {
          type: 'string',
          enum: VALID_DIALECTS,
          default: DEFAULT_DIALECT,
          description: `SQL dialect. One of: ${VALID_DIALECTS.join(', ')}.`
        }
      },
      required: ['schemaA', 'schemaB']
    }
  }
];

const handlers = {
  initialize: () => ({
    protocolVersion: '2024-11-05',
    capabilities: { tools: {} },
    serverInfo: { name: 'schemalens', version: '1.0.0' }
  }),

  'notifications/initialized': () => {
    // No response required for notifications.
    return undefined;
  },

  'tools/list': () => ({ tools }),

  'tools/call': (message) => {
    const { name, arguments: args = {} } = message.params || {};
    const { schemaA, schemaB, dialect } = args;

    if (typeof schemaA !== 'string' || typeof schemaB !== 'string') {
      throw new Error('schemaA and schemaB are required string arguments.');
    }

    let result;
    try {
      result = runDiff(schemaA, schemaB, dialect);
    } catch (err) {
      throw new Error(`Schema diff failed: ${err.message}`);
    }

    let text;
    switch (name) {
      case 'schemalens_diff_schemas':
        text = formatDiffSummary(result);
        break;
      case 'schemalens_generate_migration':
        text = formatMigration(result);
        break;
      case 'schemalens_detect_breaking_changes':
        text = formatBreakingChanges(result);
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [{ type: 'text', text }],
      isError: false
    };
  }
};

function handleMessage(line) {
  const trimmed = line.trim();
  if (!trimmed) return;

  let message;
  try {
    message = JSON.parse(trimmed);
  } catch (e) {
    log('Invalid JSON received:', trimmed.slice(0, 200));
    return;
  }

  const handler = handlers[message.method];
  if (!handler) {
    // Unknown method — respond with error if it has an id.
    if (message.id !== undefined) {
      send({
        jsonrpc: '2.0',
        id: message.id,
        error: { code: -32601, message: `Method not found: ${message.method}` }
      });
    }
    return;
  }

  Promise.resolve()
    .then(() => handler(message))
    .then(result => {
      // Notifications and methods that explicitly return undefined should not send a response.
      if (message.id !== undefined && result !== undefined) {
        send({ jsonrpc: '2.0', id: message.id, result });
      }
    })
    .catch(err => {
      log('Handler error:', err.message);
      if (message.id !== undefined) {
        send({
          jsonrpc: '2.0',
          id: message.id,
          error: { code: -32603, message: err.message }
        });
      }
    });
}

let buffer = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  buffer += chunk;
  let newlineIndex;
  while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
    const line = buffer.slice(0, newlineIndex);
    buffer = buffer.slice(newlineIndex + 1);
    handleMessage(line);
  }
});

process.stdin.on('end', () => {
  if (buffer.trim()) handleMessage(buffer);
});

log('SchemaLens MCP server v1.0.0 started. Waiting for client connection...');
