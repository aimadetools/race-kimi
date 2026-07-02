# SchemaLens MCP Server — Directory Submission Kit

Use this kit to submit the SchemaLens MCP Server to MCP registries, directories, and discovery sites.

## Primary URL to promote

- **Landing page:** https://schemalens.tech/mcp-server.html
- **Source file:** https://github.com/aimadetools/race-kimi/blob/main/mcp-server.js
- **Repository:** https://github.com/aimadetools/race-kimi

---

## One-Liner Pitch

> Connect SchemaLens to Claude, Cursor, or VS Code and diff SQL schemas, generate migrations, and detect breaking changes inside your AI assistant.

---

## Short Descriptions (copy/paste by length)

### 50 characters
MCP server for SQL schema diff and migration generation.

### 80 characters
Diff SQL schemas and generate migrations inside Claude or Cursor via MCP. Free, local.

### 120 characters
SchemaLens MCP server adds schema diff, migration generation, and breaking-change detection to any MCP-compatible AI assistant.

### 160 characters
Connect SchemaLens to Claude Desktop, Cursor, or VS Code. Diff database schemas, generate forward/rollback migrations, and detect breaking changes from chat.

### 200 characters
SchemaLens MCP Server exposes three tools — schema diff, migration generation, and breaking-change detection — to any MCP client. Runs locally with the SchemaLens engine; no schemas leave your machine.

---

## Long Description

SchemaLens is a free, privacy-first SQL schema diff tool. The SchemaLens MCP Server brings that power into Claude Desktop, Cursor, VS Code, and any other MCP-compatible client.

Expose three tools to your AI assistant:

- **schemalens_diff_schemas** — compare two SQL schemas and get a semantic summary (added/removed/modified tables, columns, indexes, constraints) plus a 0-100 risk score.
- **schemalens_generate_migration** — generate forward and rollback migration SQL in PostgreSQL, MySQL, SQLite, SQL Server, or Oracle dialects.
- **schemalens_detect_breaking_changes** — list breaking changes with severity labels (dropped columns/tables, type changes, NOT NULL additions, etc.).

All computation runs locally via the SchemaLens engine. No API keys, no network calls, no schema uploads.

---

## Tags / Keywords

mcp, model-context-protocol, schema-diff, database, sql, migration, claude, cursor, vscode, postgresql, mysql, sqlite, sql-server, oracle, breaking-changes, ai-assistant

---

## Directories

### mcp.so (free — GitHub issue submission)

**URL:** https://github.com/alexander-zuev/mcp-server/issues/new

**Title:** Submit SchemaLens MCP Server

**Body:**
```
Name: SchemaLens MCP Server
Repository: https://github.com/aimadetools/race-kimi
Source: https://github.com/aimadetools/race-kimi/blob/main/mcp-server.js
Website: https://schemalens.tech/mcp-server.html
Description: Connect SchemaLens to Claude, Cursor, or VS Code to diff SQL schemas, generate migrations, and detect breaking changes inside your AI assistant. Runs locally.
Transport: stdio
Tools: schemalens_diff_schemas, schemalens_generate_migration, schemalens_detect_breaking_changes
Tags: mcp, schema-diff, database, migration, claude, cursor, postgresql, mysql, sqlite, sql-server, oracle
```

**Status:** Requires creating an issue on an external repo. Per HELP-RESPONSES guidance, do not submit from an automated account without explicit approval.

---

### MCP Market (mcpmarket.com)

**URL:** https://mcpmarket.com/submit

**Repo URL:** https://github.com/aimadetools/race-kimi
**Try Now link:** https://schemalens.tech/mcp-server.html

**Options:**
- Free Queue ($0): 4-6 week listing time, no badge, no try-now link.
- Paid ($29 one-time): listed within 24 hours, official badge, try-now link allowed.

**Status:** Form requires an email address for notification. No SchemaLens email is configured; do not use a personal email. Hold until an email address is available or budget decision is made.

---

### Smithery

**URL:** https://smithery.ai/
**Docs:** https://github.com/smithery-ai/cli

**Command:**
```bash
npx smithery@latest mcp publish https://schemalens.tech/mcp-server.html -n aimadetools/schemalens
```

**Status:** Requires Smithery account/login and a hosted endpoint or bundle. The SchemaLens MCP Server is stdio-only and runs locally. Evaluate converting to a hosted SSE server or bundling before submitting. Blocked pending account and hosting decision.

---

### Glama

**URL:** https://glama.ai/mcp/servers

**Action:** Glama crawls GitHub and may already index the repo. Search for "schemalens" or "race-kimi" and claim the listing.

**Status:** Passive discovery only; no active submission required.

---

### PulseMCP

**URL:** https://pulsemcp.com/

**Action:** PulseMCP crawls GitHub and the MCP Registry. Ensure the repo has clear MCP-related keywords in README and description.

**Status:** Passive discovery only; no active submission required.

---

## Internal Promotion Checklist

- [x] Landing page published: https://schemalens.tech/mcp-server.html
- [x] Linked from tools.html
- [x] Linked from api-guide.html
- [x] Mentioned in README.md
- [x] Added to sitemap.xml
- [x] Added to e2e page-load tests
- [ ] Submitted to mcp.so (blocked: external GitHub issue)
- [ ] Submitted to mcpmarket.com (blocked: no email)
- [ ] Submitted to Smithery (blocked: stdio-only, needs account)
- [ ] Claimed on Glama/PulseMCP if indexed (passive)

---

## Notes

- The MCP Server is stdio-only by design for privacy. Hosted directory submissions may require an SSE/WebSocket transport; evaluate cost/benefit before building one.
- Do not create issues on external repos from the automated account without human approval.
