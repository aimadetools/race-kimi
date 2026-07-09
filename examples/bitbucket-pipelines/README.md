# SchemaLens — Bitbucket Pipelines Example

Copy `bitbucket-pipelines.yml` to your repository root.

This pipeline diffs your schema on every pull request, posts a PR comment, and optionally fails on breaking changes.

## Files

- `bitbucket-pipelines.yml` — ready-to-use Bitbucket Pipelines config
- `../schema/base.sql` — example old schema
- `../schema/current.sql` — example new schema

## Setup

1. Set `SCHEMA_PATH` to your current schema file.
2. Set `DIALECT` to `postgres`, `mysql`, `sqlite`, `mssql`, or `oracle`.
3. Optional: set `POST_PR_COMMENT: "true"` and add a `BITBUCKET_ACCESS_TOKEN` variable.
4. Optional: add an `SL_LICENSE_KEY` variable for Pro features.

See the full docs at https://schemalens.tech/bitbucket-schema-diff.html
