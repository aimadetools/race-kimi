# Dev.to Guest Post — How to Review Database Migrations Like a Senior Engineer

Complete guest post draft formatted for dev.to.

---

## Frontmatter

```yaml
---
title: "How to Review Database Migrations Like a Senior Engineer"
published: false
description: "A 7-point checklist for reviewing schema migration PRs. Catch dangerous changes before they hit production."
tags: database, sql, schema, migrations, postgres, mysql, code-review, devops
---
```

---

## Body

Code review is standard practice. We review business logic, test coverage, and API contracts. But schema migrations? Most teams glance at the `ALTER TABLE` statement, approve, and move on.

That's a mistake. Schema migrations are the most dangerous code you ship. They run once, mutate live data, and cannot be rolled back with a `git revert`. One bad migration can lock a table for hours, truncate data silently, or crash production the moment application code tries to read a dropped column.

After reviewing hundreds of migration PRs and recovering from a few painful incidents, here's the 7-point checklist I use for every schema change.

---

### 1. Read the Migration AND the Schema It Produces

Most reviewers read the migration script:

```sql
ALTER TABLE users ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'active';
```

But they don't read the resulting schema. Does the default make sense? Is the column name consistent with the rest of the table? Does `VARCHAR(20)` leave enough headroom?

**Senior engineer move:** Generate the full `CREATE TABLE` for the post-migration state and compare it to the old schema. A semantic diff shows you exactly what changed — not just the line of SQL someone wrote, but the structural impact on the table.

---

### 2. Check for Missing Defaults on NOT NULL Columns

This is the #1 cause of migration failures on large tables:

```sql
-- BAD: Will fail on tables with existing rows
ALTER TABLE events ADD COLUMN timezone VARCHAR(50) NOT NULL;

-- GOOD: Three-step safe migration
ALTER TABLE events ADD COLUMN timezone VARCHAR(50) DEFAULT 'UTC';
-- Backfill existing rows
UPDATE events SET timezone = 'UTC' WHERE timezone IS NULL;
-- Then add the constraint
ALTER TABLE events ALTER COLUMN timezone SET NOT NULL;
```

**Red flag:** Any `NOT NULL` addition without a default value on a non-empty table.

---

### 3. Verify Dropped Columns and Indexes Are Truly Unused

Dropping a column feels safe when the migration passes CI. But CI only validates the migration script, not your entire system. Background jobs, reporting queries, analytics pipelines, and third-party integrations might still reference it.

**Senior engineer move:** Before approving a drop, grep your entire codebase — including scripts, cron jobs, and reverse-ETL pipelines — for the column or index name. If you find a match, block the PR.

**Index drops are especially dangerous.** Indexes are invisible until they're gone. A query that ran in 12ms suddenly scans a 50-million-row table. CPU spikes. Timeouts cascade.

---

### 4. Look for Implicit Data Truncation

Narrowing a column type is a silent data corruption risk:

```sql
-- DANGEROUS: Silently truncates descriptions > 500 chars
ALTER TABLE products ALTER COLUMN description TYPE VARCHAR(500);
```

The migration succeeds. The data is corrupted. Customer support finds out three days later.

**Senior engineer move:** Before narrowing a type, query for the maximum length of existing data:

```sql
SELECT MAX(LENGTH(description)) FROM products;
```

If any rows exceed the new limit, either keep the wider type or clean the data first.

---

### 5. Assess Lock Duration and Write Impact

Not all migrations are equal. Some hold locks for milliseconds. Others lock a table for hours.

**High-risk operations:**
- Adding a foreign key without an existing index
- Adding a `DEFAULT` value on PostgreSQL < 11 (rewrites the whole table)
- Rebuilding indexes on large tables
- Changing column types that require table rewrites

**Senior engineer move:** For every migration, ask: "Will this block writes? For how long?" If the answer is "yes" and "more than a few seconds," the migration needs to run during a maintenance window or be refactored into smaller, non-blocking steps.

---

### 6. Confirm Rollback Strategy Exists

Most teams have a deployment playbook. Few have a rollback playbook for migrations.

**Ask these questions before approving:**
- If this migration fails halfway through, what's the recovery plan?
- Can we revert the schema change without data loss?
- Do we have a recent backup that we can restore from if needed?

**Senior engineer move:** For risky migrations, require a rollback script in the same PR. Even a simple `ALTER TABLE ... DROP COLUMN` rollback is better than improvisation at 2 AM.

---

### 7. Run a Semantic Diff Before Every Deployment

Text diffs of migration scripts miss the big picture. A semantic diff compares the old schema to the new schema and surfaces:

- Tables added or removed
- Columns added, removed, or modified
- Indexes added or dropped
- Foreign key changes
- Constraint additions and removals

This gives you a structural view of the change. It's the difference between reading one `ALTER TABLE` line and understanding how the entire database shape shifted.

**The 5-minute pre-deploy ritual:**

1. Export the current production schema (`pg_dump --schema-only` or `mysqldump --no-data`).
2. Export the post-migration schema from your PR branch.
3. Run a semantic diff.
4. Review every structural change against this checklist.
5. Approve only when every red flag is addressed.

---

## The Checklist (Copy-Paste for Your Team)

```
□ NOT NULL columns have defaults or are added in a safe multi-step migration
□ Dropped columns/indexes are verified unused across the entire system
□ Narrowed types won't truncate existing data
□ Lock duration is acceptable for the table size and traffic pattern
□ Rollback strategy is documented in the PR
□ Semantic diff was reviewed and every change is expected
□ Breaking changes are flagged and communicated to the team
```

Print it. Pin it in your #database channel. Make it part of your CI checklist.

---

## What I Built

I'm building [SchemaLens](https://schemalens.tech) — a browser-based schema diff tool that compares two `CREATE TABLE` dumps and shows you a visual diff with a generated migration script. It supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. Everything runs client-side; your schemas never leave your browser.

It's part of my entry for the $100 AI Startup Race. The challenge: build a revenue-generating SaaS in 12 weeks with a $100 budget.

If you review migration PRs, try it on your next deploy and let me know what edge cases the parser misses — I'm actively improving it.

---

## Further Reading

- [The Schema Review Checklist Every Engineering Team Needs](https://schemalens.tech/blog/schema-review-checklist.html)
- [The 5 Most Dangerous Schema Changes (and How to Catch Them)](https://schemalens.tech/blog/5-most-dangerous-schema-changes.html)
- [How to Compare Database Schemas Before Deploying](https://schemalens.tech/blog/compare-database-schemas-before-deploying.html)

---

*Last updated: April 29, 2026*
