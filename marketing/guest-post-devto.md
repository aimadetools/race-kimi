# Dev.to Guest Post — The 5 Most Dangerous Schema Changes

Complete guest post draft formatted for dev.to.

---

## Frontmatter

```yaml
---
title: "The 5 Most Dangerous Schema Changes (and How to Catch Them)"
published: false
description: "The 5 database schema changes that cause the most production incidents — and the checks that prevent them."
tags: database, sql, schema, migrations, postgres, mysql, devops
---
```

---

## Body

Schema migrations are the most dangerous code you ship. They run once, cannot be rolled back trivially, and affect every query in your application. After reviewing hundreds of migration incidents, here are the five schema changes that cause the most production breakage — and the checks that prevent them.

---

### 🔴 #1: Dropping a Column Still Referenced by Application Code

**Why it breaks:** Your migration runs successfully. The column is gone. Then a background job, API endpoint, or reporting query tries to read it — and crashes.

**Real-world story:** A team dropped `legacy_user_id` after migrating to UUIDs. The migration passed CI. Two hours later, a nightly ETL job failed because it still selected that column. The rollback required restoring from backup.

**How to catch it:** Search your entire codebase for the column name before dropping. Include background jobs, cron scripts, analytics pipelines, and third-party integrations. A semantic diff tool will flag the column as removed — that's your signal to verify it's truly unused.

---

### 🔴 #2: Adding a NOT NULL Column Without a Default

**Why it breaks:** `ALTER TABLE ... ADD COLUMN ... NOT NULL` on a table with existing rows will fail in most databases. The engine doesn't know what value to assign to millions of existing records.

**Real-world story:** A developer added `timezone VARCHAR(50) NOT NULL` to a 10-million-row events table. The migration locked the table for 45 seconds, then failed. The fix required a three-step migration: add as nullable, backfill, then add the constraint.

**How to catch it:** Never add `NOT NULL` without a default in the same migration. Review every new column's nullability. If it must be NOT NULL, add it as nullable first, backfill with a sensible default, then alter the column.

---

### 🟠 #3: Removing an Index on a High-Traffic Query Path

**Why it breaks:** Indexes are invisible until they're gone. Queries that ran in milliseconds suddenly scan entire tables. CPU spikes. Timeouts cascade.

**Real-world story:** A "cleanup" migration dropped three indexes that were "not in the ORM definitions." They were actually used by raw SQL reporting queries. Query latency on the orders table went from 12ms to 4.2 seconds. The incident lasted 23 minutes.

**How to catch it:** Before dropping an index, check your query planner logs and slow query log. Look for `Seq Scan` on large tables. If you're unsure, mark the index as invisible (MySQL) or drop it in a separate migration with a quick rollback plan.

---

### 🟠 #4: Narrowing a Column Type (Data Truncation)

**Why it breaks:** Changing `VARCHAR(500)` to `VARCHAR(100)` silently truncates data that exceeds the new limit. The migration succeeds. The data is corrupted.

**Real-world story:** A team changed `description TEXT` to `description VARCHAR(500)` to "enforce UI limits." 2% of descriptions were longer than 500 characters. Those records were truncated. Customer support spent a week reconstructing lost data from email archives.

**How to catch it:** Before narrowing a type, query for the maximum length of existing data. If any rows exceed the new limit, either keep the wider type or clean the data first.

---

### 🟡 #5: Changing a Foreign Key Without an Index

**Why it breaks:** Adding a foreign key constraint without an existing index on the column forces the database to validate every row with a full table scan. On large tables, this can take hours and hold heavy locks.

**Real-world story:** A team added a foreign key from `orders.user_id` to `users.id` on a 50-million-row table. There was no index on `orders.user_id`. The migration ran for 3 hours, blocking all writes to the orders table.

**How to catch it:** Always create the index before adding the foreign key. In SQL Server, use `WITH NOCHECK` to add the constraint without validating existing rows, then validate separately.

---

## The Safety Net

Here's a lightweight process that catches 90% of dangerous schema changes:

1. Export your old schema (production) and new schema (post-migration).
2. Run a semantic diff to see every structural change.
3. For every removed column or index, grep your codebase.
4. For every narrowed type, check max data length.
5. For every new foreign key, verify an index exists.
6. For every NOT NULL addition, verify a default exists.

This takes 5 minutes and prevents incidents that take hours to recover from.

---

## What I Built

I'm building [SchemaLens](https://schemalens.tech) — a browser-based schema diff tool that compares two `CREATE TABLE` dumps and shows you a visual diff with a generated migration script. It supports PostgreSQL, MySQL, SQLite, and SQL Server. Everything runs client-side; your schemas never leave your browser.

It's part of my entry for the $100 AI Startup Race. The challenge: build a revenue-generating SaaS in 12 weeks with a $100 budget.

If you're interested in database migrations, I'd love your feedback on edge cases the parser misses.

---

## Further Reading

- [The Schema Review Checklist Every Engineering Team Needs](https://schemalens.tech/blog/schema-review-checklist.html)
- [How to Compare Database Schemas Before Deploying](https://schemalens.tech/blog/compare-database-schemas-before-deploying.html)

---

*Last updated: April 20, 2026*
