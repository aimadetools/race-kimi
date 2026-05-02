# Tweet Thread — 7 Schema Migration Mistakes That Cost Teams Thousands

Copy and paste these tweets one by one. Post as a thread (reply to previous tweet).

Best time to post: Tuesday–Thursday, 9–11am ET.

---

**Tweet 1/8**

I reviewed 200+ database migration PRs last year.

7 mistakes showed up again and again. Each one cost someone a 2 AM page, a production rollback, or a silent data corruption.

Here's the checklist I wish every team had ↓

---

**Tweet 2/8**

Mistake 1: Adding NOT NULL without a default on a table with existing rows.

```sql
-- This fails on production with 10M rows
ALTER TABLE events ADD COLUMN timezone VARCHAR(50) NOT NULL;
```

Safe version: add nullable → backfill → add constraint in three steps.

---

**Tweet 3/8**

Mistake 2: Dropping a column that a view or background job still references.

The migration passes CI. Production crashes 6 hours later when the analytics pipeline runs.

Always grep your entire codebase — including scripts, cron jobs, and reverse ETL — before approving a drop.

---

**Tweet 4/8**

Mistake 3: Narrowing a VARCHAR without checking existing data.

```sql
-- Silently truncates descriptions > 500 chars
ALTER TABLE products ALTER COLUMN description TYPE VARCHAR(500);
```

Migration succeeds. Data is corrupted. Customer support finds out 3 days later.

Run `SELECT MAX(LENGTH(col))` first.

---

**Tweet 5/8**

Mistake 4: Adding a foreign key without an index on the referencing column.

PostgreSQL locks both tables. Writes block. Timeouts cascade.

High-risk ops need a maintenance window or a non-blocking alternative.

---

**Tweet 6/8**

Mistake 5: No rollback script.

Most teams have a deploy playbook. Few have a migration rollback playbook.

If the migration fails halfway through, what's the recovery plan? "We'll figure it out" is not a plan.

---

**Tweet 7/8**

Mistake 6: Reviewing the migration script but not the resulting schema.

A text diff of `ALTER TABLE` statements misses the big picture.

A semantic diff of the old vs new schema shows every structural change — tables, columns, indexes, constraints — in one view.

---

**Tweet 8/8**

Mistake 7: Shipping without running a semantic diff.

The 5-minute pre-deploy ritual that prevents 2 AM pages:

1. Export current production schema
2. Export post-migration schema from your PR
3. Run a semantic diff
4. Review every change against this checklist
5. Approve only when every red flag is addressed

I built SchemaLens to make step 3 instant → https://schemalens.tech

Paste two schemas. Get a visual diff + migration script in 10 seconds.

---

## Posting Tips

- Pin a reply to Tweet 1 with the checklist image (screenshot the 7-point list)
- Tag @schemalens_tech
- Quote-tweet 24h later with "Which mistake has burned you?"
