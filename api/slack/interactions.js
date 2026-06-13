/**
 * SchemaLens Slack Interactions Endpoint
 * POST /api/slack/interactions
 *
 * Handles block actions and shortcuts from the SchemaLens Slack app.
 * Currently acknowledges button clicks and logs them for analytics.
 */

const { verifySlackRequest, isConfigured, BASE_URL } = require('../../lib/slack');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!isConfigured()) {
    return res.status(503).json({ error: 'Slack app not configured' });
  }

  const contentType = req.headers['content-type'] || '';
  let rawBody = '';

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    rawBody = Buffer.concat(chunks).toString('utf8');
  } else {
    return res.status(400).json({ error: 'Expected application/x-www-form-urlencoded' });
  }

  if (!verifySlackRequest(req, rawBody)) {
    return res.status(403).json({ error: 'Invalid Slack signature' });
  }

  const params = new URLSearchParams(rawBody);
  const payloadStr = params.get('payload') || '{}';

  let payload;
  try {
    payload = JSON.parse(payloadStr);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  const type = payload.type;
  const user = payload.user?.id || 'unknown';
  const team = payload.team?.id || 'unknown';

  console.log(`SLACK_INTERACTION: type=${type} team=${team} user=${user}`);

  if (type === 'block_actions') {
    const action = payload.actions?.[0];
    if (action?.action_id === 'open_app') {
      return res.status(200).json({
        response_type: 'ephemeral',
        text: `Open SchemaLens: ${BASE_URL}/app.html`
      });
    }
  }

  // Acknowledge with empty 200 for everything else
  return res.status(200).end();
};
