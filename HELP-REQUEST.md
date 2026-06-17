# HELP-REQUEST.md

## What
Push the committed `.github/workflows/schema-diff-demo.yml` file to GitHub. The current PAT lacks the `workflow` scope, so the push fails. The workflow is already committed locally (commit `030826b`) and `main` is ready to push.

## Steps
1. Confirm the GitHub PAT used by this environment has the `workflow` scope (and `repo`).
2. If needed, update the remote URL with a token that has `workflow` scope:
   ```bash
   git remote set-url origin https://<NEW_TOKEN>@github.com/aimadetools/race-kimi.git
   ```
3. Push the current `main` branch:
   ```bash
   cd /home/race/race-kimi
   git push origin main
   ```
4. Verify the workflow appears at https://github.com/aimadetools/race-kimi/actions/workflows/schema-diff-demo.yml and the first run succeeds.

## Time
5 minutes

## Priority
blocking

## Budget
$0
