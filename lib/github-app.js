/**
 * SchemaLens GitHub App helpers
 *
 * Shared utilities for verifying webhook signatures, creating GitHub App JWTs,
 * exchanging them for installation tokens, and calling the GitHub API.
 */

const crypto = require('crypto');

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Normalize a PEM private key that may have escaped newlines in an env var.
 */
function normalizePrivateKey(key) {
  if (!key) return '';
  return key.replace(/\\n/g, '\n').trim();
}

/**
 * Verify the X-Hub-Signature-256 header from a GitHub webhook payload.
 */
function verifyWebhookSignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');
  if (expected.length !== signature.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

/**
 * Create a GitHub App JWT (RS256) valid for 9 minutes.
 */
function createAppJWT(appId, privateKey) {
  const key = normalizePrivateKey(privateKey);
  const privateKeyObj = crypto.createPrivateKey(key);
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iat: now - 60,
    exp: now + 540,
    iss: String(appId)
  };

  const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const signingInput = `${encode(header)}.${encode(payload)}`;
  const signature = crypto.sign('RSA-SHA256', Buffer.from(signingInput), privateKeyObj);
  return `${signingInput}.${signature.toString('base64url')}`;
}

/**
 * Exchange a GitHub App JWT for an installation access token.
 */
async function getInstallationToken(jwt, installationId) {
  const res = await fetch(`${GITHUB_API_BASE}/app/installations/${installationId}/access_tokens`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'SchemaLens-GitHub-App'
    }
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to get installation token: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.token;
}

/**
 * Generic GitHub API request using an installation token.
 */
async function githubApiRequest({ path, token, method = 'GET', body }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${GITHUB_API_BASE}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'SchemaLens-GitHub-App',
        ...(body ? { 'Content-Type': 'application/json' } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (res.status === 404) return null;
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`GitHub API error ${res.status}: ${text}`);
    }
    // Some endpoints return 204 No Content
    if (res.status === 204) return null;
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch and decode a text file from a repo at a given ref.
 */
async function getFileContent({ owner, repo, path, ref, token }) {
  const encodedPath = encodeURIComponent(path);
  const refParam = ref ? `?ref=${encodeURIComponent(ref)}` : '';
  const data = await githubApiRequest({ path: `/repos/${owner}/${repo}/contents/${encodedPath}${refParam}`, token });
  if (!data || !data.content) return null;
  return Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8');
}

/**
 * Fetch the optional .schemalens.json config from the repo root.
 */
async function getAppConfig({ owner, repo, ref, token }) {
  try {
    const content = await getFileContent({ owner, repo, path: '.schemalens.json', ref, token });
    if (!content) return null;
    return JSON.parse(content);
  } catch (err) {
    console.log(`GITHUB_APP_CONFIG_PARSE_ERROR: ${err.message}`);
    return null;
  }
}

/**
 * List files changed in a pull request.
 */
async function getPullRequestFiles({ owner, repo, pullNumber, token }) {
  const files = await githubApiRequest({ path: `/repos/${owner}/${repo}/pulls/${pullNumber}/files?per_page=100`, token });
  return Array.isArray(files) ? files : [];
}

/**
 * List existing comments on a pull request (issue endpoint).
 */
async function getPullRequestComments({ owner, repo, pullNumber, token }) {
  const comments = await githubApiRequest({ path: `/repos/${owner}/${repo}/issues/${pullNumber}/comments?per_page=100`, token });
  return Array.isArray(comments) ? comments : [];
}

/**
 * Post or update a PR comment from the app.
 */
async function upsertPRComment({ owner, repo, pullNumber, body, token, marker }) {
  const comments = await getPullRequestComments({ owner, repo, pullNumber, token });
  const existing = comments.find(c => typeof c.body === 'string' && c.body.includes(marker));
  if (existing) {
    return githubApiRequest({
      path: `/repos/${owner}/${repo}/issues/comments/${existing.id}`,
      token,
      method: 'PATCH',
      body: { body }
    });
  }
  return githubApiRequest({
    path: `/repos/${owner}/${repo}/issues/${pullNumber}/comments`,
    token,
    method: 'POST',
    body: { body }
  });
}

/**
 * Infer SQL dialect from file path and/or content.
 */
function inferDialect(sql, filePath = '') {
  const p = (filePath || '').toLowerCase();
  if (p.includes('mysql') || p.includes('mariadb')) return 'mysql';
  if (p.includes('postgres') || p.includes('pgsql') || p.includes('pg_')) return 'postgres';
  if (p.includes('sqlite')) return 'sqlite';
  if (p.includes('mssql') || p.includes('sqlserver') || p.includes('tsql')) return 'mssql';
  if (p.includes('oracle') || p.includes('plsql') || p.includes('varchar2')) return 'oracle';

  const s = (sql || '').toUpperCase();
  if (s.includes('AUTO_INCREMENT')) return 'mysql';
  if (s.includes('AUTOINCREMENT')) return 'sqlite';
  if (s.includes('IDENTITY(1,1)') || s.includes('IDENTITY (1,1)') || s.includes('NVARCHAR')) return 'mssql';
  if (s.includes('VARCHAR2') || /\bNUMBER\s*[\( ]/.test(s)) return 'oracle';
  if (s.includes('SERIAL') || s.includes('GENERATED ALWAYS AS IDENTITY') || s.includes('DEFAULT NEXTVAL')) return 'postgres';
  return 'postgres';
}

/**
 * Build the markdown body for a PR comment.
 */
function buildPRComment({ diff, breakingChanges, riskScore, migration, dialect, appUrl }) {
  const marker = '<!-- schemalens-bot -->';
  const added = diff.tablesAdded?.length || 0;
  const removed = diff.tablesRemoved?.length || 0;
  const modified = diff.tablesModified?.length || 0;

  let body = `${marker}\n## 🔍 SchemaLens Schema Diff Report\n\n`;
  body += `**Dialect:** ${dialect}\n\n`;
  body += '| Metric | Value |\n|--------|-------|\n';
  body += `| 🟢 Tables Added | ${added} |\n`;
  body += `| 🔴 Tables Removed | ${removed} |\n`;
  body += `| 🟡 Tables Modified | ${modified} |\n`;
  body += `| ⚠️ Breaking Changes | ${breakingChanges.length} |\n`;
  body += `| 📊 Risk Score | ${riskScore.score}/100 (${riskScore.label}) |\n\n`;

  if (breakingChanges.length > 0) {
    body += '### ⚠️ Breaking Changes\n';
    for (const bc of breakingChanges.slice(0, 20)) {
      body += `- **${bc.type}** — ${bc.details}\n`;
    }
    body += '\n';
  }

  if (migration) {
    const maxMigrationLen = 50000;
    const sql = migration.length > maxMigrationLen
      ? migration.slice(0, maxMigrationLen) + '\n-- ... migration truncated; open the SchemaLens app for the full script ...'
      : migration;
    body += '### Generated Migration\n\n```sql\n' + sql + '\n```\n\n';
  }

  body += '---\n';
  body += `*Generated by the [SchemaLens GitHub App](${appUrl}). Add Slack/Teams alerts and a team dashboard with [SchemaLens Team](https://schemalens.tech/team.html).*\n`;

  return body;
}

module.exports = {
  verifyWebhookSignature,
  createAppJWT,
  getInstallationToken,
  githubApiRequest,
  getFileContent,
  getAppConfig,
  getPullRequestFiles,
  getPullRequestComments,
  upsertPRComment,
  inferDialect,
  buildPRComment
};
