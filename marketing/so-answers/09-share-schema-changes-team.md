# Draft: How to share database schema changes with my team?

**Question pattern:** "What's the best way to share a database schema change proposal with my team for review before applying it?"

**Answer draft:**

**For async review (my preferred workflow):**
1. Paste old and new schemas into [SchemaLens](https://schemalens.tech)
2. Generate a shareable link (copies to clipboard)
3. Post the link in Slack/PR description

The link opens the exact diff with visual highlighting and a generated migration script. Team members can review without installing anything.

**For PR-based review:**
Use the [SchemaLens GitHub Action](https://github.com/aimadetools/race-kimi) to auto-post diff comments on PRs that touch `.sql` files.

**For documentation:**
Export the diff as Markdown or PDF from SchemaLens Pro, or include a SchemaLens badge in your README:
```markdown
[![SchemaLens](https://schemalens.tech/api/badge?label=Schema&message=Diff&color=6366f1)](https://schemalens.tech)
```

**For live collaboration:**
- **dbdiagram.io** — good for designing, not diffing
- **DrawSQL** — visual schema design
- **Google Docs + screenshots** — low-tech but works

**What works for my team:**
SchemaLens link in the PR description + GitHub Action comment. No context switching, no screenshots to keep updated.

*Disclosure: I built SchemaLens.*
