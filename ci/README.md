# SchemaLens CI/CD Integration

Run schema diffs in your CI/CD pipeline to catch migration issues before they hit production.

## Quick Start

Copy the `ci/schemalens-diff.js` script into your repository and add the appropriate workflow file for your platform.

## GitHub Actions

Add `.github/workflows/schema-diff.yml` to your repository (see example in this repo).

The workflow will:
1. Trigger on PRs that modify `.sql` files
2. Compare the base branch schema against the PR schema
3. Post a markdown diff report as a PR comment
4. Optionally fail the build if unexpected changes are detected

### Configuration

Edit the workflow to match your setup:

```yaml
- name: Run SchemaLens Diff
  run: |
    node ci/schemalens-diff.js \
      /tmp/schema_base.sql \
      db/schema.sql \
      --dialect=postgres \
      --format=markdown
```

**Options:**
- `--dialect`: `postgres`, `mysql`, `sqlite`, `mssql`
- `--format`: `json` or `markdown`
- `--output`: Write to a file instead of stdout

## GitLab CI

Add `.gitlab-ci.yml` to your repository (see example in this repo).

The pipeline will:
1. Trigger on merge requests that modify `.sql` files
2. Run the diff and output a markdown report
3. Store the report as a pipeline artifact

## Bitbucket Pipelines

Add `bitbucket-pipelines.yml` to your repository (see `ci/bitbucket-pipelines.yml` in this repo for the template).

The pipeline will:
1. Trigger on pull requests that modify `.sql` files
2. Compare the base branch schema against the PR schema
3. Output a markdown diff report to the pipeline logs
4. Store the report as a pipeline artifact
5. Optionally post a PR comment if `BITBUCKET_USERNAME` and `BITBUCKET_APP_PASSWORD` repository variables are configured

### Setup

1. Copy `ci/bitbucket-pipelines.yml` to your repository root as `bitbucket-pipelines.yml`
2. Adjust `db/schema.sql` to match your schema file path
3. (Optional) Add repository variables:
   - `BITBUCKET_USERNAME` — your Bitbucket username
   - `BITBUCKET_APP_PASSWORD` — a Bitbucket app password with PR comment permissions

## CLI Usage

```bash
# Basic usage
node ci/schemalens-diff.js old_schema.sql new_schema.sql

# With options
node ci/schemalens-diff.js old_schema.sql new_schema.sql \
  --dialect=mysql \
  --format=markdown \
  --output=diff_report.md

# JSON output for programmatic use
node ci/schemalens-diff.js old_schema.sql new_schema.sql \
  --dialect=postgres \
  --format=json
```

**Exit codes:**
- `0` — no differences
- `1` — differences found
- `2` — error

## Example: Failing on Breaking Changes

You can wrap the diff script to fail only on specific change types:

```bash
#!/bin/bash
node ci/schemalens-diff.js "$1" "$2" --dialect=postgres --format=json --output=/tmp/diff.json

# Fail if any tables were removed
REMOVED=$(jq '.tablesRemoved | length' /tmp/diff.json)
if [ "$REMOVED" -gt 0 ]; then
  echo "❌ Breaking change: tables were removed"
  exit 1
fi

# Fail if any columns were removed
MODIFIED=$(jq '.tablesModified[] | select(.columnsRemoved | length > 0)' /tmp/diff.json)
if [ -n "$MODIFIED" ]; then
  echo "❌ Breaking change: columns were removed"
  exit 1
fi

echo "✅ No breaking changes detected"
```

## Supported Dialects

- PostgreSQL
- MySQL / MariaDB
- SQLite
- SQL Server

## Requirements

- Node.js 18+
- No npm dependencies — the script is self-contained

## Limitations

- The CI script uses the same parser as the browser app. See parser confidence warnings for edge cases.
- Migration SQL generation is not included in the CI script (it only produces diff reports).
- For migration generation, use the browser app at https://schemalens.vercel.app

---

*Part of SchemaLens — https://schemalens.vercel.app*
