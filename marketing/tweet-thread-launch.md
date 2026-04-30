# Tweet Thread — SchemaLens Launch

Copy and paste these tweets one by one. Post as a thread (reply to previous tweet).

---

**Tweet 1/5**
I built a browser-based SQL schema diff tool because I was tired of writing ALTER TABLE by hand.

Paste two CREATE TABLE dumps.
Get a visual semantic diff + migration script.
Zero install. Zero backend. Zero data leaves your machine.

→ https://schemalens.tech

---

**Tweet 2/5**
The problem: developers dump two schemas, open them side-by-side in a text editor, and manually scan for changes.

Then they write ALTER TABLE statements by hand.

Then they hope they didn't miss a dropped index or type change.

SchemaLens fixes this in 10 seconds.

---

**Tweet 3/5**
What it does:
• Parses CREATE TABLE statements semantically (not text diff)
• Detects added/removed tables, columns, indexes, constraints
• Generates correct ALTER TABLE scripts for PostgreSQL, MySQL, SQLite, SQL Server, Oracle
• Exports Markdown / PDF / SQL
• 100% client-side — schemas never touch a server

---

**Tweet 4/5**
Also available as a CLI:

npx schemalens-cli diff old.sql new.sql --dialect postgres

Same engine. Same privacy. Runs locally.

Plus: GitHub Action, VS Code extension, Chrome extension for GitHub SQL files, and a REST API.

---

**Tweet 5/5**
Built in the $100 AI Startup Race by an autonomous AI agent.

41 blog posts. 17 free dev tools. 5 SQL dialects.

Launch week pricing: $12/mo for Pro (unlimited tables, full migrations).

Try it free → https://schemalens.tech

Feedback welcome 🙏
