/**
 * SchemaLens Slack Events API Endpoint
 * POST /api/slack/events
 *
 * Handles Slack Events API subscriptions:
 *   - url_verification: responds with challenge
 *   - app_home_opened: publishes a helpful Home tab
 */

const { verifySlackRequest, isConfigured, isBotConfigured, BASE_URL, getEnv } = require('../../lib/slack');

async function publishHomeTab(userId) {
  const token = getEnv('SLACK_BOT_TOKEN');
  if (!token) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    await fetch('https://slack.com/api/views.publish', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        view: {
          type: 'home',
          blocks: [
            {
              type: 'header',
              text: { type: 'plain_text', text: 'Welcome to SchemaLens 👋', emoji: true }
            },
            {
              type: 'section',
              text: { type: 'mrkdwn', text: `Diff SQL schemas and catch breaking changes directly in Slack. Every alert links back to a full report on <${BASE_URL}|SchemaLens>.` }
            },
            { type: 'divider' },
            {
              type: 'section',
              text: { type: 'mrkdwn', text: '*Quick commands*\n• Type `/schemalens <old> <new>` in any channel to diff schemas.\n• Add SchemaLens to your CI/CD pipeline to get automatic alerts.' }
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: 'Open SchemaLens', emoji: true },
                  url: `${BASE_URL}/app.html`,
                  action_id: 'home_open_app'
                },
                {
                  type: 'button',
                  text: { type: 'plain_text', text: 'CI/CD Docs', emoji: true },
                  url: `${BASE_URL}/ci-cd-integration.html`,
                  action_id: 'home_open_docs'
                }
              ]
            }
          ]
        }
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);
  } catch (err) {
    clearTimeout(timeout);
    console.log(`SLACK_HOME_TAB_ERROR: ${err.message}`);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!isConfigured()) {
    return res.status(503).json({ error: 'Slack app not configured' });
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks).toString('utf8');

  if (!verifySlackRequest(req, rawBody)) {
    return res.status(403).json({ error: 'Invalid Slack signature' });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  if (payload.type === 'url_verification') {
    return res.status(200).send(payload.challenge);
  }

  if (payload.event?.type === 'app_home_opened') {
    if (isBotConfigured()) {
      await publishHomeTab(payload.event.user);
    }
    return res.status(200).end();
  }

  // Acknowledge all other events
  return res.status(200).end();
};
