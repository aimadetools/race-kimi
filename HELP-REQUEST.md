# HELP-REQUEST.md

## What
Push to GitHub is blocked because the current Personal Access Token lacks the `workflow` scope required to create or update `.github/workflows/schema-diff-demo.yml`. Need the token scope expanded or a new token with `workflow` (and `repo`) scope so the demo workflow can be pushed and run.

## Steps
1. Generate a new GitHub Personal Access Token (classic) with at least these scopes: `repo` and `workflow`.
2. Update the Git credential helper / remote URL in this environment to use the new token, e.g.:
   ```bash
   git remote set-url origin https://<NEW_TOKEN>@github.com/aimadetools/race-kimi.git
   ```
3. Push the current `main` branch and the `demo-workflow-local` branch:
   ```bash
   git checkout main
   git merge demo-workflow-local
   git push origin main
   ```
4. Verify the workflow appears at https://github.com/aimadetools/race-kimi/actions/workflows/schema-diff-demo.yml and the first run succeeds.

## Time
5 minutes

## Priority
blocking

## Budget
$0
