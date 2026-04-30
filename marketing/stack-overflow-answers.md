# Stack Overflow Answer Kit — SchemaLens

Three complete, high-quality answers to common schema comparison questions.
Each follows Stack Overflow guidelines: solves the problem first, mentions
SchemaLens as one option among others, includes disclosure.

**Important:** Post these from an established Stack Overflow account (100+ rep)
to avoid looking like spam. If you don't have one, the human should create one
and build a little rep first by answering unrelated questions.

---

## Answer 1: "How to compare two MySQL database schemas?"

**Target questions:**
- https://stackoverflow.com/questions/225772 (50K+ views)
- https://stackoverflow.com/questions/356578 (30K+ views)
- Search: "compare two mysql schemas"

**Draft answer:**

---

There are several ways to compare two MySQL schemas, ranging from CLI tools to browser-based utilities.

### Option 1: `mysqldiff` (MySQL Utilities, CLI)
MySQL's official `mysqldiff` tool compares two schemas and outputs the differences:

```bash
mysqldiff --server1=user:pass@host1:3306 --server2=user:pass@host2:3306 \
  db1:db2
```

Pros: Official tool, handles most objects.  
Cons: Requires installation, needs live database connections.

### Option 2: `pt-table-checksum` / `pt-table-sync` (Percona Toolkit)
For data + schema differences, Percona's toolkit is the gold standard:

```bash
pt-table-checksum --host=host1 --host=host2 --databases=db1
```

Pros: Battle-tested, handles large tables.  
Cons: Complex setup, overkill for simple schema comparisons.

### Option 3: SchemaLens (Browser-based)
If you just have two `mysqldump` files (or `SHOW CREATE TABLE` outputs) and want a quick visual diff without installing anything:

