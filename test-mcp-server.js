/**
 * Quick integration test for the SchemaLens MCP server.
 * Spawns the server and drives it through stdin/stdout with JSON-RPC messages.
 */

const { spawn } = require('child_process');
const path = require('path');

const SERVER_PATH = path.join(__dirname, 'mcp-server.js');

const SCHEMA_A = `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);`;

const SCHEMA_B = `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255)
);`;

function send(proc, obj) {
  proc.stdin.write(JSON.stringify(obj) + '\n');
}

async function runTest() {
  const proc = spawn('node', [SERVER_PATH], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  let buffer = '';
  const pending = [];

  proc.stdout.on('data', chunk => {
    buffer += chunk.toString('utf8');
    let idx;
    while ((idx = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (!line) continue;
      try {
        const message = JSON.parse(line);
        if (pending.length) {
          const { resolve, reject } = pending.shift();
          if (message.error) {
            reject(new Error(message.error.message));
          } else {
            resolve(message.result);
          }
        }
      } catch (e) {
        console.error('Failed to parse line:', line);
      }
    }
  });

  const request = (method, params) => new Promise((resolve, reject) => {
    pending.push({ resolve, reject });
    send(proc, { jsonrpc: '2.0', id: pending.length, method, params });
  });

  try {
    // 1. Initialize
    const initResult = await request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'test-client', version: '1.0.0' }
    });

    if (initResult.serverInfo?.name !== 'schemalens') {
      throw new Error(`Unexpected server name: ${initResult.serverInfo?.name}`);
    }
    console.log('✅ initialize OK');

    // 2. Tools list
    const toolsResult = await request('tools/list', {});
    const toolNames = toolsResult.tools.map(t => t.name).sort();
    const expected = [
      'schemalens_detect_breaking_changes',
      'schemalens_diff_schemas',
      'schemalens_generate_migration'
    ];
    if (JSON.stringify(toolNames) !== JSON.stringify(expected)) {
      throw new Error(`Unexpected tools: ${toolNames.join(', ')}`);
    }
    console.log('✅ tools/list OK');

    // 3. Diff schemas
    const diffResult = await request('tools/call', {
      name: 'schemalens_diff_schemas',
      arguments: { schemaA: SCHEMA_A, schemaB: SCHEMA_B, dialect: 'postgres' }
    });
    if (!diffResult.content[0].text.includes('email')) {
      throw new Error('Diff did not mention added email column');
    }
    console.log('✅ schemalens_diff_schemas OK');

    // 4. Generate migration
    const migrationResult = await request('tools/call', {
      name: 'schemalens_generate_migration',
      arguments: { schemaA: SCHEMA_A, schemaB: SCHEMA_B, dialect: 'postgres' }
    });
    if (!migrationResult.content[0].text.includes('ALTER TABLE')) {
      throw new Error('Migration did not include ALTER TABLE');
    }
    console.log('✅ schemalens_generate_migration OK');

    // 5. Detect breaking changes
    const breakingResult = await request('tools/call', {
      name: 'schemalens_detect_breaking_changes',
      arguments: { schemaA: SCHEMA_A, schemaB: SCHEMA_B, dialect: 'postgres' }
    });
    if (!breakingResult.content[0].text.includes('No breaking changes detected')) {
      throw new Error('Unexpected breaking changes result');
    }
    console.log('✅ schemalens_detect_breaking_changes OK');

    console.log('\n🎉 All MCP server tests passed.');
  } catch (err) {
    console.error('\n❌ MCP server test failed:', err.message);
    proc.kill();
    process.exit(1);
  }

  proc.kill();
}

runTest();
