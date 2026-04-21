/**
 * SchemaLens REST API
 * POST /api/diff
 *
 * Body:
 *   schemaA    string  required  Old schema SQL
 *   schemaB    string  required  New schema SQL
 *   dialect    string  optional  postgres | mysql | sqlite | mssql (default: postgres)
 *   format     string  optional  json | markdown (default: json)
 *
 * Response (json):
 *   diff              object   Full diff result
 *   migration         string   Generated migration SQL
 *   breakingChanges   array    Detected breaking changes
 *   summary           object   Counts of tables, enums, triggers, views, breaking changes
 *
 * Response (markdown):
 *   markdown          string   Full markdown report
 */

const {
  parseSQL,
  diffSchemas,
  detectBreakingChanges,
  generateMigration,
  generateMarkdown
} = require('../lib/engine');

module.exports = (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { schemaA, schemaB, dialect = 'postgres', format = 'json' } = req.body || {};

  if (typeof schemaA !== 'string' || typeof schemaB !== 'string') {
    return res.status(400).json({ error: 'schemaA and schemaB are required string fields.' });
  }

  const validDialects = ['postgres', 'mysql', 'sqlite', 'mssql'];
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

    return res.status(200).json({
      diff,
      migration,
      breakingChanges,
      summary: {
        tablesAdded: diff.tablesAdded.length,
        tablesRemoved: diff.tablesRemoved.length,
        tablesModified: diff.tablesModified.length,
        enumsAdded: diff.enumsAdded.length,
        enumsRemoved: diff.enumsRemoved.length,
        triggersAdded: diff.triggersAdded.length,
        triggersRemoved: diff.triggersRemoved.length,
        triggersModified: diff.triggersModified.length,
        viewsAdded: diff.viewsAdded.length,
        viewsRemoved: diff.viewsRemoved.length,
        viewsModified: diff.viewsModified.length,
        breakingChangeCount: breakingChanges.length
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
