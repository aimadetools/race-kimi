/**
 * SchemaLens Schema Drift Webhook API
 * POST /api/schema-drift-webhook
 *
 * Receives schema diff results from CI/CD pipelines and forwards rich alerts
 * to Slack, Microsoft Teams, or a generic HTTPS webhook endpoint.
 *
 * Free tier: no projectToken required. Generates a shareable alert URL and sends
 * up to one Slack, Teams, and generic webhook notification per alert.
 * Team tier: provide a SchemaLens Team license key for higher rate limits and
 * persistent alert history (when KV is configured).
 *
 * Body:
 *   projectToken    string  optional  SchemaLens Team/Pro license key (validates project)
 *   oldSchema       string  optional  Old/base schema SQL
 *   newSchema       string  optional  New/current schema SQL
 *   dialect         string  optional  postgres | mysql | sqlite | mssql | oracle (default: postgres)
 *   diff            object  optional  Pre-computed diff result (alternative to oldSchema/newSchema)
 *   breakingChanges array   optional  Pre-computed breaking changes
 *   riskScore       object  optional  Pre-computed risk score
 *   migration       string  optional  Generated migration SQL
 *   metadata        object  optional  { repo, branch, commit, commitUrl, prUrl, author, ciProvider, runId }
 *   notify          object  optional  { slack?: string, teams?: string, webhook?: string }
 *
 * Response:
 *   {
 *     success: true,
 *     tier: 'free' | 'team',
 *     alertId: string,
 *     alertUrl: string,          // Public alert page URL with encoded payload
 *     summary: object,
 *     riskScore: object,
 *     breakingCount: number,
 *     notificationsSent: { slack: bool, teams: bool, webhook: bool }
 *   }
 *
 * Security:
 *   - If projectToken is provided, it must be a valid SchemaLens license key
 *   - Free tier rate limit: 10 requests/minute per IP
 *   - Team tier rate limit: 60 requests/minute per project token
 *   - Notification URLs must use https://
 *   - Schema SQL processed in-memory only; never logged or stored server-side on free tier
 */

const crypto = require('crypto');
const {
  parseSQL,
  diffSchemas,
  detectBreakingChanges,
  calculateRiskScore,
  generateMigration
} = require('../lib/engine');

const SALT = 'SchemaLensPro2026';
const BASE_URL = 'https://schemalens.tech';

function validateLicenseKey(key) {
  if (!/^SL-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key)) return false;
  const parts = key.replace(/^SL-/, '').split('-');
  const payload = parts.slice(0, 3).join('');
  const check = parts[3];
  let hash = 0;
  const data = payload + SALT;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash) % 46656;
  const expected = hash.toString(36).toUpperCase().padStart(4, '0');
  return check === expected;
}

// Rate limiter per project token
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 30;

