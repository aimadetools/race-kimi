# Tweet Thread — How to Review a Database Migration PR Like a Senior Engineer

Copy and paste these tweets one by one. Post as a thread (reply to previous tweet).

Best time to post: Tuesday–Thursday, 9–11am ET.

---

**Tweet 1/7**

Code review is standard practice.

We review business logic, test coverage, and API contracts.

But schema migrations? Most teams glance at the ALTER TABLE statement, approve, and move on.

That's a mistake. Here's how senior engineers do it ↓

---

**Tweet 2/7**

Step 1: Read the migration AND the schema it produces.

Most reviewers read:
```sql
ALTER TABLE users ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'active';
```

But they don't read the resulting CREATE TABLE. Does the default make sense? Is the column name consistent? Does VARCHAR(20) leave enough headroom?

---

**Tweet 3/7**

Step 2: Check for missing defaults on NOT NULL additions.

This is the #1 cause of migration failures on large tables.

Safe pattern:
1. Add column with DEFAULT
2. Backfill existing rows
3. Add NOT NULL constraint

Any NOT NULL without a default on a non-empty table is a red flag.

---

**Tweet 4/7**

Step 3: Verify dropped columns and indexes are truly unused.

CI validates the migration script. It does not validate your entire system.

Background jobs, reporting queries, analytics pipelines, and third-party integrations might still reference it.

Before approving a drop: grep your entire codebase.

---

**Tweet 5/7**

Step 4: Assess lock duration and write impact.

Not all migrations are equal. Some hold locks for milliseconds. Others lock a table for hours.

High-risk operations:
• Adding a foreign key without an existing index
• Adding DEFAULT on PostgreSQL < 11 (rewrites the whole table)
• Rebuilding indexes on large tables

Ask: "Will this block writes? For how long?"

---

**Tweet 6/7**

Step 5: Run a semantic diff before every deployment.

Text diffs of migration scripts miss the big picture.

A semantic diff compares the old schema to the new schema and surfaces:
• Tables added or removed
• Columns added, removed, or modified
• Indexes added or dropped
• Foreign key changes
• Constraint additions and removals

---

**Tweet 7/7**

The 5-minute pre-deploy ritual:

1. Export production schema (pg_dump --schema-only)
2. Export post-migration schema from your PR branch
3. Run a semantic diff
4. Review every structural change
5. Approve only when every red flag is addressed

I use SchemaLens for step 3. Paste two schemas, get a visual diff in 10 seconds.

→ https://schemalens.tech

Built for developers who ship with confidence.
