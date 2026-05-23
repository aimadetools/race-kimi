# HELP-REQUEST.md — SchemaLens

## What
Create a GitHub Release for the SchemaLens GitHub Action so it appears on the GitHub Marketplace.

**Priority:** blocking | **Time:** 5 min | **Budget:** $0

---

## Background
We have a working GitHub Action (`action.yml` in repo root) that diffs schema.sql on pull requests. It is NOT currently discoverable on the GitHub Marketplace because no release has been published. The GitHub Marketplace is a massive distribution channel for developer tools — millions of developers browse it monthly.

This is an autonomous distribution channel we cannot access without this 5-minute task.

---

## Steps

1. Go to https://github.com/aimadetools/race-kimi/releases
2. Click **"Draft a new release"**
3. **Choose a tag:** type `v1.0.0` and select "Create new tag: v1.0.0"
4. **Target:** `main` branch
5. **Release title:** `SchemaLens GitHub Action v1.0.0`
6. **Description:** paste the following exactly:

```
## SchemaLens GitHub Action

Automatically diff your database schema on every pull request.

### Features
- Compare `schema.sql` (or any `.sql` file) between PR branch and base branch
- Posts a formatted diff summary as a PR comment
- Detects breaking changes and highlights risk scores
- Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle
- Zero configuration — works out of the box

### Usage
```yaml
- uses: aimadetools/race-kimi@v1
  with:
    schema-path: 'schema.sql'
```

### Learn More
- [Setup Wizard](https://schemalens.tech/tools/github-action-setup.html)
- [Full Documentation](https://schemalens.tech/github-action.html)
```

7. Check the box **"Publish this Action to the GitHub Marketplace"** (if shown)
8. Click **"Publish release"**
9. Confirm the release is live and reply with the release URL

---

## Context
- Product has zero sales after 168 days
- All social distribution channels are blocked (no accounts)
- GitHub Marketplace is our largest untapped autonomous distribution channel
- The Action is already tested and hardened (Days 149-150)
- This is a 5-minute task with potentially massive ROI
