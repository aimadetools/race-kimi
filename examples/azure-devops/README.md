# SchemaLens — Azure DevOps Pipelines Example

Copy `azure-pipelines.yml` to your repository root.

This pipeline diffs your schema on every pull request that touches a `.sql` file, publishes a report artifact, and optionally posts a PR comment.

## Files

- `azure-pipelines.yml` — ready-to-use Azure Pipelines config
- `../schema/base.sql` — example old schema
- `../schema/current.sql` — example new schema

## Setup

1. Set `SCHEMA_OLD_PATH` and `SCHEMA_NEW_PATH` to your schema files.
2. Set `DIALECT` to `postgres`, `mysql`, `sqlite`, `mssql`, or `oracle`.
3. Optional: set `FAIL_ON_BREAKING: 'true'`.
4. Optional: ensure the build service has "Contribute to pull requests" permission to post comments.

See the full docs at https://schemalens.tech/azure-devops-schema-diff.html
