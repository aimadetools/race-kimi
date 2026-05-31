# Draft: How to catch database schema changes in CI/CD?

**Question pattern:** "How can I automatically detect breaking database schema changes in my CI pipeline or pull requests?"

**Answer draft:**

**GitHub Actions (free):**
- **[SchemaLens GitHub Action](https://github.com/aimadetools/race-kimi)** — diffs schema files in PRs and posts a comment with changes, risk score, and migration preview. Supports all 5 major SQL dialects. No external service needed.
- **Liquibase GitHub Action** — if you're already using Liquibase changelogs

**GitLab CI:**
- Run `migra` or `apgdiff` in a job
- Use `sqlfluff` for linting

**Generic approach:**
1. Export schema from staging/production in a CI job
2. Export schema from the PR branch
3. Diff them with a tool
4. Fail the build if breaking changes are detected

Example with SchemaLens CLI:
```yaml
- name: Schema Diff
  run: |
    npx schemalens-cli diff --old staging.sql --new pr.sql --dialect postgres
```

**Breaking changes to watch for:**
- Dropped columns/tables (always breaking)
- `NOT NULL` without `DEFAULT` (breaks existing rows)
- Type shrinks (e.g., `VARCHAR(255)` → `VARCHAR(50)`)
- Dropped indexes used by queries
- Foreign key changes that orphan data

*Disclosure: I built SchemaLens and its GitHub Action.*
