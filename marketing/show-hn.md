# Show HN Post Draft — SchemaLens (Updated May 6, 2026)

## Primary Draft

**Title:** Show HN: SchemaLens – Compare SQL schemas in your browser, generate migrations

**Body:**
Hi HN,

I built SchemaLens because I was tired of reviewing database migrations by eyeballing two SQL dumps. Text diffs of schema files are noisy and miss semantic meaning—is that column renamed or dropped and re-added? Is the type change safe? Did someone drop an index that a query depends on?

SchemaLens is a browser-based SQL schema diff tool. Paste two CREATE TABLE dumps, get an instant visual semantic diff, and generate dialect-correct ALTER TABLE scripts.

**What it does:**
- Parses CREATE TABLE, CREATE INDEX, views, functions, and triggers for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle
- Detects added/removed/renamed tables and columns (Levenshtein heuristic for rename detection)
- Shows per-column changes: type, nullability, default, primary key, unique, constraints
- Generates migration SQL tailored to your dialect, including rollback scripts
- Risk score (0–100) with 14 advisor categories for breaking change detection
- Exports results as Markdown (great for PR descriptions), PDF, JSON, SQL, Prisma, or Drizzle
- Shareable diff URLs with dynamic OpenGraph cards

**Privacy:** Everything runs client-side. Your schema never touches a server. I can't see your data, and I don't want to. Verify it in DevTools → Network.

**Self-hosting:** It's all static files. Clone the repo, open app.html in a browser. The "backend" is air.

**CLI:** `npx schemalens-cli diff old.sql new.sql --dialect postgres`

**Live:** https://schemalens.tech

**Tech:** Vanilla JS. Custom recursive-descent tokenizer + parser (~600 lines). No frameworks, no build step, no dependencies. 34 automated tests. MIT licensed. Deployed on Vercel.

**Pricing:** Free for up to 15 tables. Lifetime Pro is $39 one-time for unlimited tables, full migration generation, all exports, and all future updates.

I'm building this as part of a 12-week $100 startup challenge, so I'm documenting everything in public. 147 days, 50+ micro-tools, 51+ SEO pages, a VS Code extension, a Chrome extension, and an open-source engine.

Happy to answer questions about the parser, the diff algorithm, the business model, or the build process.

---

## Follow-up Comment (to pin if post gains traction)

Thanks for the interest! A few answers to common questions:

**Why not use existing tools like migra/apgdiff/Liquibase?**
They're great, but they require installation, a database connection, or Python. SchemaLens is for the "I need to check this right now" moment—paste, compare, done. If you need managed migration lifecycles, Liquibase is the better fit. SchemaLens complements it for quick ad-hoc diffs.

**What about more complex objects?**
We parse CREATE TABLE, CREATE INDEX, views, functions, and triggers. The parser is modular and adding new statement types is straightforward.

**Is the Pro tier actually enforced?**
On the free tier, if your schema has more than 15 tables, we show the visual diff but gate the full migration SQL behind an upgrade banner. No paywall on the diff itself.

**Can I self-host?**
Yes. Clone the repo, open app.html. Or run `npx schemalens-cli` locally. The engine is also on npm as `schemalens-engine`.

**How does the parser handle dialect quirks?**
Each dialect has its own keyword set, type mapping, and quoting rules. The tokenizer is shared; the parser branches on dialect-specific syntax. It's not perfect—edge cases in Oracle PL/SQL and SQL Server T-SQL are the hairiest—but it handles 95%+ of real-world schemas.

---

## Launch Timing
- Best days: Tuesday, Wednesday, Thursday
- Best time: 7-9 AM US Pacific (10 AM-12 PM ET)
- Avoid: Weekends, Monday mornings, Friday afternoons

## Engagement Strategy
- Respond to every comment within first 3 hours
- Be transparent about limitations (builds trust on HN)
- Share specific technical details when asked
- If post hits front page, prepare for traffic spike (Vercel free tier handles this)
- Link to `show-hn.html` for visitors: https://schemalens.tech/show-hn.html

## Assets
- Landing page: `show-hn.html` (optimized for HN traffic)
- Gallery images: `marketing/gallery/01-visual-diff.png`, `02-migration-sql.png`, `03-export-markdown.png`
- GitHub repo: https://github.com/aimadetools/race-kimi
- CLI: `npx schemalens-cli`
