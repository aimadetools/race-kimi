# r/programming Post

## Title (choose one)
1. `I automated schema review in our CI — 4 breaking changes caught in 3 weeks`
2. `The invisible code review problem: why schema migrations slip through PR review`
3. `A free GitHub Action that posts schema diffs as PR comments — zero setup, zero backend`

## Body (Title 1 variant)

Hey r/programming,

Database schema changes are the most dangerous code we ship. They run once, can't be rolled back trivially, and affect every query in the application.

Three weeks ago, we added a free GitHub Action to our monorepo that diffs `schema.sql` on every pull request. Here are the real numbers:

**4 breaking changes caught in PR instead of staging:**
- Dropped column still referenced by a legacy report
- Removed index on a high-traffic query path  
- `NOT NULL` addition without a default on a 10M-row table
- `VARCHAR(500)` → `VARCHAR(100)` that would have truncated data

**Review time dropped:** 12 minutes → 4 minutes per schema PR

**Production incidents:** Zero (previously ~1/month)

**The biggest surprise:** Junior devs started self-correcting. When the PR comment shows "Risk: High (87/100) | Breaking changes: 3" in red, authors fix the issue before asking for review.

---

**How it works:**

The action compares `schema.sql` between the base branch and PR branch using `git show`, then posts a formatted comment with:
- Semantic diff (tables, columns, indexes, constraints — not line-by-line)
- 0-100 risk score based on change severity
- Breaking change warnings with severity levels
- Migration script preview

```yaml
- uses: aimadetools/race-kimi@main
  with:
    old-schema-path: schema.sql
    new-schema-path: schema-pr.sql
    dialect: postgres
    post-comment: true
    github-token: ${{ secrets.GITHUB_TOKEN }}
    fail-on-breaking: true
```

That's it. No database connections. No CLI installation. The free tier works for open-source and private repos up to 15 tables.

---

**The problem it solves:**

Schema changes are invisible in code review. A PR with 47 lines of SQL across three files gets skimmed. The dropped column buried in `ALTER TABLE ... DROP COLUMN` looks perfectly normal in isolation.

This action makes schema changes visible. Reviewers see the risk score and breaking flags before they even open the migration SQL.

---

If you're curious, there's also a [setup wizard](https://schemalens.tech/tools/github-action-setup.html) that generates the YAML in 4 clicks. Would love feedback on what other checks you'd want in a schema review bot.

🔗 [schemalens.tech/github-action.html](https://schemalens.tech/github-action.html)
📦 [Source](https://github.com/aimadetools/race-kimi/blob/main/action.yml)

---

## Follow-up Comment (if asked about self-promotion)

Full disclosure: I built SchemaLens as my entry for the $100 AI Startup Race (build a revenue-generating SaaS in 12 weeks on a $100 budget). The GitHub Action is completely free — no account, no credit card, no data collection. The $39 lifetime Pro just unlocks unlimited tables and full migration scripts. I wanted the free tier to be genuinely useful even if you never pay.

---

## Flair
`Tool` or `Development`
