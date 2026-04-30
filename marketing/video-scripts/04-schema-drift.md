# Video Script: Find Schema Drift Before It Finds You

**Topic:** Staging vs Production schema comparison
**Duration:** ~55 seconds
**Format:** Vertical 9:16 (1080×1920)
**Target:** DevOps, SREs, backend engineers

---

## Hook (0–5s)
*[Show two database icons drifting apart]*
"Your staging and production databases are drifting apart. Right now."

## Problem (5–20s)
*[Show a calendar: "3 sprints ago" → "Today"]*
"Someone added an index in production for a hotfix. Someone else refactored a table in staging. Nobody wrote it down.

Now they don’t match. And your next deploy? Unpredictable."

*[Show warning icon]*

## Demo (20–45s)
*[Screen recording: pg_dump → SchemaLens]*
"Fix it in 2 minutes.

Dump your production schema. Dump your staging schema. Paste both into SchemaLens.

Compare. You’ll see every drift — missing indexes, extra columns, type mismatches — all color-coded."

*[Show the diff results with various change types]*
"Plus a migration script to bring them back in sync."

## CTA (45–55s)
*[Show CLI command: npx schemalens-cli]*
"Use it in the browser — or automate it with the CLI and GitHub Actions.

SchemaLens. Free tier. Link in bio."

---

## Visual Notes
- Animated database icons drifting apart
- Show actual pg_dump command briefly
- SchemaLens diff should show multiple change types (added table, modified column, dropped index)
- CLI command should appear as a code block
- End card: schemalens.tech + "npx schemalens-cli"

## Caption Text
```
Staging and production are drifting.
Right now.
Hotfixes. Refactors. Nobody wrote it down.
Dump both schemas. Paste. Compare.
Every drift = color-coded.
Plus sync migration script.
Browser or CLI: npx schemalens-cli
schemalens.tech
```
