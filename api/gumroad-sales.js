/**
 * SchemaLens Gumroad Sales Monitor
 * GET /api/gumroad-sales
 *
 * Fetches sales data from Gumroad API v2.
 * Requires GUMROAD_ACCESS_TOKEN environment variable.
 *
 * Response: JSON { success: boolean, sales: Array, summary: Object }
 *
 * Security:
 *   - Requires x-admin-password header matching ADMIN_PASSWORD
 *   - Rate limited to 10 requests/minute per IP
 *   - CORS enabled for schemalens.tech origin only
 */

const ADMIN_PASSWORD = 'schemalens-admin-2026';
const GUMROAD_ACCESS_TOKEN = process.env.GUMROAD_ACCESS_TOKEN || '';

// In-memory rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

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
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.connection?.remoteAddress || 'unknown';
}

async function fetchGumroadSales() {
  if (!GUMROAD_ACCESS_TOKEN) {
    throw new Error('GUMROAD_ACCESS_TOKEN is not configured. Set it in Vercel environment variables.');
  }

  const url = `https://api.gumroad.com/v2/sales?access_token=${encodeURIComponent(GUMROAD_ACCESS_TOKEN)}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const res = await fetch(url, {
    method: 'GET',
    signal: controller.signal,
    headers: { 'Accept': 'application/json' }
  });
  clearTimeout(timeout);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Gumroad ${res.status}: ${text.slice(0, 200)}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error('Gumroad API returned success: false');
  }
  return json.sales || [];
}

module.exports = async (req, res) => {
  // CORS
  const origin = req.headers.origin || '';
  const allowedOrigins = ['https://schemalens.tech', 'http://localhost:3000', 'http://localhost:8080'];
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://schemalens.tech');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Try again in a minute.' });
  }

  // Auth
  const password = req.headers['x-admin-password'] || '';
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const sales = await fetchGumroadSales();

    // Compute summary
    let totalRevenue = 0;
    let totalFees = 0;
    let refundCount = 0;
    let chargebackCount = 0;
    const productCounts = {};
    const monthlyRevenue = {};

    for (const s of sales) {
      const price = s.price || 0;
      const fee = (s.gumroad_fee || 0) + (s.paypal_fee || 0) + (s.stripe_fee || 0);
      totalRevenue += price;
      totalFees += fee;

      if (s.refunded) refundCount++;
      if (s.chargebacked) chargebackCount++;

      const productName = s.product_name || 'Unknown';
      productCounts[productName] = (productCounts[productName] || 0) + 1;

      const ts = s.created_at || s.timestamp;
      if (ts) {
        const d = new Date(ts);
        const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + price;
      }
    }

    const netRevenue = totalRevenue - totalFees;
    const sortedMonths = Object.keys(monthlyRevenue).sort();
    const currentMonth = sortedMonths.length ? sortedMonths[sortedMonths.length - 1] : null;
    const mrrEstimate = currentMonth ? monthlyRevenue[currentMonth] : 0;

    return res.status(200).json({
      success: true,
      sales,
      summary: {
        totalSales: sales.length,
        totalRevenueCents: totalRevenue,
        totalRevenueFormatted: `$${(totalRevenue / 100).toFixed(2)}`,
        totalFeesCents: totalFees,
        totalFeesFormatted: `$${(totalFees / 100).toFixed(2)}`,
        netRevenueCents: netRevenue,
        netRevenueFormatted: `$${(netRevenue / 100).toFixed(2)}`,
        refundCount,
        chargebackCount,
        mrrEstimateCents: mrrEstimate,
        mrrEstimateFormatted: `$${(mrrEstimate / 100).toFixed(2)}`,
        productCounts,
        monthlyRevenue,
        currentMonth,
        currency: sales[0]?.currency?.toUpperCase() || 'USD'
      }
    });
  } catch (err) {
    console.error('Gumroad sales error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
