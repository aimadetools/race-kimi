# SchemaLens Open Source Sponsorship — Outreach Targets

## Program
Free SchemaLens Team for qualifying open-source projects that add SchemaLens to their CI/CD pipeline, README, or documentation.

- Landing page: `https://schemalens.tech/open-source-sponsorship.html`
- Sponsors wall: `https://schemalens.tech/open-source-sponsors.html`
- Application endpoint: `POST https://schemalens.tech/api/oss-sponsorship-apply`
- GitHub issue template: `https://github.com/aimadetools/race-kimi/issues/new?template=sponsorship-application.yml`

## Target Criteria
- OSI-approved license
- Public Git repository with activity in the last 6 months
- Uses SQL schemas (Postgres, MySQL, SQLite, SQL Server, etc.)
- Willing to add a SchemaLens badge, GitHub Action, or docs link
- Not a direct commercial competitor

---

## Targets (10 projects)

### 1. sqlc
- **Repo:** https://github.com/sqlc-dev/sqlc
- **License:** MIT
- **Why they fit:** Generates type-safe Go from SQL. Their repo contains thousands of SQL files and schema examples. A SchemaLens GitHub Action would catch schema drift in their test fixtures and examples.
- **Maintainer contact:** GitHub issues / discussions
- **Personalized outreach angle:** "You already validate SQL at code-generation time. SchemaLens adds a visual diff + migration SQL review on every PR that touches your test schemas."

### 2. dbmate
- **Repo:** https://github.com/amacneil/dbmate
- **License:** MIT
- **Why they fit:** Lightweight, framework-independent database migration tool. Their users care deeply about schema changes in version control.
- **Maintainer contact:** GitHub issues
- **Personalized outreach angle:** "dbmate runs migrations; SchemaLens shows what changed before the migration runs. A perfect pairing for your README's 'migrations' section."

### 3. golang-migrate
- **Repo:** https://github.com/golang-migrate/migrate
- **License:** MIT
- **Why they fit:** The most widely used Go migration library. Maintainer audience is exactly database-schema-conscious engineers.
- **Maintainer contact:** GitHub issues
- **Personalized outreach angle:** "Help your contributors see the net schema effect of a migration sequence without running the CLI."

### 4. goose
- **Repo:** https://github.com/pressly/goose
- **License:** MIT / Apache-2.0 (BSD-3-Clause portions)
- **Why they fit:** Popular Go migration tool with active development and SQL dialect support.
- **Maintainer contact:** GitHub issues / discussions
- **Personalized outreach angle:** "Add a schema-diff check to your CI so every migration PR is reviewed with a visual diff and risk score."

### 5. Kysely
- **Repo:** https://github.com/kysely-org/kysely
- **License:** MIT
- **Why they fit:** Type-safe SQL query builder for TypeScript. They publish dialect packages and examples with schemas.
- **Maintainer contact:** GitHub issues / Discord
- **Personalized outreach angle:** "Type-check your queries and diff your schemas — give Kysely users a complete schema-review workflow."

### 6. PostgREST
- **Repo:** https://github.com/PostgREST/postgrest
- **License:** MIT
- **Why they fit:** Turns a PostgreSQL database into a REST API. Schema changes directly impact their API surface.
- **Maintainer contact:** GitHub issues / discussions
- **Personalized outreach angle:** "SchemaLens can diff your test schemas and highlight changes that affect the REST contract your users rely on."

### 7. pgTAP
- **Repo:** https://github.com/theory/pgtap
- **License:** PostgreSQL License (OSI-approved)
- **Why they fit:** Unit testing framework for PostgreSQL. Database testing and schema review are natural companions.
- **Maintainer contact:** GitHub issues
- **Personalized outreach angle:** "You test Postgres behavior; SchemaLens reviews the shape of the schema itself. A great addition to your testing docs."

### 8. Dolt
- **Repo:** https://github.com/dolthub/dolt
- **License:** Apache-2.0
- **Why they fit:** Git for data. While they version tables, SchemaLens can diff SQL schema exports from their Go SQL engine.
- **Maintainer contact:** GitHub issues / discussions
- **Personalized outreach angle:** "Dolt diffs data; SchemaLens diffs SQL schemas. Show maintainers a side-by-side schema diff for Dolt's SQL export format."

### 9. Datasette
- **Repo:** https://github.com/simonw/datasette
- **License:** Apache-2.0
- **Why they fit:** Tool for exploring and publishing SQLite databases. Simon Willison's projects often adopt useful dev tools and badges.
- **Maintainer contact:** GitHub issues
- **Personalized outreach angle:** "Datasette makes SQLite data explorable; SchemaLens makes its schema changes reviewable in PRs."

### 10. pgRouting
- **Repo:** https://github.com/pgRouting/pgrouting
- **License:** GPL-2.0
- **Why they fit:** PostgreSQL routing extension with complex SQL schemas and active community.
- **Maintainer contact:** GitHub issues / mailing list
- **Personalized outreach angle:** "Spatial/routing schemas are complex. SchemaLens helps contributors understand schema changes without running PostGIS locally."

---

## Outreach Message Template (per project)

**Subject:** Free schema-diff CI for [Project Name]

Hi [Maintainer Name / Team],

I came across [Project Name] while researching open-source projects that manage SQL schemas in version control. I built SchemaLens (https://schemalens.tech), a free browser-based schema diff tool with a GitHub Action that comments human-readable schema diffs on pull requests.

We run an open-source sponsorship program: qualifying projects get SchemaLens Team (PR diff comments, breaking-change gates, Slack/Teams alerts, unlimited seats) completely free. The only ask is a SchemaLens badge or mention in the README/docs.

I think [Project Name] would be a great fit because [specific reason from table above].

Apply here: https://schemalens.tech/open-source-sponsorship.html

Or open a sponsorship issue directly: https://github.com/aimadetools/race-kimi/issues/new?template=sponsorship-application.yml

Best regards,
SchemaLens team

---

## Follow-Up Template

**Subject:** Re: Free schema-diff CI for [Project Name]

Hi [Maintainer Name],

Just following up on my note about free SchemaLens Team access for [Project Name].

If schema review in PRs isn't a priority right now, no worries. The program stays open and we review applications within 2 business days.

Apply: https://schemalens.tech/open-source-sponsorship.html

Best,
SchemaLens team

---

## Social / Community Post Template

If you're maintaining an open-source project with SQL schemas, you can get SchemaLens Team (schema diff in PRs, breaking-change gates, Slack alerts) completely free.

Apply: https://schemalens.tech/open-source-sponsorship.html

No credit card. Just add a badge or mention SchemaLens in your docs.

---

## README Badge Markdown

```markdown
[![Schema Health](https://schemalens.tech/api/schema-badge?url=YOUR_RAW_SCHEMA_URL)](https://schemalens.tech)
```

Replace `YOUR_RAW_SCHEMA_URL` with a link to your raw `schema.sql` file on GitHub.

## GitHub Action Quick Config

```yaml
name: Schema Diff
on:
  pull_request:
    paths:
      - '**/*.sql'
jobs:
  schema-diff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aimadetools/race-kimi@v1
        with:
          base-schema: './schema/base.sql'
          current-schema: './schema/current.sql'
          dialect: 'postgres'
```

---

## Anti-Spam Rules
- Do NOT create unsolicited issues or PRs on target repos.
- Use existing discussions, Discord, or maintainer contact pages where appropriate.
- Focus on making the badge and Action genuinely useful.
- Track all outreach in the Leads & Outreach CRM in admin.html.
