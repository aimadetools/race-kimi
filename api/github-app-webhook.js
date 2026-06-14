/**
 * SchemaLens GitHub App Webhook
 * POST /api/github-app-webhook
 *
 * Handles GitHub App events:
 *   - ping: confirms webhook configuration
 *   - pull_request (opened, synchronize, reopened):
 *       reads the changed SQL schema file, computes a diff, and posts/updates
 *       a PR comment with risk score, breaking changes, and migration SQL.
 *
 * Required environment variables:
 *   GITHUB_APP_ID              GitHub App ID
 *   GITHUB_APP_PRIVATE_KEY     PEM private key from the GitHub App settings
 *   GITHUB_APP_WEBHOOK_SECRET  Webhook secret used to verify signatures
 *
 * Optional repo config (`.schemalens.json` in repo root):
 *   {
 *     "schemaPath": "schema.sql",
 *     "dialect": "postgres"
 *   }
 *
 * If no config exists, the app looks at changed `.sql` files in the PR.
 * Exactly one changed `.sql` file is diffed automatically; multiple changed
 * `.sql` files trigger a guidance comment asking the user to add a config file.
 */

const {
  verifyWebhookSignature,
  createAppJWT,
  getInstallationToken,
  getAppConfig,
  getFileContent,
  getPullRequestFiles,
  upsertPRComment,
  inferDialect,
  buildPRComment
} = require('../lib/github-app');

const {
  parseSQL,
  diffSchemas,
  detectBreakingChanges,
  calculateRiskScore,
  generateMigration
} = require('../lib/engine');

const MARKER = '<!-- schemalens-bot -->';
const APP_URL = 'https://schemalens.tech/github-app.html';

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// Disable Vercel's automatic body parsing so we can verify the raw signature.
module.exports.config = {
  api: { bodyParser: false }
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const rawBody = await getRawBody(req);
  const signature = req.headers['x-hub-signature-256'];
  const event = req.headers['x-github-event'];
  const delivery = req.headers['x-github-delivery'] || 'unknown';

  if (!verifyWebhookSignature(rawBody, signature, process.env.GITHUB_APP_WEBHOOK_SECRET)) {
    console.log(`GITHUB_APP_WEBHOOK_INVALID: delivery=${delivery}`);
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  if (event === 'ping') {
    return res.status(200).json({ ok: true, message: 'pong' });
  }

  if (event !== 'pull_request') {
    return res.status(200).json({ ok: true, ignored: true, event });
  }

  if (!['opened', 'synchronize', 'reopened'].includes(payload.action)) {
    return res.status(200).json({ ok: true, ignored: true, action: payload.action });
  }

  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;
  if (!appId || !privateKey) {
    console.log('GITHUB_APP_WEBHOOK_NOT_CONFIGURED');
    return res.status(200).json({ ok: false, error: 'GitHub App credentials are not configured' });
  }

  const owner = payload.repository?.owner?.login;
  const repo = payload.repository?.name;
  const installationId = payload.installation?.id;
  const pullNumber = payload.number;
  const baseSha = payload.pull_request?.base?.sha;
  const headSha = payload.pull_request?.head?.sha;

  if (!owner || !repo || !installationId || !pullNumber || !baseSha || !headSha) {
    console.log('GITHUB_APP_WEBHOOK_MISSING_FIELDS');
    return res.status(200).json({ ok: false, error: 'Missing required payload fields' });
  }

  const logPrefix = `${owner}/${repo}#${pullNumber}`;

  try {
    const jwt = createAppJWT(appId, privateKey);
    const token = await getInstallationToken(jwt, installationId);

    // 1. Determine schema path and dialect
    const config = await getAppConfig({ owner, repo, ref: headSha, token });
    let schemaPath = null;
    let dialect = 'postgres';

    if (config && config.schemaPath) {
      schemaPath = config.schemaPath;
      dialect = config.dialect || inferDialect('', schemaPath);
    } else {
      const files = await getPullRequestFiles({ owner, repo, pullNumber, token });
      const sqlFiles = files
        .filter(f => typeof f.filename === 'string' && f.filename.endsWith('.sql'))
        .map(f => f.filename);

      if (sqlFiles.length === 0) {
        console.log(`GITHUB_APP_NO_SQL_FILES: ${logPrefix}`);
        return res.status(200).json({ ok: true, ignored: true, reason: 'No .sql files changed' });
      }

      if (sqlFiles.length > 1) {
        const body = `${MARKER}\n## 🔍 SchemaLens GitHub App\n\nI see **${sqlFiles.length}** SQL files changed in this PR. To generate an accurate schema diff, add a \`.schemalens.json\` config to your repo root:\n\n\`\`\`json\n{\n  "schemaPath": "${sqlFiles[0]}",\n  "dialect": "postgres"\n}\n\`\`\`\n\nSupported dialects: \`postgres\`, \`mysql\`, \`sqlite\`, \`mssql\`, \`oracle\`.\n\n---\n*Generated by the [SchemaLens GitHub App](${APP_URL}).*\n`;
        await upsertPRComment({ owner, repo, pullNumber, body, token, marker: MARKER });
        console.log(`GITHUB_APP_GUIDANCE_POSTED: ${logPrefix}`);
        return res.status(200).json({ ok: true, reason: 'Multiple .sql files; guidance posted' });
      }

      schemaPath = sqlFiles[0];
      dialect = inferDialect('', schemaPath);
    }

    // 2. Fetch old and new schema contents
    const [oldSchema, newSchema] = await Promise.all([
      getFileContent({ owner, repo, path: schemaPath, ref: baseSha, token }),
      getFileContent({ owner, repo, path: schemaPath, ref: headSha, token })
    ]);

    if (!oldSchema || !newSchema) {
      console.log(`GITHUB_APP_FILE_MISSING: ${logPrefix} path=${schemaPath}`);
      return res.status(200).json({ ok: false, error: 'Could not read schema file from base or head ref' });
    }

    // Refine dialect from file content unless explicitly configured
    if (!config || !config.dialect) {
      dialect = inferDialect(newSchema, schemaPath);
    }

    // 3. Compute diff
    const oldParsed = parseSQL(oldSchema, dialect);
    const newParsed = parseSQL(newSchema, dialect);
    const diff = diffSchemas(oldParsed, newParsed);
    const breakingChanges = detectBreakingChanges(diff);
    const riskScore = calculateRiskScore(diff);
    const migration = generateMigration(diff, dialect);

    // 4. Post or update PR comment
    const commentBody = buildPRComment({
      diff,
      breakingChanges,
      riskScore,
      migration,
      dialect,
      appUrl: APP_URL
    });

    await upsertPRComment({ owner, repo, pullNumber, body: commentBody, token, marker: MARKER });
    console.log(`GITHUB_APP_COMMENT_POSTED: ${logPrefix} risk=${riskScore.score} breaking=${breakingChanges.length}`);

    return res.status(200).json({
      ok: true,
      riskScore: riskScore.score,
      breakingChanges: breakingChanges.length,
      tablesAdded: diff.tablesAdded?.length || 0,
      tablesRemoved: diff.tablesRemoved?.length || 0,
      tablesModified: diff.tablesModified?.length || 0
    });
  } catch (err) {
    console.log(`GITHUB_APP_WEBHOOK_ERROR: ${logPrefix} ${err.message}`);
    return res.status(200).json({ ok: false, error: err.message });
  }
};
