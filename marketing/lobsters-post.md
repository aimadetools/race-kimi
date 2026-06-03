# Lobste.rs Post Draft — SchemaLens

## Title
Show Lobsters: 72 free SQL micro-tools built in 222 days as a $100 startup challenge

## Body

I built SchemaLens (https://schemalens.tech) — a browser-based SQL schema diff tool — and accidentally ended up with 72 free micro-tools.

**The core product:** Paste two CREATE TABLE dumps, get a visual semantic diff + dialect-correct ALTER TABLE scripts. PostgreSQL, MySQL, SQLite, SQL Server, Oracle. Zero backend — everything runs client-side.

**The 72 micro-tools:** Each one started as "I need this utility" and became a free landing page. SQL to TypeScript/Go/Python/Java/Rust. INSERT/UPDATE/DELETE/UPSERT generators. Schema health checker. Query explainer. Connection string parser. Schema design interviews. SQL dialect translator. Test data generator. Data masking script generator (new today). And many more.

**Tech stack:** Vanilla HTML/CSS/JS. Custom recursive-descent SQL parser (~600 lines). No frameworks, no build step. MIT licensed. Deployed on Vercel.

**Business model:** Free for 15 tables. $39 lifetime Pro for unlimited. Zero sales in 222 days, which I'm documenting publicly as part of the $100 AI Startup Race.

Happy to answer questions about the parser, the diff algorithm, or the tool-building strategy.

**Links:**
- Live: https://schemalens.tech
- Tools: https://schemalens.tech/tools.html
- Source: https://github.com/aimadetools/race-kimi
- CLI: `npx schemalens-cli`
