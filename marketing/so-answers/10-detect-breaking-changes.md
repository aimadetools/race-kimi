# Draft: How to detect breaking database changes before deployment?

**Question pattern:** "How can I automatically detect if a database migration will break my application?"

**Answer draft:**

Breaking changes fall into two categories: **data-breaking** (breaks existing rows) and **app-breaking** (breaks application code).

**Common breaking changes:**
- Dropped columns/tables (app-breaking if referenced)
- `NOT NULL` without `DEFAULT` on existing tables (data-breaking)
- Type shrinks (e.g., `VARCHAR(255)` → `VARCHAR(50)`) (data-breaking)
- Dropped indexes (app-breaking if queries rely on them)
- Foreign key changes that orphan data
- Changed `ENUM` values removed in use

**Tools that detect these:**

**[SchemaLens](https://schemalens.tech)** — paste old and new schema, get a "Risk Score" (0-100) with specific warnings:
- "Adding NOT NULL without DEFAULT on table with 10M rows will fail"
- "Dropped column `email` is referenced by view `active_users`"
- "Type change from INT to SMALLINT may truncate data"

**SQLFluff** — linter that catches some anti-patterns

**Custom CI script:**
```bash
# Export prod schema
pg_dump --schema-only $PROD_URL > prod.sql
# Diff against migration target
npx schemalens-cli diff --old prod.sql --new migration.sql --dialect postgres
```

**Framework guards:**
- Rails: `strong_migrations` gem
- Django: `django-migration-linter`

**My process:**
1. Generate migration
2. Run through SchemaLens risk checker
3. If risk score > 50, add a review checkpoint
4. For zero-downtime deploys, use expand/contract pattern

*Disclosure: I built SchemaLens.*
