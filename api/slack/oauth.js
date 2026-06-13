/**
 * SchemaLens Slack App OAuth Callback
 * GET /api/slack/oauth
 *
 * Exchanges the temporary OAuth code for a workspace token and redirects
 * to a success page. The bot token is logged (hashed) for verification only;
 * in production it should be persisted to a database keyed by team_id.
 */

const crypto = require('crypto');
const { exchangeSlackCode, isConfigured, BASE_URL } = require('../../lib/slack');

module.exports = async (req, res) => {
  const { code, error, state } = req.query || {};

  if (error) {
    return res.status(400).send(`Slack authorization declined: ${error}. <a href="${BASE_URL}/slack-app.html">Try again</a>`);
  }

  if (!code) {
    return res.status(400).send(`Missing OAuth code. <a href="${BASE_URL}/slack-app.html">Install SchemaLens for Slack</a>`);
  }

  if (!isConfigured()) {
    return res.status(503).send('Slack app is not configured on this deployment. Set SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, and SLACK_SIGNING_SECRET in Vercel.');
  }

  try {
    const redirectUri = `${BASE_URL}/api/slack/oauth`;
    const data = await exchangeSlackCode(code, redirectUri);

    if (!data.ok) {
      console.log(`SLACK_OAUTH_ERROR: ${data.error}`);
      return res.status(400).send(`Slack OAuth failed: ${data.error}. <a href="${BASE_URL}/slack-app.html">Try again</a>`);
    }

    const teamName = data.team?.name || 'your workspace';
    const teamId = data.team?.id || 'unknown';
    const botToken = data.access_token || '';

    // In production, store the encrypted bot token keyed by team_id.
    // For now we log a hash so the installation can be verified without leaking secrets.
    const tokenHash = botToken ? crypto.createHash('sha256').update(botToken).digest('hex').slice(0, 16) : 'none';
    console.log(`SLACK_INSTALL: team=${teamId} hash=${tokenHash}`);

    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SchemaLens Installed — Slack</title>
        <link rel="stylesheet" href="${BASE_URL}/style.css">
      </head>
      <body>
        <div class="container" style="text-align:center; padding:80px 20px;">
          <h1>✅ SchemaLens installed in ${teamName}</h1>
          <p style="color:var(--text-muted); margin:16px 0 32px;">Try typing <code>/schemalens</code> in any channel to diff two schemas.</p>
          <a href="${BASE_URL}/slack-app.html" class="btn btn-primary">Back to SchemaLens</a>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.log(`SLACK_OAUTH_EXCEPTION: ${err.message}`);
    return res.status(502).send(`OAuth exchange failed. <a href="${BASE_URL}/slack-app.html">Try again</a>`);
  }
};
