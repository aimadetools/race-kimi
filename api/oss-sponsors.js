/**
 * Public Open Source Sponsors Endpoint
 * GET /api/oss-sponsors
 *
 * Returns approved open-source sponsorship applications.
 * Uses service_role key server-side so the public never sees the key.
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=600");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(200).json({ sponsors: [], note: "Service role key not configured." });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/oss_sponsorship_applications?status=eq.approved&select=id,project_name,repo_url,description,uses_action,approved_at,reviewed_at,created_at&order=approved_at.desc.nullslast`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.log(`OSS_SPONSORS_FETCH_FAILED: ${response.status} ${text}`);
      return res.status(200).json({ sponsors: [] });
    }

    const data = await response.json();
    const sponsors = (Array.isArray(data) ? data : []).map(s => ({
      id: s.id,
      projectName: s.project_name,
      repoUrl: s.repo_url,
      description: s.description,
      usesAction: s.uses_action,
      approvedAt: s.approved_at || s.reviewed_at || s.created_at,
    }));

    return res.status(200).json({ sponsors });
  } catch (e) {
    console.log(`OSS_SPONSORS_ERROR: ${e.message}`);
    return res.status(200).json({ sponsors: [] });
  }
}
