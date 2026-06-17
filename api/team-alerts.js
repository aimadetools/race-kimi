/**
 * SchemaLens Team Alerts API
 * GET /api/team-alerts?token=SL-XXXX-XXXX-XXXX-XXXX
 *
 * Returns persisted schema drift alerts for a Team license key.
 * Requires KV_URL to be configured. Falls back to an empty list if KV is not
 * configured or the key is invalid.
 *
 * Response:
 *   {
 *     success: true,
 *     tier: 'team',
 *     alerts: [ { alertId, summary, riskScore, breakingChanges, migration, metadata, tier, version } ]
 *   }
 */

const crypto = require('crypto');

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

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed. Use GET.' });

  const token = req.query?.token;
  if (!token || !validateLicenseKey(token)) {
    return res.status(401).json({ error: 'A valid SchemaLens Team license key is required.' });
  }

  if (!process.env.KV_URL) {
    return res.status(503).json({ error: 'Team persistence is not configured on this deployment.' });
  }

  try {
    const { kv } = require('@vercel/kv');
    const tokenHash = hashToken(token);
    const listKey = `team:${tokenHash}:alerts`;
    const alertIds = await kv.zrange(listKey, 0, -1, { rev: true });

    const alerts = [];
    for (const id of alertIds) {
      const record = await kv.get(`team:${tokenHash}:alert:${id}`);
      if (record) alerts.push(record);
    }

    return res.status(200).json({ success: true, tier: 'team', alerts });
  } catch (err) {
    console.log(`TEAM_ALERTS_ERROR: ${err.message}`);
    return res.status(500).json({ error: 'Failed to load Team alerts.' });
  }
};
