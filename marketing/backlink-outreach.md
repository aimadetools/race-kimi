# SchemaLens Backlink Outreach Kit

Use these templates to reach out to site owners, blog editors, and tool curators for backlink inclusion.

---

## Target Lists

### Developer Tool Directories
| Site | URL | Angle |
|------|-----|-------|
| tiny-helpers.dev | https://tiny-helpers.dev | SQL Formatter + Validator |
| awesome-selfhosted | https://github.com/awesome-selfhosted/awesome-selfhosted | Self-hosted schema diff |
| alternativeTo | https://alternativeto.net | Schema diff alternative |
| devhunt.org | https://devhunt.org | Developer tool launch |
| libhunt.com | https://www.libhunt.com | Open source schema tools |

### Database & SQL Resource Pages
| Site | URL | Angle |
|------|-----|-------|
| PostgreSQL Wiki | https://wiki.postgresql.org | Schema comparison tools |
| MySQL Documentation | Community links | Migration helper tools |
| DevOps Tool Chest | Various blogs | CI/CD pipeline tools |
| Database Weekly | https://dbweekly.com | Tool mention |

### Newsletter & Blog Outreach
| Newsletter/Blog | Contact Method | Angle |
|-----------------|----------------|-------|
| Console.dev | Console newsletter | Developer tool feature |
| Pointer.io | Pointer newsletter | Database tooling |
| Cooperpress (DB Weekly) | Submit tip | Schema diff in CI/CD |
| TLDR Newsletter | TLDR web dev | Free developer tool |
| Hacker Newsletter | Hacker News digest | Show HN follow-up |

---

## Email Template 1: Resource Page Inclusion

**Subject:** Tool suggestion for your [Topic] resource page — SchemaLens

```
Hi [Name],

I came across your [specific page name] while researching schema migration
workflows — it’s one of the best-curated resource lists I’ve found.

I built SchemaLens (https://schemalens.tech), a free browser-based tool that
diffs database schemas and generates ALTER TABLE migrations for PostgreSQL,
MySQL, SQL Server, SQLite, and Oracle. It’s particularly useful for teams
reviewing schema changes in CI/CD pipelines.

Would you consider adding it to your [page/section name]? I think it would
fit well alongside the other tools you’ve listed.

Happy to provide a longer description, screenshots, or a guest post if helpful.

Best,
[Your name]
SchemaLens — https://schemalens.tech
```

---

## Email Template 2: Guest Post / Tool Roundup Pitch

**Subject:** Guest post idea: How we catch schema migration risks in CI/CD

```
Hi [Name],

I’m a regular reader of [Blog name] — your post on [specific post] helped
us improve our own migration review process.

I recently built SchemaLens (https://schemalens.tech), a free schema diff
tool that runs in the browser and integrates with GitHub Actions / GitLab CI.
We’ve been using it to catch breaking schema changes (dropped columns,
NOT NULL without defaults, missing FK indexes) before they hit production.

Would you be open to a guest post about automating schema review in CI/CD?
I could cover:
- The 5 schema changes most likely to cause production incidents
- A step-by-step GitHub Actions workflow for schema diff gates
- How to fail a build only on breaking changes

I’ve also attached a draft if you’d like to review it first.

Best,
[Your name]
```

---

## Email Template 3: AlternativeTo / Directory Submission

**Subject:** SchemaLens — Free schema diff & migration tool submission

```
Hi [Name / Team],

I’d like to submit SchemaLens (https://schemalens.tech) for inclusion in
your [directory/platform name].

**What it does:**
SchemaLens compares two SQL schemas and generates migration scripts
automatically. It supports PostgreSQL, MySQL, SQL Server, SQLite, and Oracle.

**Key differentiators:**
- 100% browser-based (no data upload required)
- Free for schemas up to 10 tables
- CI/CD integration via standalone CLI script
- Breaking change detection with risk scoring
- Export to Markdown, PDF, SQL, JSON, Prisma, Drizzle

**Pricing:** Free tier + Lifetime Pro ($39 one-time) + Team ($29/mo)

Let me know if you need screenshots, a longer description, or a demo video.

Best,
[Your name]
SchemaLens — https://schemalens.tech
```

---

## Social Media Outreach (Twitter/X, LinkedIn, Reddit)

### Twitter/X Thread Draft
```
We just shipped SchemaLens — a free browser-based schema diff tool.

Paste two CREATE TABLE scripts. Get:
• Semantic diff (not line-by-line)
• Breaking change detection
• ALTER TABLE migration scripts
• 5 SQL dialects

No signup. No data upload.

Try it: https://schemalens.tech

🧵 How we built it in 8 days ↓
```

### Reddit Post Draft (r/PostgreSQL, r/webdev)
```
I built a free browser-based schema diff tool for PostgreSQL, MySQL, SQL
Server, SQLite, and Oracle.

It generates ALTER TABLE migrations automatically and detects breaking
changes (dropped columns, NOT NULL without defaults, narrowed types, etc.).

No signup required — your schema never leaves the browser.

Would love feedback from anyone who reviews DB migrations regularly:
https://schemalens.tech
```

---

## Link Assets for Partners

### Badge HTML (dark)
```html
<a href="https://schemalens.tech" target="_blank" rel="noopener">
  <img src="https://schemalens.tech/badge-dark.svg" alt="SchemaLens — Schema Diff Tool" width="180" height="40">
</a>
```

### Text Link
```html
<a href="https://schemalens.tech">SchemaLens</a> — Free online database schema diff & migration tool.
```

### Description (50 words)
```
SchemaLens is a free browser-based database schema diff tool. Compare two
SQL schemas and generate ALTER TABLE migration scripts for PostgreSQL,
MySQL, SQL Server, SQLite, and Oracle. Includes breaking change detection,
CI/CD integration, and exports to Markdown, PDF, SQL, JSON, Prisma, and
Drizzle.
```

### Description (25 words)
```
SchemaLens diffs database schemas in your browser and generates migration
scripts for PostgreSQL, MySQL, SQL Server, SQLite, and Oracle. No signup
required.
```

---

## Tracking

Track outreach in a simple spreadsheet:

| Site | Contact | Date Sent | Template Used | Response | Link Live | Notes |
|------|---------|-----------|---------------|----------|-----------|-------|
| | | | | | | |

*Update this table as responses come in. Follow up after 7 days if no response.*
