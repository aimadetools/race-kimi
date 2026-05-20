# r/webdev Post — GitHub Action Angle

## Title (choose one)
1. `The 5-minute GitHub Action that comments schema diffs on your PRs`
2. `Stop discovering breaking schema changes in production — catch them in the PR instead`
3. `I made a free GitHub Action that gives every schema PR a risk score (0-100)`

## Body (Title 2 variant)

Hey r/webdev,

A few months ago, our team deployed a migration that dropped a column still referenced by a legacy report. Deploy went green. Application stayed up. 24 hours later, the CFO's weekly report failed silently.

The root cause wasn't bad code review. It was **invisible code review**. The PR changed 47 lines of SQL across three files. The reviewer skimmed it, saw no obvious issues, and approved.

Database schema changes are uniquely dangerous:
- They're often large and hard to read in raw SQL
- Breaking changes don't break your build — they break your users
- They're usually reviewed by the same person who wrote them, at 4 PM on a Friday

So we built a free GitHub Action that posts a schema diff comment on every PR.

---

**What the PR comment looks like:**

```
🔍 SchemaLens Schema Diff (Free Tier)

Risk: Medium (42/100) | Breaking changes: 1

### Migration Preview
ALTER TABLE users
  ADD COLUMN email_verified_at TIMESTAMP;

-- ... 12 total migration lines.
```

**The action gives you:**
- Semantic diff (not line-by-line text diff)
- 0-100 risk score with color-coded severity
- Breaking change detection (dropped columns, removed indexes, type narrowing)
- Optional `fail-on-breaking` to block merge

---

**Setup:**

```yaml
# .github/workflows/schema-diff.yml
name: Schema Diff
on: [pull_request]

jobs:
  diff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aimadetools/race-kimi@main
        with:
          old-schema-path: ./schema/base.sql
          new-schema-path: ./schema/current.sql
          dialect: postgres
          post-comment: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
          fail-on-breaking: true
```

That's it. No DB connection. No CLI install. Works with PostgreSQL, MySQL, SQLite, SQL Server, Oracle.

---

**Real-world impact after 3 weeks:**
- 4 breaking changes caught in PR
- Schema PR review time: 12 min → 4 min
- Zero schema-related production incidents

The free tier includes breaking change detection, risk scoring, and PR comments. Pro ($39 lifetime) adds unlimited tables, full migration scripts, and rollback generation.

There's also a [Setup Wizard](https://schemalens.tech/tools/github-action-setup.html) if you don't want to write YAML by hand.

Would this fit your workflow? What other PR review automation do you use?

🔗 [schemalens.tech/github-action.html](https://schemalens.tech/github-action.html)

---

## Note
r/webdev has strict self-promo rules. Post on Saturday with `Showoff Saturday` flair, or frame as a question ("Would you use a schema diff GitHub Action?").

## Flair
`Showoff Saturday` (Saturday only) or `Discussion`
