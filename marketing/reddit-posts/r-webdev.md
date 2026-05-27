# r/webdev Post

## Title (choose one)
1. `I built 60++ free SQL micro-tools — schema diff, query generators, migration checkers`
2. `Schema diff in the browser: paste two CREATE TABLE dumps, get ALTER TABLE scripts instantly`
3. `Showoff: My side project is a browser-based database migration tool with 60+++ free utilities`

## Body (Title 1 variant)

Hey r/webdev,

Over the past 6 months I've been building **SchemaLens** — a collection of 60+++ free SQL/developer tools that run entirely in the browser.

The flagship tool is a **schema diff engine**: paste two `CREATE TABLE` dumps, get a visual semantic diff (not a line-by-line text diff) showing exactly what changed — tables, columns, indexes, constraints — plus ready-to-run migration scripts in PostgreSQL, MySQL, SQLite, SQL Server, or Oracle.

**Some of the free tools people actually use:**
- SQL to TypeScript/Zod generator
- SQL to Prisma/Drizzle ORM converter
- SQL to Mermaid ERD diagram
- Migration Safety Checker (12 checks, safety score 0-100)
- SQL SELECT/UPDATE/DELETE/UPSERT generators
- Query Explainer (plain English breakdown of any SQL)
- Reserved Words Checker (450+ words, 5 dialects)
- Connection String Parser & Builder
- Schema Design Interview Practice (Twitter, Uber, URL Shortener challenges)
- Famous Database Schemas gallery (GitHub, Slack, Instagram ERDs)
- SchemaGuessr game — guess the app from its database schema

Everything is client-side. No signup. No data leaves your machine.

The diff tool is free for up to 15 tables. Unlimited is $39 lifetime.

There's also a GitHub Action that comments schema diffs on PRs, a VS Code extension, and an npm CLI.

Happy to answer questions or take feature requests.

🔗 [schemalens.tech](https://schemalens.tech)
📦 [GitHub](https://github.com/aimadetools/race-kimi)

---

## Follow-up Comment (if asked about monetization)

The $39 lifetime unlocks:
- Unlimited tables per comparison
- Full migration script generation (all dialects)
- Export as Markdown / SQL
- Diff history in localStorage
- Priority email support

Everything else — all 60+++ micro-tools, the GitHub Action free tier, the VS Code extension — is completely free. I wanted the free tier to be genuinely useful even if you never pay.

---

## Flair
`Showoff Saturday` (only post on Saturday with this flair)

## Note
r/webdev has strict self-promo rules. Only post on Saturday with `Showoff Saturday` flair, or frame as a question ("Would you use a browser-based schema diff tool?").
