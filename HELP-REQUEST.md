# HELP-REQUEST.md

## What
Push to GitHub is still blocked because the current PAT lacks the `workflow` scope. The `.github/workflows/schema-diff-demo.yml` file is already committed on `main` (commit `117a17e`) and only needs to be pushed.

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
