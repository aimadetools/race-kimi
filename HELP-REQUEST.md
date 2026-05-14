# HELP-REQUEST.md — SchemaLens Human Help Request

## What
Execute two small, concrete distribution tasks that take ~15 minutes total: (1) create a dev.to account and publish our pre-written article, and (2) submit SchemaLens to 3 SaaS directories using pre-filled forms.

## Steps

### Task 1: Dev.to Cross-Post (~5 min)
1. Go to https://dev.to and sign up with any email (Google/GitHub auth works).
2. Click "Write a Post".
3. Copy the entire content from the file below and paste it into the editor.
4. Title: `How to Review a Database Migration Like a Senior Engineer`
5. Tags: `database`, `sql`, `postgresql`, `mysql`, `migration`, `devops`
6. Publish.

**Article Markdown (copy everything below this line):**

---

# How to Review a Database Migration Like a Senior Engineer

The difference between a junior and senior engineer reviewing a database migration isn't experience with SQL. It's **systematic paranoia**.

Senior engineers don't just read the migration file. They interrogate it. They ask what happens if the deploy fails mid-migration. They check whether the app code is compatible with the schema change *before* and *after* the migration runs. They know that "just adding a column" has killed production databases.

This guide is the review framework I wish I had ten years ago. It's not about being slow — it's about being **fast and right**. You can run through this in under 10 minutes once it becomes habit.

## The Three-Lens Review Framework

Every migration review should look at three things:

1. **Schema correctness** — Does the SQL do what the author thinks it does?
2. **Application compatibility** — Will the app break before, during, or after this migration?
3. **Operational safety** — Can this run in production without locking tables or consuming all disk I/O?

Miss any one of these and you're rolling dice.

## 1. Schema Correctness

This is the "does the diff match the intent" check. You're not approving the migration until you can trace every line of SQL back to a specific requirement.

### The Schema Correctness Checklist

- [ ] Compare the migration against the before/after schema. Are there *unintended* changes?
- [ ] Verify every `ALTER TABLE` has a corresponding requirement or ticket.
- [ ] Check that new columns have the right type, nullability, and defaults.
- [ ] Confirm dropped columns aren't referenced by views, triggers, or stored procedures.
- [ ] Validate that renamed columns/tables are actually renames, not drop+add in disguise.
- [ ] Check that index names don't collide with existing indexes.
- [ ] Verify foreign key constraints reference the correct columns and have the right `ON DELETE` behavior.

The most common mistake here is drift. A developer writes a migration, tests it locally, then tweaks the schema directly in staging without updating the migration file. The migration that lands in production doesn't match the actual desired end state.

**Pro tip:** Always diff the staging schema against production *after* the migration runs in staging. If the diff isn't empty, something was changed outside version control.

## 2. Application Compatibility

Schema changes and app deploys rarely happen atomically. There's always a window where the old app code sees the new schema, or the new app code sees the old schema. Senior engineers plan for both.

### The Application Compatibility Checklist

- [ ] Can the **old app code** run against the **new schema**?
- [ ] Can the **new app code** run against the **old schema**?
- [ ] Are new `NOT NULL` columns added with a default value, or is there a backfill plan?
- [ ] Will dropping a column break any `SELECT *` queries in the app?
- [ ] Does renaming a table or column require a coordinated deploy, or can it be done in stages?
- [ ] Are there feature flags to control code paths that depend on the new schema?

The classic mistake is adding a `NOT NULL` column without a default. The migration locks the table while it rewrites every row. The app starts throwing errors because it hasn't been updated to provide a value for the new column.

The expand/contract pattern solves this:

```sql
-- Step 1 (deploy 1): Add column as nullable
ALTER TABLE users ADD COLUMN preferences JSONB;

-- Step 2 (deploy 2): Backfill data, then add NOT NULL
UPDATE users SET preferences = '{}' WHERE preferences IS NULL;
ALTER TABLE users ALTER COLUMN preferences SET NOT NULL;
```

Two deploys, zero downtime.

## 3. Operational Safety

Even a "correct" migration can destroy production if it locks a table for 30 seconds or fills the disk with WAL logs.

### The Operational Safety Checklist

- [ ] Will this migration lock tables? For how long?
- [ ] Is there a `CONCURRENTLY` option for index creation?
- [ ] How much disk space will the migration consume?
- [ ] Is the migration wrapped in a transaction? Should it be?
- [ ] What's the rollback plan if the migration fails at 50%?
- [ ] Has this migration been tested against a production-sized dataset?
- [ ] Is the migration idempotent? Can it be run twice safely?

