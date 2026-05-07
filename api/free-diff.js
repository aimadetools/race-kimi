/**
 * SchemaLens FREE Diff API
 * POST /api/free-diff
 *
 * No license key required. Returns a summarized diff with a migration teaser.
 * Perfect for CI/CD pipelines, open-source projects, and quick checks.
 *
 * Body:
 *   schemaA     string  required  Old schema SQL
 *   schemaB     string  required  New schema SQL
 *   dialect     string  optional  postgres | mysql | sqlite | mssql | oracle (default: postgres)
 *   format      string  optional  json | markdown (default: json)
 *
 * Response:
 *   summary           object   Counts of changes
 *   riskScore         object   Risk score (0-100), label, icon
 *   breakingChanges   array    First 5 breaking changes only
 *   migrationTeaser   string   First 5 lines of migration SQL
 *   upgradeUrl        string   Link to unlock full migration
 */

const {
  parseSQL,
  diffSchemas,
  detectBreakingChanges,
  calculateRiskScore,
  generateMigration
} = require('../lib/engine');

// Stricter rate limit for free tier
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;

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
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) return true;
  return false;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt + RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

function truncateMigration(sql, lines = 5) {
  if (!sql) return '';
  const split = sql.split('\n').filter(l => l.trim());
  return split.slice(0, lines).join('\n');
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Maximum 15 requests per minute on the free tier. Upgrade to Pro for unlimited API access.',
      upgradeUrl: 'https://schemalens.tech/pricing.html'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { schemaA, schemaB, dialect = 'postgres', format = 'json' } = req.body || {};

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
    const riskScore = calculateRiskScore(diff);
    const migration = generateMigration(diff, dialect);

    if (format === 'markdown') {
      const teaser = truncateMigration(migration, 5);
      const lines = migration.split('\n').filter(l => l.trim()).length;
      const md = [
        '## Schema Diff Summary',
        '',
        `**Dialect:** ${dialect}`,
        `**Risk Score:** ${riskScore.score}/100 (${riskScore.label})`,
        '',
        '| Change Type | Count |',
        '|-------------|-------|',
        `| Tables Added | ${diff.tablesAdded.length} |`,
        `| Tables Removed | ${diff.tablesRemoved.length} |`,
        `| Tables Modified | ${diff.tablesModified.length} |`,
        `| Breaking Changes | ${breakingChanges.length} |`,
        '',
        '### Migration Preview (first 5 lines)',
        '```sql',
        teaser || '-- No migration needed',
        '```',
        lines > 5 ? `\n*... and ${lines - 5} more lines. [Unlock full migration](https://schemalens.tech/pricing.html)*` : '',
        '',
        '*Generated with [SchemaLens Free Diff API](https://schemalens.tech/api-guide.html)*'
      ].join('\n');
      return res.status(200).json({ markdown: md });
    }

    return res.status(200).json({
      summary: {
        tablesAdded: diff.tablesAdded.length,
        tablesRemoved: diff.tablesRemoved.length,
        tablesRenamed: diff.tablesRenamed?.length || 0,
        tablesModified: diff.tablesModified.length,
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
      },
      riskScore: {
        score: riskScore.score,
        label: riskScore.label,
        icon: riskScore.icon
      },
      breakingChanges: breakingChanges.slice(0, 5),
      migrationTeaser: truncateMigration(migration, 5),
      totalMigrationLines: migration.split('\n').filter(l => l.trim()).length,
      upgradeUrl: 'https://schemalens.tech/pricing.html',
      poweredBy: 'SchemaLens Free Diff API — https://schemalens.tech/api-guide.html'
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
