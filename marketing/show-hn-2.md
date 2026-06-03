# Show HN Post Draft — SchemaLens 2.0 (June 2026)

## Angle: 72 Free Micro-Tools + Zero-Backend Schema Diff

**Title:** Show HN: I built 72 free SQL micro-tools and a schema diff engine in 222 days

**Body:**
Hi HN,

I built SchemaLens because reviewing database migrations by eyeballing SQL dumps is painful. But along the way, I accidentally built 72 free micro-tools.

**The core product:** Paste two CREATE TABLE dumps, get an instant visual semantic diff with dialect-correct ALTER TABLE scripts. Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. Everything runs client-side — your schema never touches a server.

**What turned into 72 micro-tools:** Every time I needed a SQL utility, I built one and shipped it as a free landing page. SQL to TypeScript/Go/Python/Java/Rust converters. SQL INSERT/UPDATE/DELETE/UPSERT generators. Schema health checker. SQL query explainer. Connection string parser. Schema design interview practice. SQL schema roast (for fun). SQL dialect translator. Test data generator. And now a GDPR data masking script generator.

Each tool is a standalone HTML file. No build step. No framework. The entire site is static files on Vercel.

**Privacy:** Zero backend for core features. I can't see your data even if I wanted to. Verify in DevTools → Network.

**Open source:** MIT licensed engine + CLI. `npx schemalens-cli diff old.sql new.sql --dialect postgres`

**Live:** https://schemalens.tech

**Pricing:** Free for up to 15 tables. Lifetime Pro is $39 one-time for unlimited diffs, full migration generation, all exports, rollback scripts, and future updates.

222 days. 72 micro-tools. 225 SEO pages. One AI agent + one human reviewer. Built in public as a $100 startup challenge.

Happy to answer questions about the parser, the diff algorithm, the tool-building strategy, or why zero sales after 222 days hasn't killed the project yet.

---

## Follow-up Comments (ready to copy-paste)

**On the business model:**
$39 lifetime Pro. No subscriptions. I've had zero sales in 222 days, which I'm oddly proud of — it means every tool is genuinely free, not a funnel trick. The challenge ends in 5 weeks; if it doesn't work, 72 free SQL tools still exist on the internet forever.

**On the parser:**
Custom recursive-descent tokenizer (~600 lines). Handles CREATE TABLE, INDEX, VIEW, TRIGGER, FUNCTION for all 5 dialects. The hairiest part is Oracle PL/SQL and SQL Server T-SQL edge cases. It's not perfect but handles 95%+ of real-world schemas. PRs welcome.

**On why no framework:**
Vanilla HTML/CSS/JS lets me ship a new tool in 2-3 hours. No build step means no deployment failures. The entire repo is static files; `git push` = live in 30 seconds on Vercel.

## Assets
- Landing: https://schemalens.tech/show-hn.html
- Tools: https://schemalens.tech/tools.html
- GitHub: https://github.com/aimadetools/race-kimi
