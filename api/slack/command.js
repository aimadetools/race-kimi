/**
 * SchemaLens Slack Slash Command Handler
 * POST /api/slack/command
 *
 * Command: /schemalens [old] [new] [--dialect postgres]
 *
 * Responds with a rich diff report in the channel where the command was invoked.
 * If no arguments are provided, shows usage instructions.
 */

const { verifySlackRequest, formatDiffSlackMessage, isConfigured, BASE_URL } = require('../../lib/slack');

function parseCommandArgs(text = '') {
  const args = text.trim().split(/\s+/).filter(Boolean);
  let dialect = 'postgres';
  let dialectIdx = args.findIndex(a => a === '--dialect' || a === '-d');
  if (dialectIdx !== -1 && args[dialectIdx + 1]) {
    dialect = args[dialectIdx + 1];
    args.splice(dialectIdx, 2);
  }
  return { args, dialect };
}

async function fetchSchema(url) {
  if (!/^https?:\/\//.test(url)) return url;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    clearTimeout(timeout);
    throw new Error(`Could not fetch ${url}: ${err.message}`);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!isConfigured()) {
    return res.status(200).json({
      response_type: 'ephemeral',
      text: 'SchemaLens Slack app is not fully configured on this deployment. Ask an admin to set the Slack environment variables in Vercel.'
    });
  }

  // Read raw body for signature verification
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks).toString('utf8');

  if (!verifySlackRequest(req, rawBody)) {
    return res.status(403).json({ error: 'Invalid Slack signature' });
  }

  const params = new URLSearchParams(rawBody);
  const text = params.get('text') || '';
  const responseUrl = params.get('response_url') || '';

  if (!text.trim()) {
    return res.status(200).json({
      response_type: 'ephemeral',
      text: 'Usage: `/schemalens <old schema URL or SQL> <new schema URL or SQL> [--dialect postgres|mysql|sqlite|mssql|oracle]`\n\nExample:\n`/schemalens https://example.com/base.sql https://example.com/head.sql --dialect postgres`'
    });
  }

  const { args, dialect } = parseCommandArgs(text);
  if (args.length < 2) {
    return res.status(200).json({
      response_type: 'ephemeral',
      text: 'Please provide two schema sources (URLs or raw SQL snippets). Use `--dialect` to specify the SQL dialect.'
    });
  }

  try {
    const oldSchema = await fetchSchema(args[0]);
    const newSchema = await fetchSchema(args[1]);
    const message = formatDiffSlackMessage({ oldSchema, newSchema, dialect, source: 'Slack slash command' });

    // Slack requires a response within 3 seconds. Return the report immediately.
    return res.status(200).json({
      response_type: 'in_channel',
      ...message
    });
  } catch (err) {
    console.log(`SLACK_COMMAND_ERROR: ${err.message}`);
    return res.status(200).json({
      response_type: 'ephemeral',
      text: `Could not generate diff: ${err.message}\n\nTry the web app: ${BASE_URL}/app.html`
    });
  }
};
