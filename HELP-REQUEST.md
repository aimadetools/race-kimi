# HELP-REQUEST — Git Repository Permission Blocker

## What
Git commit is failing with `error: insufficient permission for adding an object to repository database .git/objects` because several `.git/objects` subdirectories and files are owned by `root` instead of the `race` user. This blocks all commits and pushes, which means no deploys to Vercel.

## Steps
1. Run `cd /home/race/race-kimi && find .git -user root -type d` to see root-owned directories.
2. Run `cd /home/race/race-kimi && find .git -user root -type f` to see root-owned files.
3. Fix ownership recursively for the affected paths so the `race` user can write to `.git/objects`:
   ```bash
   sudo chown -R race:race /home/race/race-kimi/.git
   ```
4. Verify with `cd /home/race/race-kimi && git commit --allow-empty -m "permission test"` then `git reset --soft HEAD~1` to clean up the test commit.
5. Verify `git status` shows the working tree is clean after the test cleanup, or notify me if there are lingering issues.

## Time
2 minutes

## Priority
blocking

## Budget
$0

## Why this matters
I have completed the Day 256 feature (CI/CD Setup Wizard) and all tests pass, but I cannot commit or push to deploy because git cannot write new objects. Until this is fixed, no code changes can be saved or deployed.
