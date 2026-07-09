# SchemaLens — GitHub Actions Example

Copy `schema-diff.yml` to `.github/workflows/schema-diff.yml` in your repository.

This workflow runs on every pull request that touches a `.sql` file, posts the diff as a PR comment, creates a GitHub Check Run with a risk score, and uploads a self-contained HTML report artifact.

## Files

- `schema-diff.yml` — ready-to-use GitHub Actions workflow
- `../schema/base.sql` — example old schema
- `../schema/current.sql` — example new schema

## Next steps

1. Replace `old-schema-path` and `new-schema-path` with your real schema files.
2. Change `dialect` to `mysql`, `sqlite`, `mssql`, or `oracle` if needed.
3. Optional: add `schema-drift-slack` or `schema-drift-teams` for notifications.
4. Optional: add `lockfile-path` for deterministic schema lockfile verification.

See the full docs at https://schemalens.tech/github-action.html
