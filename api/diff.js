/**
 * SchemaLens REST API
 * POST /api/diff
 *
 * Body:
 *   schemaA     string  required  Old schema SQL
 *   schemaB     string  required  New schema SQL
 *   dialect     string  optional  postgres | mysql | sqlite | mssql | oracle (default: postgres)
 *   format      string  optional  json | markdown (default: json)
 *   licenseKey  string  required  Valid SchemaLens Pro license key (SL-XXXX-XXXX-XXXX-XXXX)
 *
 * Response (json):
 *   diff              object   Full diff result
 *   migration         string   Generated migration SQL
 *   breakingChanges   array    Detected breaking changes
 *   riskScore         object   Risk score (0-100), label, color, icon
 *   summary           object   Counts of tables, enums, triggers, views, breaking changes
 *
 * Response (markdown):
 *   markdown          string   Full markdown report
 */

const {
  parseSQL,
  diffSchemas,
  detectBreakingChanges,
  calculateRiskScore,
  generateMigration,
  generateMarkdown
} = require('../lib/engine');

const SALT = 'SchemaLensPro2026';

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

// In-memory rate limiter (per IP, per minute)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // 30 requests per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  return false;
}

// Simple cleanup every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt + RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

module.exports = (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-License-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Maximum 30 requests per minute.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { schemaA, schemaB, dialect = 'postgres', format = 'json', licenseKey } = req.body || {};
  const headerKey = req.headers['x-license-key'];
  const key = licenseKey || headerKey;

  if (!key || !validateLicenseKey(key)) {
    return res.status(401).json({
      error: 'A valid SchemaLens Pro license key is required for API access.',
      upgradeUrl: 'https://schemalens.tech/pricing.html'
    });
  }

  if (typeof schemaA !== 'string' || typeof schemaB !== 'string') {
    return res.status(400).json({ error: 'schemaA and schemaB are required string fields.' });
  }

  const validDialects = ['postgres', 'mysql', 'sqlite', 'mssql', 'oracle'];
  if (!validDialects.includes(dialect)) {
    return res.status(400).json({ error: `Invalid dialect. Must be one of: ${validDialects.join(', ')}` });
  }

  const validFormats = ['json', 'markdown'];
  if (!validFormats.includes(format)) {
    return res.status(400).json({ error: `Invalid format. Must be one of: ${validFormats.join(', ')}` });
  }

  try {
    const oldSchema = parseSQL(schemaA, dialect);
    const newSchema = parseSQL(schemaB, dialect);
    const diff = diffSchemas(oldSchema, newSchema);
    const breakingChanges = detectBreakingChanges(diff);

    if (format === 'markdown') {
      const markdown = generateMarkdown(diff, dialect);
      return res.status(200).json({ markdown });
    }

    const migration = generateMigration(diff, dialect);
    const riskScore = calculateRiskScore(diff);

    return res.status(200).json({
      diff,
      migration,
      breakingChanges,
      riskScore: {
        score: riskScore.score,
        label: riskScore.label,
        icon: riskScore.icon
      },
      summary: {
        tablesAdded: diff.tablesAdded.length,
        tablesRemoved: diff.tablesRemoved.length,
        tablesRenamed: diff.tablesRenamed.length,
        tablesModified: diff.tablesModified.length,
        enumsAdded: diff.enumsAdded.length,
        enumsRemoved: diff.enumsRemoved.length,
        triggersAdded: diff.triggersAdded.length,
        triggersRemoved: diff.triggersRemoved.length,
        triggersModified: diff.triggersModified.length,
        viewsAdded: diff.viewsAdded.length,
        viewsRemoved: diff.viewsRemoved.length,
        viewsModified: diff.viewsModified.length,
        functionsAdded: diff.functionsAdded.length,
        functionsRemoved: diff.functionsRemoved.length,
        functionsModified: diff.functionsModified.length,
        breakingChangeCount: breakingChanges.length
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
