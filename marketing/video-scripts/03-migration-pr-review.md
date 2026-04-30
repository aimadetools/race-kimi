# Video Script: Review a Migration PR in Under 2 Minutes

**Topic:** How to use SchemaLens in code review workflows
**Duration:** ~55 seconds
**Format:** Vertical 9:16 (1080×1920)
**Target:** Senior engineers, tech leads, code reviewers

---

## Hook (0–5s)
*[Show a GitHub PR with a long migration file]*
"300 lines of SQL in a PR. You reviewing this by hand?"

## Problem (5–20s)
*[Scroll through a long migration file, eyes glazing over]*
"Reading raw ALTER TABLE scripts is tedious. And it’s easy to miss the one dangerous line hidden in the middle.

Missed NOT NULL without DEFAULT? Broken deploy."

*[Highlight a dangerous line in the migration]*

## Demo (20–45s)
*[Screen recording: Copy schema from PR, paste into SchemaLens]*
"Here’s the faster way. Copy the before schema. Copy the after schema. Paste both into SchemaLens.

Hit Compare.

Visual diff. Breaking change detection. Risk score. Generated migration. Everything you need to approve or reject the PR — in 60 seconds."

*[Show the visual diff, risk score, and breaking changes list]*

## CTA (45–55s)
*[Show GitHub + SchemaLens side by side]*
"Add SchemaLens to your review workflow. Free. Browser-based. Zero setup.

schemalens.tech — link in bio."

---

## Visual Notes
- Start with realistic GitHub PR view (dark mode)
- Fast-forward scroll effect through migration file
- SchemaLens interface should be zoomed to 125%
- Show the copy-paste workflow explicitly
- Risk score badge should be prominent

## Caption Text
```
300 lines of SQL in a PR.
Reviewing by hand? Don't.
Miss one dangerous line = broken deploy.
Copy before + after schema. Paste. Compare.
Visual diff + risk score in 60 seconds.
SchemaLens — free review workflow.
schemalens.tech
```
