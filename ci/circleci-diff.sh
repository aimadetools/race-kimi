#!/usr/bin/env bash
# SchemaLens one-command schema diff for CircleCI.
# Pipe into bash from a CircleCI run step, or run locally with the right env vars.
# Docs: https://schemalens.tech/circleci-schema-diff.html
set -euo pipefail

SCHEMA_PATH="${SCHEMA_PATH:-db/schema.sql}"
DIALECT="${DIALECT:-postgres}"
FORMAT="${FORMAT:-markdown}"
FAIL_ON_BREAKING="${FAIL_ON_BREAKING:-false}"

BASE_BRANCH="${BASE_BRANCH:-main}"

# Try to infer the PR target branch from the GitHub API when running in CircleCI.
if [ -n "${CIRCLE_PULL_REQUEST:-}" ] && [ -n "${CIRCLE_PROJECT_USERNAME:-}" ] && [ -n "${CIRCLE_PROJECT_REPONAME:-}" ]; then
  PR_NUM=$(echo "$CIRCLE_PULL_REQUEST" | sed 's/.*\///')
  TARGET=$(curl -sL "https://api.github.com/repos/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/pulls/${PR_NUM}" | jq -r '.base.ref // "main"')
  BASE_BRANCH="$TARGET"
fi

git fetch origin "$BASE_BRANCH" 2>/dev/null || true
git show "origin/$BASE_BRANCH:$SCHEMA_PATH" > /tmp/schema_base.sql 2>/dev/null || echo "-- No base schema" > /tmp/schema_base.sql

ENDPOINT="https://schemalens.tech/api/free-diff"
HEADERS=(-H "Content-Type: application/json")
if [ -n "${SL_LICENSE_KEY:-}" ]; then
  ENDPOINT="https://schemalens.tech/api/diff"
  HEADERS+=(-H "X-License-Key: $SL_LICENSE_KEY")
  echo "[SchemaLens] Using Pro endpoint."
else
  echo "[SchemaLens] Using free endpoint."
fi

BODY=$(jq -n \
  --arg schemaA "$(cat /tmp/schema_base.sql)" \
  --arg schemaB "$(cat "$SCHEMA_PATH")" \
  --arg dialect "$DIALECT" \
  --arg format "$FORMAT" \
  '{schemaA: $schemaA, schemaB: $schemaB, dialect: $dialect, format: $format}')

HTTP_STATUS=0
for attempt in 1 2 3; do
  HTTP_STATUS=$(curl -sL -o /tmp/schemalens_response.json -w "%{http_code}" -X POST "$ENDPOINT" \
    "${HEADERS[@]}" \
    -d "$BODY" || echo "000")
  if [ "$HTTP_STATUS" = "200" ]; then break; fi
  echo "[SchemaLens] Attempt $attempt failed (HTTP $HTTP_STATUS). Retrying..."
  sleep $((attempt * 2))
done

if [ "$HTTP_STATUS" != "200" ]; then
  echo "[SchemaLens] API failed after 3 attempts (status: $HTTP_STATUS)"
  cat /tmp/schemalens_response.json 2>/dev/null || true
  exit 1
fi

jq -r '.markdown // .migration // "No output."' /tmp/schemalens_response.json > schema_diff_report.md
cat schema_diff_report.md

BCOUNT=$(jq -r '(.summary.breakingChangeCount // (.breakingChanges | length) // 0)' /tmp/schemalens_response.json)
if [ "$FAIL_ON_BREAKING" = "true" ] && [ "$BCOUNT" != "0" ]; then
  echo "[SchemaLens] $BCOUNT breaking change(s) detected."
  exit 1
fi
