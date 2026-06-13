# SchemaLens Open Source Sponsorship Outreach Kit

## Goal
Get qualifying open-source database projects to apply for free SchemaLens Team access. In exchange, they add a SchemaLens badge, GitHub Action, or docs link — creating backlinks, brand awareness, and real CI/CD usage.

## Landing Page
`https://schemalens.tech/open-source-sponsorship.html`

## Application Endpoint
`POST https://schemalens.tech/api/oss-sponsorship-apply`

## Who Qualifies
- OSI-approved open-source license (MIT, Apache-2.0, GPL, BSD, etc.)
- Public Git repository with activity in the last 6 months
- Uses SQL schemas (PostgreSQL, MySQL, SQLite, SQL Server, etc.)
- Willing to add a SchemaLens badge, GitHub Action, or docs link
- Non-commercial core (open-core is OK if the OSS part is substantial)

## Target Project Criteria
Look for projects with:
- 50+ GitHub stars
- Active issue/PR activity
- A `schema.sql`, `migrations/`, or `db/` directory
- Database-related tooling (ORMs, admin panels, backends, CMSs)
- Clear maintainer contact (email in profile or issue template)

## Outreach Channels (Autonomous — No Human Posting Required)
1. **Add to SaaS / tool directories** that have an "open source" or "developer tools" category.
2. **GitHub repo topics** — Search `topic:postgresql topic:schema` etc. and star/engage authentically. Do NOT spam issues.
3. **README badge program** — Make the badge so useful that maintainers add it organically.
4. **Blog / case study** — Publish a post: "How [Project] Uses SchemaLens to Review Schema Changes in PRs" once one project signs up.
5. **Newsletter mention** — If you have a newsletter, mention the program.

## Email Template 1 — Direct Maintainer Outreach

Subject: Free schema-diff CI for [Project Name]

Hi [Name],

I came across [Project Name] while looking for open-source projects that manage SQL schemas in version control. I built SchemaLens (https://schemalens.tech), a browser-based schema diff tool with a free GitHub Action that comments schema diffs on PRs.

We're giving free Team access to qualifying open-source projects. That means your maintainers get:
- PR schema diff comments
- Breaking-change gates
- Slack/Teams alerts
- Unlimited team seats

No credit card or commitment required. The only ask is that you add a SchemaLens badge or mention in your README/migration docs.

Apply here: https://schemalens.tech/open-source-sponsorship.html

I'd love to hear if this would be useful for [Project Name].

Best,
[Your name]
SchemaLens

## Email Template 2 — Follow-Up (1 Week Later)

Subject: Re: Free schema-diff CI for [Project Name]

Hi [Name],

Just following up on my note about free SchemaLens Team access for [Project Name].

If schema review in PRs isn't a priority right now, no worries — but if it is, the program is open and we review applications within 2 business days.

Apply: https://schemalens.tech/open-source-sponsorship.html

Best,
[Your name]

## Social / Community Post Template (For Use Where Permitted)

If you're maintaining an open-source project with SQL schemas, you can now get SchemaLens Team (schema diff in PRs, breaking-change gates, Slack alerts) completely free.

Apply: https://schemalens.tech/open-source-sponsorship.html

No credit card. Just add a badge or mention SchemaLens in your docs.

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

See full docs: https://schemalens.tech/github-action.html

## Metrics to Track
- Applications submitted via `/api/oss-sponsorship-apply`
- Approved projects
- Badges/Actions added
- Referral traffic from project READMEs
- Team sign-ups that originate from the OSS page

## Notes
- Do NOT create unsolicited issues or PRs on target repos. This is spam and will backfire.
- Focus on making the badge and Action genuinely useful so maintainers adopt them organically.
- Consider reaching out personally to 1-2 maintainers you already have a relationship with first.
