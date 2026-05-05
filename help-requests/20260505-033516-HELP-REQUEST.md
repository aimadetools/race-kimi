# Human Help Request — SchemaLens

## What
Execute 4 high-impact distribution tasks to get SchemaLens in front of more developers.

---

## Task 1: Publish VS Code Extension to Marketplace (P0 — blocking, ~15 min)

The extension is ready in `vscode-extension/`. All files are prepared.

**Steps:**
1. Install `vsce` globally: `npm install -g vsce`
2. Go to https://dev.azure.com/_usersSettings/tokens
3. Click "New Token"
   - Name: `vsce-publish`
   - Organization: `All accessible organizations`
   - Scopes: `Custom defined` → `Marketplace` → `Manage`
   - Expiration: 1 year
4. Copy the token
5. In terminal, run: `cd vscode-extension && vsce login schemalens`
6. Paste the PAT when prompted
7. Run: `vsce publish`
8. If you get "Publisher not found", create the publisher at https://marketplace.visualstudio.com/manage/publishers/schemalens

**Troubleshooting:**
- Icon is already included: `icon.png` (128×128)
- `repository.url` in `package.json` is already a valid HTTPS Git URL
- If publish fails due to version, bump `version` in `vscode-extension/package.json` from `0.1.0` to `0.1.1`

---

## Task 2: Submit SchemaLens to AlternativeTo.net (P0, ~10 min)

The site was down in previous attempts. Please try again.

**Steps:**
1. Go to https://alternativeto.net/software/add/
2. Fill in:
   - Name: SchemaLens
   - Website: https://schemalens.tech
   - Description: "Compare SQL schemas in your browser and generate migration scripts instantly. Zero setup — paste two CREATE TABLE dumps, get a visual diff and ALTER TABLE SQL for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle."
   - Category: Developer Tools
   - Platforms: Web, VS Code
   - Tags: database, schema-diff, migration, sql, postgres, mysql
3. Upload logo if possible (use `favicon.svg` in repo root)

---

## Task 3: Publish `schemalens-engine` to npm (P1, ~10 min)

The standalone diff engine is ready in `engine/` and is npm-ready.

**Steps:**
1. Make sure you are logged into npm: `npm whoami`
2. If not logged in: `npm login` (use your npm credentials)
3. Run: `cd engine && npm publish --access public`
4. Verify: `npm view schemalens-engine`

**Note:** This is a NEW package (separate from `schemalens-cli` which is already published). It contains the core diff engine as a reusable library.

---

## Task 4: Post Social Media Content (P1, ~20 min)

Copy-paste the following posts. Use the image from `og-image.png` if the platform supports it.

### Tweet Thread (X/Twitter)
Post as a thread (reply to yourself for each tweet):

**Tweet 1:**
I built a tool that compares SQL schemas in your browser and generates migration scripts instantly.

Paste two CREATE TABLE dumps → get a visual diff + ALTER TABLE SQL.

No CLI. No signup. No data leaves your machine.

https://schemalens.tech

**Tweet 2:**
Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

Free for up to 10 tables. Pro unlocks unlimited diffs, exports, and rollback generation.

Launch special: $19 for your first year (normally $99).

**Tweet 3:**
We also built 25 free micro-tools:

- Safe Migration Checker
- SQL INSERT Generator
- Schema Diff Examples
- SQL JOIN Visualizer
- Migration Recipes

All free, all in the browser.

https://schemalens.tech/tools.html

### LinkedIn Post
Paste as a single post:

---
Developers: how do you review database schema changes before deploying to production?

Most teams still dump schemas and eyeball the differences. It's tedious and error-prone.

I built SchemaLens to fix that.

Paste two SQL schemas → get an instant visual diff + generated migration script. It catches column type changes, missing indexes, breaking changes, and even generates rollback SQL.

Zero setup. 100% private (runs in your browser). Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

25 free tools included. Launch special: $19 for your first year.

https://schemalens.tech

#Database #SQL #PostgreSQL #MySQL #DeveloperTools #SchemaMigration
---

### Reddit r/SQL
Title: "I built a free browser-based SQL schema diff tool — would love feedback"

Body:
Hi r/SQL,

I built SchemaLens (https://schemalens.tech) because I was tired of manually comparing schema dumps when reviewing migration PRs.

It compares two CREATE TABLE dumps and shows a semantic diff (not line-by-line) — tables added/removed, columns changed, indexes modified, type changes, nullability changes, etc. Then it generates the migration SQL.

Fully client-side. No signup required. Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

Free tier: 10 tables per diff.
Pro: unlimited + exports + rollback generation.

Would love your honest feedback, especially on edge cases or dialect-specific behavior.

---

## Time Estimate
~55 minutes total

## Priority
Blocking / Important

## Budget
$0 (no additional spend required for these tasks)