function isRateLimited(token) {
  const now = Date.now();
  const entry = rateLimitMap.get(token);
  if (!entry) {
    rateLimitMap.set(token, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (now > entry.resetAt) {
    rateLimitMap.set(token, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

setInterval(() => {
  const now = Date.now();
  for (const [token, entry] of rateLimitMap) {
    if (now > entry.resetAt + RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(token);
  }
}, 5 * 60 * 1000);

// Free-tier rate limiter per IP
const ipRateLimitMap = new Map();
const FREE_RATE_LIMIT_MAX = 10;
const TEAM_RATE_LIMIT_MAX = 60;

function isIpRateLimited(ip) {
  const now = Date.now();
  const entry = ipRateLimitMap.get(ip);
  if (!entry) {
    ipRateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (now > entry.resetAt) {
    ipRateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > FREE_RATE_LIMIT_MAX;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipRateLimitMap) {
    if (now > entry.resetAt + RATE_LIMIT_WINDOW_MS) ipRateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

function isValidHttpsUrl(url) {
  return typeof url === 'string' && /^https:\/\//.test(url) && url.length < 2000;
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function generateAlertId(token, metadata) {
  const raw = `${token}:${Date.now()}:${metadata?.repo || 'unknown'}:${metadata?.runId || ''}`;
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 12);
}

function maskToken(token) {
  if (!token || token.length < 12) return '***';
  return token.slice(0, 4) + '...' + token.slice(-4);
}

function sanitizeMetadata(metadata) {
  const safe = {};
  const allowed = ['repo', 'branch', 'commit', 'commitUrl', 'prUrl', 'author', 'ciProvider', 'runId'];
  for (const key of allowed) {
    const val = metadata?.[key];
    if (typeof val === 'string' && val.length < 2000) {
      safe[key] = val;
    }
  }
  return safe;
}

function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len - 1) + '…' : str;
}

function computeDiffResult(body) {
  if (body.diff && typeof body.diff === 'object') {
    return {
      diff: body.diff,
      breakingChanges: Array.isArray(body.breakingChanges) ? body.breakingChanges : [],
      riskScore: body.riskScore || { score: 0, label: 'Unknown', icon: '❓' },
      migration: typeof body.migration === 'string' ? body.migration : ''
    };
  }

  const { oldSchema, newSchema, dialect = 'postgres' } = body;
  if (typeof oldSchema !== 'string' || typeof newSchema !== 'string') {
    throw new Error('Either diff object or both oldSchema and newSchema are required.');
  }

  const validDialects = ['postgres', 'mysql', 'sqlite', 'mssql', 'oracle'];
  if (!validDialects.includes(dialect)) {
    throw new Error(`Invalid dialect. Must be one of: ${validDialects.join(', ')}`);
  }

  const oldParsed = parseSQL(oldSchema, dialect);
  const newParsed = parseSQL(newSchema, dialect);
  const diff = diffSchemas(oldParsed, newParsed);
  const breakingChanges = detectBreakingChanges(diff);
  const riskScore = calculateRiskScore(diff);
  const migration = generateMigration(diff, dialect);

  return { diff, breakingChanges, riskScore, migration };
}

function buildSummary(diff, breakingChanges) {
  return {
    tablesAdded: diff.tablesAdded?.length || 0,
    tablesRemoved: diff.tablesRemoved?.length || 0,
    tablesRenamed: diff.tablesRenamed?.length || 0,
    tablesModified: diff.tablesModified?.length || 0,
    enumsAdded: diff.enumsAdded?.length || 0,
    enumsRemoved: diff.enumsRemoved?.length || 0,
    viewsAdded: diff.viewsAdded?.length || 0,
    viewsRemoved: diff.viewsRemoved?.length || 0,
    viewsModified: diff.viewsModified?.length || 0,
    triggersAdded: diff.triggersAdded?.length || 0,
    triggersRemoved: diff.triggersRemoved?.length || 0,
    triggersModified: diff.triggersModified?.length || 0,
    functionsAdded: diff.functionsAdded?.length || 0,
    functionsRemoved: diff.functionsRemoved?.length || 0,
    functionsModified: diff.functionsModified?.length || 0,
    breakingChangeCount: breakingChanges.length
  };
}

function encodeAlertPayload(payload) {
  const json = JSON.stringify(payload);
  // Use URL-safe base64
  return Buffer.from(json, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function formatSlackMessage(alertId, summary, riskScore, breakingChanges, migration, metadata, alertUrl, tier) {
  const { repo, branch, commit, prUrl, ciProvider, runId } = metadata || {};
  const added = summary.tablesAdded;
  const removed = summary.tablesRemoved;
  const modified = summary.tablesModified;
  const breaking = summary.breakingChangeCount;

  let emoji = '🟢';
  if (breaking > 0) emoji = '🔴';
  else if (added > 0 || removed > 0 || modified > 0) emoji = '🟡';

  const titleParts = [];
  if (repo) titleParts.push(repo);
  if (branch) titleParts.push(branch);
  const title = titleParts.length ? titleParts.join(' • ') : 'Schema Drift Alert';

  const fields = [
    { type: 'mrkdwn', text: `*Tables:*\n${added} added · ${removed} removed · ${modified} modified` },
    { type: 'mrkdwn', text: `*Risk:*\n${riskScore.score || 0}/100 (${riskScore.label || 'Unknown'})` },
    { type: 'mrkdwn', text: `*Breaking:*\n${breaking} issue${breaking !== 1 ? 's' : ''}` },
    { type: 'mrkdwn', text: `*Run:*\n${ciProvider || 'CI'} ${runId ? `#${runId}` : ''}` }
  ];

  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: `${emoji} ${title}`, emoji: true } },
    { type: 'section', fields }
  ];

  if (commit) {
    blocks.push({
      type: 'context',
      elements: [{ type: 'mrkdwn', text: `Commit: \`${commit.slice(0, 8)}\`${branch ? ` on \`${branch}\`` : ''}${prUrl ? ` · <${prUrl}|View PR>` : ''}` }]
    });
  }

  if (breaking > 0 && breakingChanges.length) {
    const items = breakingChanges.slice(0, 8).map(b => {
      const icon = b.severity === 'critical' ? '🔴' : '⚠️';
      return `${icon} ${truncate(b.details || b.message || JSON.stringify(b), 250)}`;
    });
    blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: `*Breaking Changes:*\n${items.join('\n')}` }
    });
  }

  if (migration) {
    blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: `*Migration Preview:*\n\`\`\`sql\n${truncate(migration, 2800)}\n\`\`\`` }
    });
  }

  const teamDashboardUrl = tier === 'team'
    ? 'https://schemalens.tech/team/schema-drift-dashboard.html'
    : 'https://schemalens.tech/team-buy.html';
  const teamButtonText = tier === 'team' ? 'Team Dashboard' : 'Upgrade to Team';

  blocks.push({
    type: 'actions',
    elements: [
      { type: 'button', text: { type: 'plain_text', text: 'View Alert' }, url: alertUrl, style: 'primary' },
      { type: 'button', text: { type: 'plain_text', text: teamButtonText }, url: teamDashboardUrl }
    ]
  });

  if (tier === 'free') {
    blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: '💡 *Free alert.* Get persistent history, unlimited alerts, and a shared workspace with <https://schemalens.tech/team-buy.html|SchemaLens Team>.' }
    });
  }

  blocks.push({
    type: 'context',
    elements: [{ type: 'mrkdwn', text: `Alert \`${alertId}\` · ${tier === 'team' ? 'Team' : 'Free'} tier · Generated by <https://schemalens.tech|SchemaLens>` }]
  });

  return { blocks, text: `Schema drift: ${added} added, ${removed} removed, ${modified} modified, ${breaking} breaking` };
}

function formatTeamsMessage(alertId, summary, riskScore, breakingChanges, migration, metadata, alertUrl, tier) {
  const { repo, branch, commit, prUrl, ciProvider, runId } = metadata || {};
  const facts = [
    { name: 'Tables Added', value: String(summary.tablesAdded) },
    { name: 'Tables Removed', value: String(summary.tablesRemoved) },
    { name: 'Tables Modified', value: String(summary.tablesModified) },
    { name: 'Risk Score', value: `${riskScore.score || 0}/100 (${riskScore.label || 'Unknown'})` },
    { name: 'Breaking Changes', value: String(summary.breakingChangeCount) }
  ];
  if (repo) facts.unshift({ name: 'Repository', value: repo });
  if (branch) facts.push({ name: 'Branch', value: branch });
  if (runId) facts.push({ name: 'Run ID', value: runId });

  let text = `**Schema drift detected** in ${repo || 'your repository'}`;
  if (summary.breakingChangeCount > 0) text += ` — **${summary.breakingChangeCount} breaking change(s)**`;

  const sections = [{ facts }];
  if (migration) {
    sections.push({ text: `**Migration Preview**\n\`\`\`sql\n${truncate(migration, 1500)}\n\`\`\`` });
  }
  if (breakingChanges.length) {
    const list = breakingChanges.slice(0, 5).map(b => `- ${truncate(b.details || b.message || JSON.stringify(b), 200)}`).join('\n');
    sections.push({ text: `**Breaking Changes**\n${list}` });
  }

  return {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: `Schema drift alert ${alertId}`,
    themeColor: summary.breakingChangeCount > 0 ? 'ff4d4f' : 'faad14',
    title: `SchemaLens Schema Drift Alert — ${repo || 'Project'}`,
    text,
    sections,
    potentialAction: [
      { '@type': 'OpenUri', name: 'View Alert', targets: [{ os: 'default', uri: alertUrl }] },
      { '@type': 'OpenUri', name: tier === 'team' ? 'Team Dashboard' : 'Upgrade to Team', targets: [{ os: 'default', uri: tier === 'team' ? 'https://schemalens.tech/team/schema-drift-dashboard.html' : 'https://schemalens.tech/team-buy.html' }] }
    ]
  };
}

async function sendNotification(url, payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.log(`DRIFT_NOTIFY_FAILED: ${res.status} ${text.slice(0, 200)}`);
      return false;
    }
    return true;
  } catch (err) {
    clearTimeout(timeout);
    console.log(`DRIFT_NOTIFY_ERROR: ${err.message}`);
    return false;
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed. Use POST.' });

  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  const body = req.body || {};
  const { projectToken, metadata, notify } = body;

  // Determine tier. Free tier is allowed without a token. If a token is supplied it must be valid.
  let tier = 'free';
  let tokenHash = null;
  if (projectToken) {
    if (typeof projectToken !== 'string' || !validateLicenseKey(projectToken)) {
      console.log(`DRIFT_UNAUTHORIZED: ${clientIp} | ${maskToken(projectToken)}`);
      return res.status(401).json({ error: 'Invalid projectToken. Provide a valid SchemaLens Team/Pro license key, or omit the token to use the free tier.' });
    }
    tier = 'team';
    tokenHash = hashToken(projectToken);
    if (isRateLimited(tokenHash)) {
      return res.status(429).json({ error: 'Rate limit exceeded. Maximum 60 drift alerts per minute on the Team tier.' });
    }
  } else {
    if (isIpRateLimited(clientIp)) {
      return res.status(429).json({ error: 'Rate limit exceeded. Maximum 10 free drift alerts per minute. Upgrade to SchemaLens Team for higher limits.', teamUpsell: 'https://schemalens.tech/team-buy.html' });
    }
  }

  const safeMetadata = sanitizeMetadata(metadata);
  const alertId = generateAlertId(projectToken || clientIp, safeMetadata);

  let diffResult;
  try {
    diffResult = computeDiffResult(body);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const { diff, breakingChanges, riskScore, migration } = diffResult;
  const summary = buildSummary(diff, breakingChanges);
  const normalizedRisk = {
    score: typeof riskScore?.score === 'number' ? riskScore.score : 0,
    label: riskScore?.label || 'Unknown',
    icon: riskScore?.icon || '❓'
  };

  const alertPayload = {
    alertId,
    tier,
    summary,
    riskScore: normalizedRisk,
    breakingChanges: breakingChanges.slice(0, 20),
    migration: migration ? truncate(migration, 5000) : '',
    metadata: { ...safeMetadata, detectedAt: new Date().toISOString() },
    version: 1
  };

  const encoded = encodeAlertPayload(alertPayload);
  const alertUrl = `${BASE_URL}/schema-drift-alert.html#${encoded}`;

  const notificationsSent = { slack: false, teams: false, webhook: false };

  if (notify && typeof notify === 'object') {
    if (isValidHttpsUrl(notify.slack)) {
      const slackPayload = formatSlackMessage(alertId, summary, normalizedRisk, breakingChanges, migration, safeMetadata, alertUrl, tier);
      notificationsSent.slack = await sendNotification(notify.slack, slackPayload);
    }

    if (isValidHttpsUrl(notify.teams)) {
      const teamsPayload = formatTeamsMessage(alertId, summary, normalizedRisk, breakingChanges, migration, safeMetadata, alertUrl, tier);
      notificationsSent.teams = await sendNotification(notify.teams, teamsPayload);
    }

    if (isValidHttpsUrl(notify.webhook)) {
      notificationsSent.webhook = await sendNotification(notify.webhook, {
        event: 'schema-drift-alert',
        alertId,
        alertUrl,
        ...alertPayload
      });
    }
  }

  console.log(`DRIFT_ALERT: ${clientIp} | tier=${tier} | ${maskToken(projectToken || '')} | ${alertId} | ${summary.tablesAdded}/${summary.tablesRemoved}/${summary.tablesModified}/${summary.breakingChangeCount}`);

  // Optional Team persistence: if KV is configured, persist the alert for the dashboard.
  let persisted = false;
  if (tier === 'team' && tokenHash && process.env.KV_URL) {
    try {
      const { kv } = require('@vercel/kv');
      const alertRecord = {
        alertId,
        summary,
        riskScore: normalizedRisk,
        breakingChanges: breakingChanges.slice(0, 20),
        migration: migration ? truncate(migration, 5000) : '',
        metadata: { ...safeMetadata, detectedAt: new Date().toISOString() },
        tier,
        version: 1
      };
      const key = `team:${tokenHash}:alert:${alertId}`;
      const listKey = `team:${tokenHash}:alerts`;
      await kv.set(key, alertRecord, { ex: 90 * 24 * 60 * 60 }); // 90 days TTL
      await kv.zadd(listKey, { score: Date.now(), member: alertId });
      await kv.expire(listKey, 90 * 24 * 60 * 60);
      persisted = true;
    } catch (err) {
      console.log(`DRIFT_PERSIST_ERROR: ${err.message}`);
    }
  }

  return res.status(200).json({
    success: true,
    tier,
    alertId,
    alertUrl,
    summary,
    riskScore: normalizedRisk,
    breakingCount: summary.breakingChangeCount,
    notificationsSent,
    persisted
  });
};
