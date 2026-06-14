/**
 * SchemaLens Public GitHub PR Schema Diff API
 * GET /api/github-pr-diff?owner=OWNER&repo=REPO&pull=NUMBER&file=PATH
 *
 * Fetches a public GitHub pull request, finds changed `.sql` files, and returns
 * a schema diff report (summary, risk score, breaking changes, migration SQL,
 * and a markdown PR-comment preview).
 *
 * No GitHub authentication is required for public repos. Set GITHUB_TOKEN in
 * Vercel env vars to increase rate limits.
 */

const {
  parseSQL,
  diffSchemas,
  detectBreakingChanges,
  calculateRiskScore,
  generateMigration
} = require('../lib/engine');

const { inferDialect, buildPRComment } = require('../lib/github-app');

const APP_URL = 'https://schemalens.tech/github-app.html';

// In-memory rate limiter (best effort for serverless)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function parsePRUrl(input) {
  const match = input.trim().match(/(?:https?:\/\/)?github\.com\/([^\/\s]+)\/([^\/\s]+)\/pull\/(\d+)/i);
  if (!match) return null;
  return { owner: match[1], repo: match[2], pull: parseInt(match[3], 10) };
}

function encodePath(path) {
  return (path || '').split('/').map(encodeURIComponent).join('/');
}

async function githubApiRequest(path, token) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'SchemaLens-PR-Diff'
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`https://api.github.com${path}`, {
      method: 'GET',
      headers,
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (res.status === 404) return null;
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`GitHub API error ${res.status}: ${text}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchRawContent(owner, repo, ref, path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${encodeURIComponent(ref)}/${encodePath(path)}`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'SchemaLens-PR-Diff' },
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Raw fetch error ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

function jsonResponse(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return jsonResponse(res, 204, {});
  }
  if (req.method !== 'GET') {
    return jsonResponse(res, 405, { error: 'Method not allowed. Use GET.' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return jsonResponse(res, 429, { error: 'Rate limit exceeded. Try again in a minute.' });
  }

  const { owner, repo, pull, file } = req.query || {};
  const prUrl = req.query?.pr;

  let parsed = null;
  if (owner && repo && pull) {
    parsed = { owner, repo, pull: parseInt(pull, 10) };
  } else if (prUrl) {
    parsed = parsePRUrl(prUrl);
  }

  if (!parsed || !parsed.owner || !parsed.repo || !parsed.pull || isNaN(parsed.pull)) {
    return jsonResponse(res, 400, { error: 'Provide owner, repo, pull OR a GitHub PR URL (e.g. https://github.com/owner/repo/pull/123).' });
  }

  const token = process.env.GITHUB_TOKEN || '';
  const logPrefix = `${parsed.owner}/${parsed.repo}#${parsed.pull}`;

  try {
    const [prDetail, files] = await Promise.all([
      githubApiRequest(`/repos/${parsed.owner}/${parsed.repo}/pulls/${parsed.pull}`, token),
      githubApiRequest(`/repos/${parsed.owner}/${parsed.repo}/pulls/${parsed.pull}/files?per_page=100`, token)
    ]);

    if (!prDetail) {
      return jsonResponse(res, 404, { error: 'Pull request not found. Private repos are not supported by the public viewer.' });
    }
    if (!Array.isArray(files)) {
      return jsonResponse(res, 500, { error: 'Could not read pull request files.' });
    }

    const baseSha = prDetail.base?.sha;
    const headSha = prDetail.head?.sha;
    if (!baseSha || !headSha) {
      return jsonResponse(res, 500, { error: 'Could not determine base or head ref.' });
    }

    const sqlFiles = files
      .filter(f => typeof f.filename === 'string' && f.filename.endsWith('.sql'))
      .map(f => ({
        filename: f.filename,
        status: f.status,
        previous_filename: f.previous_filename,
        additions: f.additions || 0,
        deletions: f.deletions || 0
      }));

    if (sqlFiles.length === 0) {
      return jsonResponse(res, 200, {
        ok: true,
        owner: parsed.owner,
        repo: parsed.repo,
        pull: parsed.pull,
        baseSha,
        headSha,
        sqlFiles: [],
        message: 'No .sql files changed in this pull request.'
      });
    }

    // If no specific file requested and there are multiple, let the user pick.
    if (!file && sqlFiles.length > 1) {
      return jsonResponse(res, 200, {
        ok: true,
        owner: parsed.owner,
        repo: parsed.repo,
        pull: parsed.pull,
        baseSha,
        headSha,
        multi: true,
        sqlFiles
      });
    }

    const targetFile = file
      ? sqlFiles.find(f => f.filename === file)
      : sqlFiles[0];

    if (!targetFile) {
      return jsonResponse(res, 404, { error: `SQL file "${file}" not found in this PR.` });
    }

    let basePath = targetFile.filename;
    if (targetFile.status === 'renamed' && targetFile.previous_filename) {
      basePath = targetFile.previous_filename;
    }

    let oldSchema = '';
    let newSchema = '';

    if (targetFile.status !== 'added') {
      oldSchema = (await fetchRawContent(parsed.owner, parsed.repo, baseSha, basePath)) || '';
    }
    if (targetFile.status !== 'removed') {
      newSchema = (await fetchRawContent(parsed.owner, parsed.repo, headSha, targetFile.filename)) || '';
    }

    const dialect = inferDialect(newSchema || oldSchema, targetFile.filename);
    const oldParsed = parseSQL(oldSchema, dialect);
    const newParsed = parseSQL(newSchema, dialect);
    const diff = diffSchemas(oldParsed, newParsed);
    const breakingChanges = detectBreakingChanges(diff);
    const riskScore = calculateRiskScore(diff);
    const migration = generateMigration(diff, dialect);
    const markdown = buildPRComment({ diff, breakingChanges, riskScore, migration, dialect, appUrl: APP_URL });

    console.log(`GITHUB_PR_DIFF: ${logPrefix} file=${targetFile.filename} dialect=${dialect} risk=${riskScore.score} breaking=${breakingChanges.length}`);

    return jsonResponse(res, 200, {
      ok: true,
      owner: parsed.owner,
      repo: parsed.repo,
      pull: parsed.pull,
      baseSha,
      headSha,
      file: targetFile.filename,
      status: targetFile.status,
      dialect,
      summary: {
        tablesAdded: diff.tablesAdded?.length || 0,
        tablesRemoved: diff.tablesRemoved?.length || 0,
        tablesModified: diff.tablesModified?.length || 0,
        breakingChanges: breakingChanges.length,
        riskScore: riskScore.score,
        riskLabel: riskScore.label
      },
      breakingChanges: breakingChanges.slice(0, 50),
      migration,
      markdown,
      sqlFiles
    });
  } catch (err) {
    console.error(`GITHUB_PR_DIFF_ERROR: ${logPrefix} ${err.message}`);
    return jsonResponse(res, 500, { error: err.message || 'Unknown error' });
  }
};
