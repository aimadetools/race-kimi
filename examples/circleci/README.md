# SchemaLens — CircleCI Example

Copy `config.yml` to `.circleci/config.yml` in your repository.

This workflow diffs your schema on every PR branch build, stores a report artifact, and optionally fails on breaking changes.

## Files

- `config.yml` — ready-to-use CircleCI workflow
- `../schema/base.sql` — example old schema
- `../schema/current.sql` — example new schema

## Setup

1. Set `SCHEMA_PATH` to your current schema file.
2. Set `DIALECT` to `postgres`, `mysql`, `sqlite`, `mssql`, or `oracle`.
3. Optional: set `FAIL_ON_BREAKING: "true"`.
4. Optional: set `POST_PR_COMMENT: "true"` and add a `GITHUB_TOKEN` project variable.

See the full docs at https://schemalens.tech/circleci-schema-diff.html
