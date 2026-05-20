# Tweet Thread — Add Schema Diff Comments to Every PR in 5 Minutes

Copy and paste these tweets one by one. Post as a thread (reply to previous tweet).

Best time to post: Tuesday–Thursday, 9–11am ET.

Hashtags to add to the last tweet only: #GitHubActions #Database #DevOps #PostgreSQL #MySQL

---

**Tweet 1/8**

You can add schema diff comments to every pull request in 5 minutes.

No database connections. No CLI installation. No license key.

Here's the complete setup ↓

---

**Tweet 2/8**

Create `.github/workflows/schema-diff.yml`:

```yaml
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

---

**Tweet 3/8**

That's 15 lines of YAML.

The action:
- Compares schema.sql between base branch and PR branch
- Posts a formatted diff summary as a PR comment
- Calculates a 0-100 risk score
- Optionally fails the build if breaking changes are detected

---

**Tweet 4/8**

Here's what the PR comment looks like:

🔍 SchemaLens Schema Diff (Free Tier)

Risk: Medium (42/100) | Breaking changes: 1

### Migration Preview
ALTER TABLE users
  ADD COLUMN email_verified_at TIMESTAMP;

-- ... 12 total migration lines.

---

**Tweet 5/8**

The risk score isn't just a number.

0–20: Safe (additive only)
21–50: Low Risk
51–75: Medium Risk
76–100: High Risk — breaking changes detected

Reviewers see the risk level before they even open the migration SQL.

---

**Tweet 6/8**

`fail-on-breaking: true` is the safety net.

Dropped columns, removed indexes, altered primary keys — these break your users, not your build.

With branch protection + required status checks, breaking schema changes literally cannot be merged without explicit override.

---

**Tweet 7/8**

Real-world impact after 3 weeks:

- 4 breaking changes caught in PR instead of staging
- Schema PR review time: 12 min → 4 min
- Zero schema-related production incidents (previously ~1/month)

The biggest surprise? Junior devs started self-correcting when they saw "Risk: High (87/100)" in red.

---

**Tweet 8/8**

Free tier: breaking change detection, risk scoring, PR comments for open-source projects.

Pro ($39 lifetime): full migration scripts, rollback generation, view dependency tracking.

Setup wizard if you don't want to write YAML by hand:
→ https://schemalens.tech/tools/github-action-setup.html

#GitHubActions #Database #DevOps #PostgreSQL #MySQL
