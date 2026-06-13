---
title: "How to Add Schema Diff to Any CI/CD Pipeline in 60 Seconds"
published: false
tags: database, devops, githubactions, gitlabci, ci-cd
cover_image: https://schemalens.tech/og-image.png
---

You do not need a paid tool, a database connection, or a weekend of YAML debugging to catch breaking schema changes in your pipeline. You need two schema files and a config that tells your CI platform where to find them.

That is exactly what the [SchemaLens CI/CD Setup Wizard](https://schemalens.tech/tools/cicd-setup-wizard.html) generates. Pick your platform, fill in three fields, and copy a ready-to-commit config into your repo. The whole thing takes about a minute — and if your repo is public on GitHub, the wizard can auto-detect your schema files and SQL dialect.

**Supported platforms:** GitHub Actions, GitLab CI, Jenkins, CircleCI, and Bitbucket Pipelines.

---

## The Problem: Schema Changes Are Invisible in Code Review

Most teams review migration files the same way they review application code: they read the diff, hope they catch the dangerous line, and merge. But a single risky `ALTER TABLE` is easy to miss when it is buried in a 200-line migration.

The result is predictable. A column drops. A foreign key changes. A `NOT NULL` constraint lands without a default. The migration passes in staging because the data is small, then fails — or worse, silently breaks — in production.

The fix is to compare the schema before and after every pull request automatically. Not by hand. Not by squinting at SQL. By a diff engine that flags breaking changes, scores risk, and posts the result where the team already works.

---

## Step 1: Open the CI/CD Setup Wizard

Go to [schemalens.tech/tools/cicd-setup-wizard.html](https://schemalens.tech/tools/cicd-setup-wizard.html).

You will see a form with three sections:

1. **Platform** — GitHub Actions, GitLab CI, Jenkins, CircleCI, or Bitbucket Pipelines.
2. **SQL dialect** — PostgreSQL, MySQL, SQLite, SQL Server, or Oracle.
3. **Schema paths** — where your old/base schema file and new/current schema file live in the repo.

The defaults assume you keep a base schema on your main branch and a current schema in the PR branch. You can change the paths to match your project.

**Tip:** If your repo is public on GitHub, paste the repository URL into the wizard and click **Detect schema files**. It scans the repo, lists every `.sql` file, and guesses the dialect from the file contents. Select a base and current file, click Apply, and the paths and dialect fill themselves in.

---

## Step 2: Choose the Checks You Want

The wizard can enable several CI features with checkboxes:

- **PR comments** — a formatted diff summary posted to the pull request or merge request.
- **Check Runs / status checks** — a native CI check with a risk score, just like your tests.
- **Smart skip** — only run the diff when `.sql` files actually changed.
- **Fail on breaking changes** — block the build if the diff detects a breaking change.
- **Slack / Teams alerts** — notify a channel when drift is detected (Pro/Team feature).

Everything except the alert webhooks works on the free tier. No license key is required to start catching breaking schema changes.

---

## Step 3: Copy the Generated Config

As you change the form, the wizard updates a syntax-highlighted config in real time. For GitHub Actions it looks like this:

```yaml
# .github/workflows/schema-diff.yml
name: Schema Diff
on: [pull_request]

jobs:
  diff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aimadetools/race-kimi@main
        with:
          old-schema-path: ./schema/base.sql
          new-schema-path: ./schema/current.sql
          dialect: postgres
          post-comment: true
          create-check-run: true
          run-only-on-schema-change: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
          fail-on-breaking: true
```

For GitLab CI, Jenkins, CircleCI, or Bitbucket Pipelines the wizard outputs the equivalent syntax for that platform. Same options, different file name.

---

## Step 4: Commit and Open a Test PR

Copy the config into the right file in your repo:

- GitHub Actions → `.github/workflows/schema-diff.yml`
- GitLab CI → `.gitlab-ci.yml`
- Jenkins → `Jenkinsfile`
- CircleCI → `.circleci/config.yml`
- Bitbucket Pipelines → `bitbucket-pipelines.yml`

Commit, push, and open a pull request that touches a `.sql` file. The pipeline runs automatically, compares the two schemas, and posts the result.

---

## What the Result Looks Like

When a developer opens a PR, they see a Check Run or status check like this:

> **SchemaLens Schema Diff** — Risk: Medium (42/100) · Breaking: 1
>
> 1 added, 0 removed, 2 modified tables. 1 breaking change found.

If PR comments are enabled, the same summary appears as a comment. If the build is configured to fail on breaking changes, the PR is blocked until a human reviews it. No one has to remember to run the check. It runs because it is part of the pipeline.

---

## Why This Works for Any Platform

SchemaLens is a file-based diff engine. It does not need to connect to a live database. It reads two SQL files, parses them in the same way regardless of platform, and outputs a report. That means the same core logic works in GitHub Actions, GitLab CI, Jenkins, CircleCI, or Bitbucket Pipelines with only the wrapper syntax changing.

The wizard knows those wrappers, so you do not have to. You answer questions about your project; it answers the YAML plumbing.

---

## When to Add Schema Diff to Your Pipeline

The best time is now, before the next breaking change slips through. But if you need a concrete trigger, add it when:

- You review migration PRs manually today.
- You have more than one environment where schema drift can happen.
- You have ever had a migration pass in staging and fail in production.
- Your team uses Slack or Teams and wants proactive alerts.

The setup cost is one minute. The potential savings are a weekend outage and a post-mortem.

---

## Try It

[⚡ Open the SchemaLens CI/CD Setup Wizard](https://schemalens.tech/tools/cicd-setup-wizard.html)

No signup, no database connection, no credit card. Pick your platform and paste the generated config into your repo.

---

*SchemaLens compares SQL schemas and generates migrations in your browser. Your schema never leaves your machine. [Try the free web diff →](https://schemalens.tech/app.html)*
