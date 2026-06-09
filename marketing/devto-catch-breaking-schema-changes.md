# How to Catch Breaking Database Schema Changes in Every Pull Request

tags: #database #githubactions #devops #sql #ci-cd

---

You review a pull request. The code looks clean. Tests pass. You approve and merge.

Three hours later, production is down. A column was dropped. A foreign key was changed. A `NOT NULL` constraint was added to an existing table without a default. The migration ran fine in staging, but the deployed app crashes because it still expects the old schema.

This happens because **schema changes are invisible in code review**. You can't spot a dangerous `ALTER TABLE` by reading application code. You need to diff the actual SQL.

Here's how to automate that check — for free, in under 60 seconds.

---

## The Problem: Schema Drift Hides in Plain Sight

Modern teams review JavaScript, Python, and Go in pull requests. But the SQL migration file that drops a column? It gets a quick skim at best.

Common breaking changes that slip through:

- **Dropping a column** that the app still queries
- **Removing an index** that a query planner relies on
- **Changing a column type** from `VARCHAR(255)` to `TEXT` (safe) or `INT` to `BIGINT` (maybe not)
- **Adding `NOT NULL`** without a default value on an existing table
- **Renaming a table** without updating all references

Framework migrations (Rails, Django, Prisma) make it easy to *write* migrations. They don't make it easy to *review* them.

---

## The Solution: Schema Diff in CI/CD

The fix is simple: compare the schema before and after every PR.

```yaml
# .github/workflows/schema-diff.yml
name: Schema Diff
on: [pull_request]
jobs:
  diff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Get base schema
        run: git show origin/${{ github.base_ref }}:schema.sql > schema-base.sql
      - uses: aimadetools/race-kimi@main
        with:
          old-schema-path: schema-base.sql
          new-schema-path: schema.sql
          dialect: postgres
          post-comment: true
          create-check-run: true
          run-only-on-schema-change: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
          fail-on-breaking: true
```

That's it. Now every PR that touches your database schema gets:

1. **A PR comment** with a formatted diff summary
2. **A Check Run** in the PR checks tab (just like your tests)
3. **A Job Summary** on the Actions run page
4. **An automatic failure** if breaking changes are detected

---

## What the Check Run Looks Like

When a developer opens a PR, they see this in the checks tab:

> **SchemaLens Schema Diff** — Risk: Medium (42/100) · Breaking: 1
>
> SchemaLens detected **1** added, **0** removed, and **2** modified tables. Risk level: **Medium** (42/100). **1** breaking change(s) found.

No clicking required. No leaving GitHub. The reviewer knows instantly that this PR needs a closer look.

---

## What Counts as "Breaking"?

Not every schema change is dangerous. The tool categorizes risk:

| Change | Risk | Why |
|--------|------|-----|
| Adding a table | Low | Safe — nothing depends on it yet |
| Adding a nullable column | Low | Safe — existing queries still work |
| Adding an index | Low | Safe — improves performance |
| Dropping a column | **High** | Any query referencing it will fail |
| Dropping a table | **High** | Catastrophic if anything references it |
| Adding `NOT NULL` without default | **High** | Existing rows will violate the constraint |
| Changing column type | Medium | May truncate data or break ORM mappings |
| Removing an index | Medium | May cause query performance regressions |

Each diff gets a **0-100 risk score**. High-risk migrations get extra scrutiny.

---

## Smart Skip: Don't Waste CI Minutes

If your PR only changes frontend code, you don't need a schema diff. The `run-only-on-schema-change: true` flag checks whether any `.sql` files were modified and skips the diff entirely if not.

This saves CI minutes and keeps your PR checks clean.

---

## Works With Any SQL

No ORM lock-in. No framework requirement. The action works with any `CREATE TABLE` dump from any source:

- `pg_dump --schema-only` (PostgreSQL)
- `mysqldump --no-data` (MySQL)
- `sqlite3 .schema` (SQLite)
- SQL Server Generate Scripts wizard
- Oracle Data Pump export
- Hand-written migration files

If it contains `CREATE TABLE`, the action can diff it.

---

## Free Tier is Actually Free

No license key. No credit card. No signup.

The free GitHub Action includes:
- ✅ Schema diff summary
- ✅ Breaking change detection
- ✅ Risk score
- ✅ PR comments
- ✅ Check Runs
- ✅ Job Summaries
- ✅ Smart skip

The Pro tier ($39 lifetime) unlocks the full migration SQL generation, but the safety net is 100% free.

---

## Try It on Your Repo

1. Dump your schema to a file: `pg_dump --schema-only > schema.sql`
2. Add the workflow above to `.github/workflows/schema-diff.yml`
3. Open a PR that changes your schema
4. Watch the Check Run appear

Or try it in the browser first: [schemalens.tech](https://schemalens.tech)

---

## The Real Cost of Missing a Breaking Change

A production incident from a bad migration costs more than money:

- Customer trust erodes
- Engineers get paged at 2 AM
- Rollbacks are stressful and error-prone
- The "deploy anxiety" culture spreads

A 60-second CI check prevents all of it. Schema diff should be as standard as running your test suite.

---

*What's your worst schema migration story? Drop it in the comments.*
