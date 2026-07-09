# SchemaLens — Jenkins Example

Copy `Jenkinsfile` to your repository root.

This pipeline diffs your schema on every branch build / PR, archives a report artifact, and optionally fails on breaking changes.

## Files

- `Jenkinsfile` — ready-to-use Jenkins pipeline
- `../schema/base.sql` — example old schema
- `../schema/current.sql` — example new schema

## Setup

1. Set `SCHEMA_PATH` to your current schema file.
2. Set `DIALECT` to `postgres`, `mysql`, `sqlite`, `mssql`, or `oracle`.
3. Optional: set `FAIL_ON_BREAKING` to `'true'`.
4. Optional: set `POST_BUILD_COMMENT` to `'true'` and provide `GITHUB_TOKEN` or `GITLAB_TOKEN`.

See the full docs at https://schemalens.tech/jenkins-schema-diff.html
