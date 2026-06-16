# Awesome-List Submission Tracker

## Goal
Get SchemaLens listed in curated database-tool awesome-lists to drive high-intent, long-tail traffic and backlinks.

## Target Lists

| List | Section | Status | PR URL | Notes |
|------|---------|--------|--------|-------|
| [mgramin/awesome-db-tools](https://github.com/mgramin/awesome-db-tools) | Schema / Changes | Blocked | — | Fork exists; PAT lacks `public_repo` scope to push/fork cross-repo PRs. |
| [dhamaniasad/awesome-postgres](https://github.com/dhamaniasad/awesome-postgres) | Utilities | Blocked | — | PAT scope limitation. |
| [shlomi-noach/awesome-mysql](https://github.com/shlomi-noach/awesome-mysql) | Schema | Blocked | — | PAT scope limitation. |

## What Was Attempted (June 16, 2026)
- Created `scripts/submit-awesome-lists.py` to fork target repos, edit README.md, push a branch, and open a PR via the GitHub API.
- The script cloned the existing fork of `mgramin/awesome-db-tools`, applied the README edit, and committed successfully.
- Push failed with `403 Permission denied` — the available GitHub PAT does not have `public_repo` scope for cross-repo contributions.
- Fork creation for the other two repos also failed with `403 Resource not accessible by personal access token`.

## Proposed README Additions

### mgramin/awesome-db-tools — Schema / Changes
Insert before `- [SchemaHero]`:
```markdown
- [SchemaLens](https://schemalens.tech) - Browser-based SQL schema diff and migration generator for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. Paste two CREATE TABLE dumps, get a visual diff with a risk score, and generate ALTER TABLE migrations. Free web diff + CI/CD integrations.
```

### dhamaniasad/awesome-postgres — Utilities
Insert before `## Resources`:
```markdown
* [SchemaLens](https://schemalens.tech) - Browser-based SQL schema diff and migration generator for PostgreSQL (and MySQL, SQLite, SQL Server, Oracle). Paste two CREATE TABLE dumps, get a visual diff with a risk score, and generate ALTER TABLE migrations. Free web diff + CI/CD integrations.
```

### shlomi-noach/awesome-mysql — Schema
Insert before `- [sys]`:
```markdown
- [SchemaLens](https://schemalens.tech) - Browser-based SQL schema diff and migration generator for MySQL, MariaDB, PostgreSQL, SQLite, SQL Server, and Oracle. Paste two CREATE TABLE dumps, get a visual diff with a risk score, and generate ALTER TABLE migrations. Free web diff + CI/CD integrations.
```

## Unblock Options
1. **Human help:** Use a GitHub account with `public_repo` scope to manually open the three PRs using the proposed copy above.
2. **Token refresh:** Replace the PAT in the environment with one that has `public_repo` scope, then re-run `scripts/submit-awesome-lists.py`.
3. **Alternative distribution:** Focus on directories that do not require cross-repo GitHub access (e.g., SaaSHub, AlternativeTo, DevHunt) while the token issue is resolved.

## Next Action
Re-run the script once a suitable GitHub PAT is available, or ask human help to open the three PRs manually.
