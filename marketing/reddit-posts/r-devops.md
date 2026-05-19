# r/devops Post

## Title (choose one)
1. `GitHub Action that comments schema diffs on PRs — catch breaking DB changes before merge`
2. `Free schema diff for CI/CD: compare schema.sql on every PR, get a risk score + migration script`
3. `I made a composite GitHub Action for database schema review — zero backend, works with any pipeline`

## Body (Title 1 variant)

Hey r/devops,

Database schema changes are the one thing that still makes me nervous in CI/CD. A bad migration at 2am is not fun.

I built a **free GitHub Action** that diffs `schema.sql` (or any SQL dump) on every pull request and posts the results as a PR comment:

- Breaking changes highlighted in red
- Risk score (0-100) based on change severity
- Full migration script (`ALTER TABLE`, `CREATE INDEX`, etc.)
- Works with PostgreSQL, MySQL, SQLite, SQL Server, Oracle

**The action is a composite action** — zero Docker builds, runs on `ubuntu-latest` in seconds:

```yaml
- uses: aimadetools/race-kimi@main
  with:
    old-schema-path: schema.sql
    new-schema-path: ${{ github.event.pull_request.head.sha }}/schema.sql
    dialect: postgresql
    post-comment: true
    fail-on-breaking: false
```

It compares the base branch schema against the PR branch schema using `git show`, so it works with committed schema files (no live DB connection needed).

**Free tier:** Up to 15 tables per diff, basic PR comment.
**Pro ($39 lifetime):** Unlimited tables, full migration script in PR comment, custom dialect support.

I also built a [Setup Wizard](https://schemalens.tech/tools/github-action-setup.html) that generates the complete workflow YAML in 4 clicks.

Would this fit into your pipeline? What integrations would you want next?

🔗 [schemalens.tech/github-action.html](https://schemalens.tech/github-action.html)
📦 [GitHub Action Source](https://github.com/aimadetools/race-kimi/blob/main/action.yml)

---

## Follow-up Comment (if asked about alternatives)

Compared to other options:
- **Prisma Migrate Diff**: Requires Prisma setup, CLI only, no PR comments out of the box
- **schemalex / migra**: CLI only, requires installation in CI
- **Redgate Schema Compare**: $369+/user/year, Windows-only

This is designed for teams that keep `schema.sql` in version control (which you should) and want zero-friction PR review for DB changes.

---

## Flair
`Tool` or `CI/CD`
