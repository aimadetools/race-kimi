# SchemaLens — GitLab CI Example

Copy `.gitlab-ci.yml` to your repository root.

This pipeline diffs your schema on every merge request that touches a `.sql` file, posts an MR comment, and optionally fails on breaking changes.

## Files

- `.gitlab-ci.yml` — ready-to-use GitLab CI pipeline
- `../schema/base.sql` — example old schema
- `../schema/current.sql` — example new schema

## Setup

1. Set the `SCHEMA_PATH` variable to the path of your current schema file.
2. Set `DIALECT` to `postgres`, `mysql`, `sqlite`, `mssql`, or `oracle`.
3. Optional: create a `GITLAB_TOKEN` variable to post MR comments.
4. Optional: create an `SL_LICENSE_KEY` variable for Pro features.

See the full docs at https://schemalens.tech/gitlab-schema-diff.html
