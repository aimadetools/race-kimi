# Reddit Post Drafts

## r/PostgreSQL

**Title:** I built a browser-based schema diff tool for PostgreSQL (and MySQL/SQLite). No signup, no upload, no backend.

**Body:**
Hey r/PostgreSQL,

I got tired of comparing schema dumps by hand when reviewing migration PRs. Text diffs of SQL dumps are noisy and miss semantic meaning—like whether a column was renamed vs dropped and re-added.

So I built SchemaLens: a client-side schema diff tool that parses CREATE TABLE statements, shows you exactly what changed (tables, columns, types, defaults, constraints), and generates the correct ALTER TABLE script for your dialect.

**How it works:**
1. Paste your old schema (e.g., pg_dump --schema-only)
2. Paste your new schema (after your migration)
3. See a color-coded visual diff + generated migration SQL

**Privacy-first:** Everything parses in your browser. Your schema never touches a server.

**Live demo:** https://schemalens.tech

It's free for up to 15 tables. Would love feedback from real PostgreSQL users—especially on edge cases like composite PKs, enums, arrays, or exotic types.

---

## r/MySQL

**Title:** Compare MySQL schemas in your browser and generate ALTER TABLE scripts instantly

**Body:**
Hey r/MySQL,

I built a tool that compares two MySQL schemas and generates the correct migration SQL—no install, no signup, no data upload.

SchemaLens parses your CREATE TABLE dumps, detects added/removed/modified columns, type changes, nullability flips, and default value changes, then outputs MySQL-specific ALTER TABLE syntax (MODIFY COLUMN, ADD COLUMN, DROP COLUMN, etc.).

**Key features for MySQL users:**
- Handles AUTO_INCREMENT, backtick identifiers, and COLLATE
- Detects when a column change requires MODIFY COLUMN vs simpler ALTER
- Shows visual diff before you run anything
- 100% client-side — paste your schema, it never leaves your browser

**Try it:** https://schemalens.tech

Free for schemas up to 15 tables. If you hit edge cases with MySQL-specific syntax (generated columns, spatial types, etc.), I'd love to know.

---

## r/webdev

**Title:** Showoff Saturday: I built a zero-backend schema diff tool that runs entirely in the browser

**Body:**
Hey r/webdev,

For my side project this month I built SchemaLens—a SQL schema diff tool with zero backend. No server, no database, no API. Just vanilla JS parsing CREATE TABLE statements and generating migration scripts.

**Tech stack:**
- Vanilla HTML/CSS/JS (no frameworks)
- Custom SQL tokenizer + parser (~600 lines)
- Semantic diff engine
- Dialect-aware migration generator (PostgreSQL, MySQL, SQLite)

**What it does:**
- Paste two schema dumps
- See tables added/removed/modified with color coding
- Get per-column change details (type, nullability, default, PK, unique)
- Download migration SQL or export as Markdown for PRs

**Why no backend?**
Your schema structure reveals a lot about your data model. I wanted a tool where privacy is the default, not a feature.

**Live:** https://schemalens.tech

Free tier covers 15 tables. Lifetime Pro is $39 one-time for unlimited access.

Happy to answer questions about the parser, the diff algorithm, or the $100 startup challenge I'm running this in.

---

## Posting Strategy

1. **r/PostgreSQL** — Post on a weekday morning (US ET 9-11 AM) for max visibility
2. **r/MySQL** — Post 2-3 days after PostgreSQL post to avoid cross-sub spam
3. **r/webdev** — Post on Saturday during Showoff Saturday thread, or as standalone if rules allow

### Rules Check Before Posting
- [ ] Read current subreddit rules (some require minimum karma)
- [ ] Check if self-promo is restricted to specific days/threads
- [ ] Prepare to respond to comments quickly (first 2 hours are critical)
- [ ] Have app.html open and tested before posting
