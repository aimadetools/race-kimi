# Tweet Thread — SchemaLens vs CLI Tools: When to Use Each

Copy and paste these tweets one by one. Post as a thread (reply to previous tweet).

Best time to post: Tuesday–Thursday, 9–11am ET.

---

**Tweet 1/6**

"Why use a browser tool when migra/apgdiff/schemalex exists?"

Fair question. I use both. Here's when each wins ↓

---

**Tweet 2/6**

Use a CLI tool when:
• You're in your terminal already
• You need to diff live databases (not just DDL dumps)
• You're scripting a CI/CD pipeline
• You want to diff 60+ dialects (Liquibase territory)

CLI tools are power tools. They assume setup.

---

**Tweet 3/6**

Use a browser tool when:
• Someone Slack'd you two schema dumps and asked "what changed?"
• You're on a machine without the toolchain installed
• You need to share the diff with a non-technical stakeholder
• You want a visual side-by-side comparison
• You can't upload schemas to a third-party server (compliance)

---

**Tweet 4/6**

The real difference is setup time.

CLI: install package → configure connection → run command → read terminal output

Browser: paste schema A → paste schema B → see diff in 10 seconds

For one-off comparisons, 10 seconds beats 10 minutes every time.

---

**Tweet 5/6**

The good news: you don't have to choose.

SchemaLens runs in your browser AND has a CLI:

```bash
npx schemalens-cli diff old.sql new.sql --dialect postgres
```

Same custom parser. Same semantic diff engine. Same privacy (runs locally).

---

**Tweet 6/6**

I built SchemaLens because I kept needing quick schema diffs and didn't want to install a toolchain every time.

Try the browser version (no signup):
→ https://schemalens.tech

Or run it locally:
→ https://schemalens.tech/cli

5 dialects. Zero setup. Your schema never leaves your machine.

Feedback welcome 🙏
