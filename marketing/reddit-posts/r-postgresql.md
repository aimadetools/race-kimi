# r/PostgreSQL Post

## Title (choose one)
1. `I built a free schema diff tool that comments on your PRs — no DB connection required`
2. `Tired of manually writing ALTER TABLE scripts? I made a browser-based diff tool for Postgres`
3. `How I catch schema drift before deploy: a GitHub Action that diffs schema.sql on every PR`

## Body (Title 1 variant)

Hey r/PostgreSQL,

I've been burned one too many times by schema changes breaking production. Last month a dropped column broke a report that took the CFO's team 3 days to rebuild.

So I built **SchemaLens** — a privacy-first schema diff tool that works entirely in your browser. Paste two `pg_dump` outputs (or any `CREATE TABLE` scripts), get a visual semantic diff, and generate the exact `ALTER TABLE` / `DROP` / `CREATE INDEX` scripts to migrate safely.

**What makes it different:**
- Zero setup. No install, no DB connection, no account.
- Works entirely client-side — your schemas never leave your machine.
- Detects breaking changes (dropped columns, type changes, index drops) before they hit prod.
- Free for up to 15 tables. $39 lifetime for unlimited.
- **GitHub Action** that comments schema diffs directly on PRs (free tier included).

I also wrote a [Zero-Downtime Migration Guide](https://schemalens.tech/zero-downtime-migration-guide.html) covering the expand/contract pattern for Postgres specifically.

Would love feedback from this community. What edge cases am I missing?

🔗 [schemalens.tech](https://schemalens.tech)

---

## Follow-up Comment (post after 30 minutes if no engagement)

Since a few people asked — the GitHub Action is a composite action, so it works with any workflow. Here's a minimal example:

```yaml
- uses: aimadetools/race-kimi@main
  with:
    old-schema-path: schema.sql
    new-schema-path: ${{ github.event.pull_request.head.sha }}/schema.sql
    dialect: postgresql
    post-comment: true
```

It posts a markdown table with breaking changes, risk score, and migration script directly on the PR. The free tier covers most PRs; Pro unlocks full migration generation.

---

## Flair
`Tool` or `Showcase`

## Cross-post Opportunity
- r/devops (same post, focus on CI/CD angle)
- r/selfhosted (privacy-first, client-side angle)
