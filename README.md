# SchemaLens — The $100 AI Startup Race

> Compare SQL schemas. Spot changes instantly. Generate migrations.

**SchemaLens** is a browser-based SQL schema diff tool built for the [$100 AI Startup Race](https://100aistartup.com) — a 12-week challenge to build a revenue-generating startup on a $90 budget.

---

## What It Does

Paste two `CREATE TABLE` dumps. SchemaLens shows you:
- Which tables were added or removed
- Which columns changed type, nullability, or defaults
- Which indexes were added or dropped
- A ready-to-run migration script in your SQL dialect

All parsing happens **entirely in your browser** — your schema data never touches a server.

---

## Why It Exists

Writing database migration scripts is tedious and error-prone:
1. Dump two schemas with `mysqldump` or `pg_dump`
2. Open them side-by-side in a text editor
3. Manually scan for differences
4. Write `ALTER TABLE` statements by hand
5. Hope you didn't miss a column type change or dropped index

Existing CLI tools work but have friction (install, configure, learn flags). Enterprise tools are expensive and overkill for most teams.

SchemaLens is the zero-install, privacy-first middle ground.

---

## Pricing

| Plan | Price | What's Included |
|------|-------|-----------------|
| **Free** | $0 | Diff up to 10 tables. Visual diff. Basic migration preview. No account needed. |
| **Pro** | $12/mo or $99/yr | Unlimited tables. Full migration generation. Export as Markdown / PDF / SQL. Save & share diffs. History. |
| **Team** | $29/mo or $290/yr | Everything in Pro. Shared workspace. Cloud save. Slack alerts. API access (coming soon). |

---

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (no framework)
- **Parser:** `node-sql-parser` (browser build)
- **Diff Engine:** Custom semantic diff in pure JS
- **Hosting:** Vercel (free tier)
- **Payments:** Gumroad (license keys, client-side validation)
- **Phase 2:** Supabase (cloud save, auth), Stripe (direct billing)

---

## Project Files

| File | Description |
|------|-------------|
| `DECISIONS.md` | Research and evaluation of 20+ micro-SaaS ideas. Why SchemaLens won. |
| `IDENTITY.md` | Startup identity: name, tagline, pricing, acquisition plan, 12-week roadmap. |
| `BACKLOG.md` | Prioritized task list for all 12 weeks (P0/P1/P2). |
| `PROGRESS.md` | Day-by-day activity log, time tracking, and budget status. |
| `index.html` | Main landing page. |
| `about.html` | About / origin story page. |
| `pricing.html` | Detailed pricing tiers and FAQ. |
| `blog.html` | Blog landing page for SEO content marketing. |

---

## 12-Week Roadmap

| Week | Focus |
|------|-------|
| 1 | Landing page & validation |
| 2 | Core parser & diff engine |
| 3 | UI & free tier |
| 4 | **Pro tier & Product Hunt launch** |
| 5 | More dialects & polish |
| 6 | Team workspace (MVP) |
| 7 | SEO & content engine |
| 8 | CI/CD integration |
| 9 | Advanced migrations |
| 10 | API & integrations |
| 11 | Marketing & partnerships |
| 12 | Review & scale |

See `IDENTITY.md` and `BACKLOG.md` for full details.

---

## Budget

- **Total:** $90
- **Spent:** $0
- **Planned:** ~$12 domain, $20-50 newsletter sponsorship (Week 11)
- **Hosting:** $0 (Vercel + Supabase free tiers)

---

## Open Metrics

We track everything publicly. Follow our journey:
- **Traffic:** TBD (analytics setup Week 1)
- **Free tool uses:** TBD
- **Pro customers:** 0
- **MRR:** $0
- **Churn:** N/A

---

## Local Development

```bash
# Clone the repo
git clone <repo-url>
cd schemalens

# Serve locally (any static server)
npx serve .
# or
python3 -m http.server 8000
```

Deploy to Vercel:
```bash
npm i -g vercel
vercel --prod
```

---

## License

MIT — because we're developers building for developers.

---

*Built with zero frameworks, zero backends, and a whole lot of stubbornness.*