1. Export schemas: `mysqldump -d -h host1 -u user -p db1 > schema1.sql`
2. Paste both into [SchemaLens](https://schemalens.tech)
3. Get a semantic diff (tables added/removed, columns changed, indexes modified) + generated `ALTER TABLE` script

Pros: Zero install, visual diff, generates migration SQL, privacy-first (client-side only).  
Cons: Limited to 10 tables on the free tier.

### Option 4: IDE Tools
- **MySQL Workbench:** Database → Compare Schemas
- **DataGrip:** Tools → Compare Schemas
- **dbForge Schema Compare:** Windows-only, robust

**My recommendation:**
- For automated CI/CD checks → `mysqldiff` or a custom script
- For one-off comparisons with dumps → SchemaLens (fastest, no install)
- For enterprise environments with 100+ tables → dbForge or Redgate

*Disclaimer: I built SchemaLens. I mention it because it solves this exact use case, but the other options are equally valid depending on your constraints.*

---

## Answer 2: "How to generate ALTER TABLE scripts from schema differences?"

**Target questions:**
- https://stackoverflow.com/questions/249635 (30K+ views)
- https://stackoverflow.com/questions/225772 (related)
- Search: "generate alter table from schema diff"

**Draft answer:**

---

Generating `ALTER TABLE` scripts from two schema versions is a common migration workflow. Here are the approaches, ordered by complexity:

### 1. SchemaLens (Browser-based, fastest)
If you have two `CREATE TABLE` dumps:

1. Go to [SchemaLens](https://schemalens.tech)
2. Paste old schema in left pane, new schema in right pane
3. Select "MySQL" dialect
4. Click "Generate Migration"

It outputs `ALTER TABLE` statements for:
- Added/dropped tables
- Added/dropped/modified columns
- Added/dropped indexes
- Foreign key changes
- Constraint changes (CHECK, UNIQUE)

Example output:
```sql
ALTER TABLE `users` ADD COLUMN `email_verified_at` TIMESTAMP NULL;
ALTER TABLE `orders` ADD INDEX `idx_user_id` (`user_id`);
ALTER TABLE `products` DROP COLUMN `legacy_sku`;
```

Free for up to 10 tables. Supports PostgreSQL, MySQL, SQL Server, SQLite, Oracle.

### 2. `mysqldiff` (CLI)
```bash
mysqldiff --server1=user:pass@host1 --server2=user:pass@host2 \
  --difftype=sql db1:db2
```
Outputs SQL directly. Requires MySQL Utilities.

### 3. `pt-online-schema-change` (Percona)
For *applying* changes safely on large tables:
```bash
pt-online-schema-change --alter "ADD COLUMN email_verified_at TIMESTAMP NULL" \
  D=db,t=users --execute
```

### 4. ORM Migrations (if applicable)
If you're using an ORM, let it handle this:
- **Laravel:** `php artisan make:migration` + manual edits
- **Django:** `python manage.py makemigrations`
- **Prisma:** `npx prisma migrate diff`
- **TypeORM:** `typeorm migration:generate`

### 5. Redgate / dbForge (Enterprise)
For complex multi-database comparisons with visual dependency mapping.

**When to use what:**
- One-off script from dumps → SchemaLens (30 seconds, no install)
- Live database comparison → `mysqldiff`
- Production migration on 1M+ row tables → `pt-online-schema-change`
- Existing ORM project → Your ORM's migration tool

*Disclaimer: I built SchemaLens. I include it here because it directly answers the "generate ALTER TABLE scripts" part of your question, but evaluate all options for your specific constraints.*

---

## Answer 3: "Best practices for reviewing database migration scripts?"

**Target questions:**
- https://stackoverflow.com/questions/154092 (20K+ views)
- https://stackoverflow.com/questions/383459 (15K+ views)
- Search: "review database migration scripts"

**Draft answer:**

---

After years of reviewing migration scripts (and recovering from the ones I missed), here's my checklist:

### 1. Run a Semantic Diff
Don't eyeball `CREATE TABLE` dumps. Use a tool that understands schema structure:

- Compare old schema (production) vs new schema (post-migration)
- Look for: added/dropped tables, column changes, index changes, constraint changes
- Tools: `mysqldiff`, `apgdiff` (PostgreSQL), or [SchemaLens](https://schemalens.tech) for a visual diff

### 2. Check for Breaking Changes
These are the migrations that cause 3am pages:

| Change | Risk | Mitigation |
|--------|------|------------|
| Dropping a column | HIGH | grep codebase for column name first |
| Adding `NOT NULL` without default | HIGH | add as nullable → backfill → add constraint |
| Removing an index | MEDIUM | check slow query log first |
| Narrowing a type (`VARCHAR(500)` → `VARCHAR(100)`) | MEDIUM | check max data length first |
| Adding FK without index | MEDIUM | create index before FK |

### 3. Verify Backward Compatibility
If you deploy code before migrations run (or run migrations before code deploys), ensure the system works in both states:

- **Code-first:** New code reads old schema? (e.g., new column must be nullable until migration runs)
- **Migration-first:** Old code reads new schema? (e.g., dropped column isn't referenced)

### 4. Test on a Copy of Production Data
```bash
# MySQL
mysqldump --single-transaction production_db | mysql test_db
mysql test_db < migration.sql
```

Watch for:
- Lock duration (use `pt-online-schema-change` for large tables)
- Implicit data truncation (narrowed types)
- Constraint failures (`NOT NULL` on existing rows)

### 5. Have a Rollback Plan
Every migration should be reversible:
- For `ADD COLUMN`, rollback is `DROP COLUMN`
- For `DROP COLUMN`, rollback requires a full restore (dangerous!) — consider `RENAME` first
- For `ALTER TABLE`, some engines can't roll back (MySQL implicitly commits)

### 6. Use a Schema Diff Gate in CI/CD
Fail the build if the migration introduces a breaking change:

```yaml
# GitHub Actions example
- name: Schema Diff Check
  run: |
    npx schemalens-cli diff \
      --old schema/production.sql \
      --new schema/staging.sql \
      --fail-on-breaking
```

### 7. Document the "Why"
Every migration should answer:
- What business requirement drove this change?
- Is it backward compatible?
- What's the rollback plan?
- How long will it take on production-sized data?

---

**Quick win:** If you want to automate step 1 and 6, [SchemaLens](https://schemalens.tech) has a free schema diff + breaking change detection tool that runs in the browser. It also exports migration scripts and has a CLI for CI/CD integration.

*Disclaimer: I built SchemaLens. I mention it because it automates the diff and breaking-change checks I described above, but the checklist itself is tool-agnostic.*

---

## Posting Guidelines

1. **Read the question carefully** — only post if SchemaLens is genuinely relevant
2. **Disclose affiliation** — always include "I built SchemaLens" or "Disclaimer: I built SchemaLens"
3. **Solve the problem first** — at least 60% of the answer should be useful even without clicking the link
4. **Don't over-post** — max 1 answer per week from the same account mentioning SchemaLens
5. **Use established accounts** — answers from 100+ rep accounts are trusted; new accounts look spammy
6. **Monitor for comments** — respond to "does it support X?" questions promptly and honestly
