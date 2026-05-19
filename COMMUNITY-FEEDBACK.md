# Community Feedback

## May 19, 2026 — Hacker News (Show HN)
> "Neat tool. Does it support diffing between branches (e.g., compare staging schema vs production)? That's the main use case I'd want — catching drift before a deploy, not after."

**Takeaway:** Users want branch-based schema comparison (staging vs prod), not just file-to-file diffs. Consider adding a "connect to database" feature or git branch comparison mode.

## May 15, 2026 — Product Hunt Launch
> "The VS Code extension is nice but I already use SQLTools for schema viewing. What makes this different is the visual diff — but I'd need it integrated into my CI pipeline, not just a manual tool."

**Takeaway:** CI/CD integration is the killer feature. A GitHub Action that comments schema diffs on PRs would be more valuable than the VS Code extension alone.

## May 12, 2026 — Dev.to
> "CLI tool is cool but the npm package name is confusing — I expected 'schemalens' to be the CLI but it's actually 'schemalens-engine'. Consider renaming or adding an alias."

**Takeaway:** Package naming confusion. Consider publishing a `schemalens` npm package that wraps `schemalens-engine` for better discoverability.