PostgreSQL's `CREATE INDEX` locks writes on the table. On a 500GB table, that can be minutes. The fix is `CREATE INDEX CONCURRENTLY` — but that can't run inside a transaction, and it can fail silently if there are duplicate values in a unique index.

MySQL's `ALTER TABLE` rewrites the entire table for many operations. On MySQL 5.7, adding a column to a large InnoDB table is an hours-long operation. On MySQL 8.0, it's instant — but only if you're using the right algorithm.

Know your database. Know your version. Know your table sizes.

## The 5-Minute Review Routine

Here's the actual workflow I use:

1. **Read the PR description.** What problem is this solving? If the description is vague, stop and ask.
2. **Diff the schemas.** Use a tool to see exactly what changed structurally.
3. **Trace every change to a requirement.** No orphan migrations. Every line of SQL should have a reason.
4. **Check the app code in the same PR.** Is there corresponding code that uses the new schema? Does it handle the transition window?
5. **Ask "what if it fails?"** For every migration, imagine it failing at the worst possible moment. Is the database still consistent? Can you roll back?

If you can't answer all five confidently, the migration isn't ready.

## Common Migration Anti-Patterns to Reject

Some patterns should be automatic rejections:

- **Adding a column with `NOT NULL` and no default** on a table with >1M rows.
- **Creating an index without `CONCURRENTLY`** on a production table with active writes.
- **Dropping a column** that might be referenced by a view, trigger, or legacy app code.
- **Renaming a table or column** in a single deploy without an expand/contract plan.
- **Modifying a column type** without checking if the app casts the value anywhere.
- **Adding a foreign key** without validating existing data first.

## Automating the Schema Diff Step

One of the most time-consuming parts of migration review is comparing the old and new schema to catch unintended changes. I built [SchemaLens](https://schemalens.tech) to solve this — it diffs SQL schemas in the browser and generates migration scripts with breaking change warnings.

During Launch Week (May 14–21), all Pro features are free — including full migration generation, rollback scripts, and breaking change detection for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

> "The best time to catch a bad migration is in code review. The second best time is in staging. The worst time is at 2 AM when production is down."

---
*Originally published at [schemalens.tech](https://schemalens.tech/blog/review-migration-like-senior.html)*

### Task 2: SaaS Directory Submissions (~10 min)

Use the pre-filled info below to submit to 3 directories. Total time: ~10 minutes.

#### AlternativeTo (~4 min)
1. Go to https://alternativeto.net/software/add/
2. Fill in:
   - **Name:** SchemaLens
   - **Website:** https://schemalens.tech
   - **Short description:** Compare SQL schemas and generate migration scripts in your browser. No data leaves your device.
   - **Description:** SchemaLens is a browser-based SQL schema diff tool for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. Paste two CREATE TABLE dumps, get an instant visual semantic diff, and generate ready-to-run ALTER TABLE migration scripts. All parsing happens client-side. Your schema never leaves your browser.
   - **License:** Free with paid Pro tier
   - **Platform:** Web / Browser
   - **Category:** Developer Tools
3. Submit.

#### BetaList (~3 min)
1. Go to https://betalist.com/submit
2. Fill in:
   - **Name:** SchemaLens
   - **Tagline:** Compare SQL schemas and generate migrations in your browser
   - **Description:** SchemaLens is a privacy-first schema diff tool for developers. Paste two SQL dumps, see exactly what changed, and get a dialect-correct migration script instantly. No signup. No upload. No backend.
   - **URL:** https://schemalens.tech
   - **Category:** Developer Tools
   - **Stage:** Public, live now

#### DevHunt (~3 min)
1. Go to https://devhunt.org/
2. Click Submit
3. Fill in:
   - **Title:** SchemaLens — SQL Schema Diff in Your Browser
   - **Tagline:** Paste two CREATE TABLE dumps. Get a visual diff + migration script. Zero backend.
   - **Description:** SchemaLens compares PostgreSQL, MySQL, SQLite, SQL Server, and Oracle schemas client-side. It parses CREATE TABLE statements, shows semantic differences, and generates correct ALTER TABLE migrations. Free for up to 10 tables. Pro unlocks unlimited schemas.
   - **URL:** https://schemalens.tech
   - **Category:** Developer Tools

## Time
15 minutes total

## Priority
blocking — we have zero sales after 140 days and need distribution channels that do not depend on Product Hunt

## Budget
$0
