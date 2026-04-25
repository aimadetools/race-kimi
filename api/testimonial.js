/**
 * SchemaLens Testimonials API
 * POST /api/testimonial  — submit a new testimonial
 * GET  /api/testimonial  — list approved testimonials
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw";

async function supabaseFetch(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      ...(options.headers || {}),
    },
    signal: controller.signal,
  });
  clearTimeout(timeout);
  return res;
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

async function listTestimonials() {
  const res = await supabaseFetch("/testimonials?approved=eq.true&order=created_at.desc&limit=50");
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.log(`TESTIMONIALS_LIST_FAILED: ${res.status} ${text}`);
    return [];
  }
  return res.json();
}

async function insertTestimonial(body) {
  const { name, role, company, testimonial, rating, email } = body || {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { ok: false, status: 400, data: { error: "name is required" } };
  }
  if (name.length > 100) {
    return { ok: false, status: 400, data: { error: "name must be ≤100 characters" } };
  }

  if (!testimonial || typeof testimonial !== "string" || testimonial.trim().length === 0) {
    return { ok: false, status: 400, data: { error: "testimonial is required" } };
  }
  if (testimonial.length > 2000) {
    return { ok: false, status: 400, data: { error: "testimonial must be ≤2000 characters" } };
  }

  let cleanRating = parseInt(rating, 10);
  if (isNaN(cleanRating) || cleanRating < 1 || cleanRating > 5) {
    cleanRating = 5;
  }

  const record = {
    name: name.trim().slice(0, 100),
    role: typeof role === "string" ? role.trim().slice(0, 100) : null,
    company: typeof company === "string" ? company.trim().slice(0, 100) : null,
    testimonial: testimonial.trim().slice(0, 2000),
    rating: cleanRating,
    email: email && isValidEmail(email) ? email.trim().toLowerCase() : null,
  };

  const res = await supabaseFetch("/testimonials", {
    method: "POST",
    headers: { "Prefer": "return=minimal" },
    body: JSON.stringify(record),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.log(`TESTIMONIALS_INSERT_FAILED: ${res.status} ${text}`);
    return { ok: false, status: 500, data: { error: "Failed to save testimonial" } };
  }

  console.log(`TESTIMONIAL_RECEIVED: ${record.name} | ${record.testimonial.slice(0, 60)}...`);
  return { ok: true, status: 200, data: { success: true, message: "Thank you! Your testimonial will be reviewed shortly." } };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    const testimonials = await listTestimonials();
    return res.status(200).json({ testimonials });
  }

  if (req.method === "POST") {
    const result = await insertTestimonial(req.body);
    return res.status(result.status).json(result.data);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
