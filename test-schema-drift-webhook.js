/**
 * Unit tests for /api/schema-drift-webhook.js
 * Run with: node test-schema-drift-webhook.js
 */

const webhook = require('./api/schema-drift-webhook.js');

function createRes() {
  const res = {
    statusCode: 200,
    headers: {},
    jsonBody: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(key, value) {
      this.headers[key] = value;
    },
    json(body) {
      this.jsonBody = body;
      return this;
    },
    end() {
      return this;
    }
  };
  return res;
}

function createReq(body, method = 'POST') {
  return {
    method,
    headers: { 'x-forwarded-for': '127.0.0.1' },
    socket: { remoteAddress: '127.0.0.1' },
    body
  };
}

function generateValidKey() {
  const SALT = 'SchemaLensPro2026';
  const payload = 'A'.repeat(12);
  let hash = 0;
  const data = payload + SALT;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash) % 46656;
  const check = hash.toString(36).toUpperCase().padStart(4, '0');
  return `SL-${payload.slice(0, 4)}-${payload.slice(4, 8)}-${payload.slice(8, 12)}-${check}`;
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  async function assert(name, condition) {
    if (condition) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
      failed++;
    }
  }

  // 1. Free tier: missing projectToken but missing schemas returns 400
  {
    const req = createReq({});
    const res = createRes();
    await webhook(req, res);
    await assert('free tier missing schemas returns 400', res.statusCode === 400 && res.jsonBody.error);
  }

  // 2. Invalid project token returns 401
  {
    const req = createReq({ projectToken: 'invalid' });
    const res = createRes();
    await webhook(req, res);
    await assert('invalid projectToken returns 401', res.statusCode === 401);
  }

  // 3. Free tier with schemas returns 200, tier=free, alertUrl
  {
    const req = createReq({
      oldSchema: 'CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255));',
      newSchema: 'CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) NOT NULL);',
      dialect: 'postgres',
      metadata: { repo: 'test/repo', branch: 'main' }
    });
    const res = createRes();
    await webhook(req, res);
    await assert('free tier valid request returns 200', res.statusCode === 200);
    await assert('free tier response includes tier=free', res.jsonBody?.tier === 'free');
    await assert('free tier response includes alertId', res.jsonBody?.alertId?.length > 0);
    await assert('free tier response includes alertUrl', res.jsonBody?.alertUrl?.includes('/schema-drift-alert.html#'));
    await assert('free tier summary has tablesModified', res.jsonBody?.summary?.tablesModified === 1);
    await assert('free tier breaking count is 1', res.jsonBody?.breakingCount === 1);
  }

  // 4. Team tier with valid token returns 200, tier=team
  {
    const req = createReq({
      projectToken: generateValidKey(),
      oldSchema: 'CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255));',
      newSchema: 'CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) NOT NULL);',
      dialect: 'postgres',
      metadata: { repo: 'test/repo', branch: 'main' }
    });
    const res = createRes();
    await webhook(req, res);
    await assert('team tier valid request returns 200', res.statusCode === 200);
    await assert('team tier response includes tier=team', res.jsonBody?.tier === 'team');
    await assert('team tier response includes alertId', res.jsonBody?.alertId?.length > 0);
    await assert('team tier summary has tablesModified', res.jsonBody?.summary?.tablesModified === 1);
  }

  // 5. OPTIONS request returns 200
  {
    const req = { method: 'OPTIONS', headers: {} };
    const res = createRes();
    await webhook(req, res);
    await assert('OPTIONS returns 200', res.statusCode === 200);
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
