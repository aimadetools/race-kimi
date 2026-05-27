# SQL Schema Diff CLI — Compare Database Schemas & Generate Migrations

[![npm version](https://img.shields.io/npm/v/schemalens-cli.svg)](https://www.npmjs.com/package/schemalens-cli)
[![npm downloads](https://img.shields.io/npm/dm/schemalens-cli.svg)](https://www.npmjs.com/package/schemalens-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/aimadetools/race-kimi?style=social)](https://github.com/aimadetools/race-kimi)

> Zero-install **SQL schema diff CLI** — compare two SQL schema dumps, get a semantic diff, and generate `ALTER TABLE` migration scripts for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

**SchemaLens CLI** is the fastest way to diff database schemas from your terminal. No Docker, no JVM, no config files — just `npx schemalens-cli diff old.sql new.sql` and you get a colorized report, risk score, breaking-change warnings, and a ready-to-run migration script.

---

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Output Formats](#output-formats)
- [CI/CD Integration](#cicd-integration)
- [Use Cases](#use-cases)
- [Why SchemaLens CLI?](#why-schemalens-cli)
- [Related](#related)
- [License](#license)

---

## Features

- 🔍 **Semantic SQL Schema Diff** — Detects added/removed/renamed tables, columns, indexes, constraints, views, triggers, and functions.
- ⚡ **5 Dialects** — PostgreSQL, MySQL / MariaDB, SQLite, SQL Server / Azure SQL, Oracle.
- 🛡️ **Breaking Change Detection** — Automatic warnings for destructive changes (column drops, type narrowing, NOT NULL additions, index drops, FK removals).
- 📊 **Risk Score** — Every diff gets a 0–100 risk rating so you know if a migration is safe to run.
- 🔄 **Rollback Generation** — Generate reverse `ALTER TABLE` scripts to undo a migration.
- 📄 **4 Output Formats** — Pretty terminal output, JSON, Markdown, and raw SQL.
- 🧪 **CI/CD Ready** — Exit codes for automated pipelines. Fails builds on breaking changes.
- 🚫 **Zero Dependencies** — Single lightweight package. No database connection required.

---

## Install

```bash
# npm
npm install -g schemalens-cli

# yarn
yarn global add schemalens-cli

# pnpm
pnpm add -g schemalens-cli

# bun
bun add -g schemalens-cli

# or run without installing
npx schemalens-cli diff old.sql new.sql
```

> **Package naming note:** The `schemalens` package on npm is a different project (architecture diagrams). The official SchemaLens CLI is **`schemalens-cli`**. After installing, the command is `schemalens` (e.g., `schemalens diff old.sql new.sql`).

---

## Quick Start

```bash
# 1. Diff two schema files
schemalens diff schema-v1.sql schema-v2.sql --dialect postgres

# 2. Generate a migration script
schemalens diff schema-v1.sql schema-v2.sql --format sql --output migration.sql

# 3. Fail CI on breaking changes
export SCHEMALENS_STRICT=1
schemalens diff schema-v1.sql schema-v2.sql --format json
```

---

## Usage

```bash
schemalens diff <old.sql> <new.sql> [options]
```

### Options

| Flag | Description |
|------|-------------|
| `-d, --dialect <dialect>` | SQL dialect: `postgres` (default), `mysql`, `sqlite`, `mssql`, `oracle` |
| `-f, --format <format>` | Output format: `pretty` (default), `json`, `markdown`, `sql` |
| `-o, --output <file>` | Write output to file instead of stdout |
| `--rollback` | Generate rollback migration SQL |
| `-h, --help` | Show help |
| `-v, --version` | Show version |

### Examples

**Pretty-printed diff (default)**
```bash
schemalens diff schema-v1.sql schema-v2.sql --dialect postgres
```

**JSON output (great for CI/CD)**
```bash
schemalens diff schema-v1.sql schema-v2.sql --format json
```

**SQL migration script**
```bash
schemalens diff schema-v1.sql schema-v2.sql --format sql --output migration.sql
```

**Markdown report**
```bash
schemalens diff schema-v1.sql schema-v2.sql --format markdown --output report.md
```

**Read from stdin**
```bash
cat schema-v2.sql | schemalens diff schema-v1.sql - --dialect mysql
```

**Fail on breaking changes (CI mode)**
```bash
export SCHEMALENS_STRICT=1
schemalens diff schema-v1.sql schema-v2.sql --format json
# exits with code 2 if breaking changes are detected
```

**Generate rollback script**
```bash
schemalens diff schema-v1.sql schema-v2.sql --rollback --format sql --output rollback.sql
```

---

## Output Formats

- **pretty** — Colorized terminal output with summary, risk score, breaking changes, and migration preview.
- **json** — Machine-readable JSON with `diff`, `migration`, `breakingChanges`, `riskScore`, and `summary`.
- **sql** — Ready-to-run `ALTER TABLE` / `CREATE TABLE` script.
- **markdown** — Human-readable report for PR descriptions or documentation.

---

## Supported SQL

- `CREATE TABLE` with columns, constraints (PK, FK, UNIQUE, CHECK), and indexes
- `CREATE INDEX` / `CREATE UNIQUE INDEX`
- `CREATE TYPE ... AS ENUM` (PostgreSQL)
- `CREATE VIEW`
- `CREATE TRIGGER`
- `CREATE FUNCTION` / `CREATE PROCEDURE`

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success, no breaking changes |
| 1 | General error (invalid args, file not found, parse error) |
| 2 | Breaking changes detected (only with `SCHEMALENS_STRICT=1`) |

---

## CI/CD Integration

Add SchemaLens to your GitHub Actions workflow to catch schema drift before it hits production:

```yaml
- name: Diff schema changes
  run: |
    npx schemalens-cli diff main-schema.sql pr-schema.sql \
      --dialect postgres --format json > schema-diff.json
  env:
    SCHEMALENS_STRICT: 1
```

See the [SchemaLens GitHub Action](https://schemalens.tech/github-action.html) for a ready-to-use workflow with PR comments.

---

## Use Cases

- **Code Reviews** — Attach a Markdown diff report to your PR so reviewers see exactly what schema changed.
- **Staging → Production Checks** — Export schemas from both environments and diff before deploying.
- **CI/CD Gates** — Fail the build if a PR introduces breaking schema changes.
- **Legacy Database Audits** — Compare a current dump against a known baseline to find drift.
- **Migration Safety** — Generate rollback scripts before running migrations in production.

---

## Why SchemaLens CLI?

| | SchemaLens CLI | Liquibase | Flyway | Prisma Migrate |
|---|----------------|-----------|--------|----------------|
| **Setup** | Zero config | XML/YAML config | Java + config | Schema + client setup |
| **Dependencies** | Node.js only | JVM | JVM | Node.js + Prisma Client |
| **Diff two files** | Native | Via DB snapshot | Via DB snapshot | Via DB shadow |
| **Offline** | ✅ Yes | ❌ Needs DB | ❌ Needs DB | ❌ Needs DB |
| **Breaking detection** | Built-in | Manual checks | Manual checks | Basic |
| **Risk scoring** | Built-in | ❌ | ❌ | ❌ |
| **Rollback generation** | ✅ | Limited | Limited | Migration down |
| **Price** | Free | Freemium | Freemium | Free / Pro team |

SchemaLens CLI is the lightweight choice when you just want to **compare two SQL files** and know if the migration is safe — without spinning up a database or writing config files.

---

## Related

- ⭐ [SchemaLens Web App](https://schemalens.tech) — Visual diff viewer with shareable links, 60+++ micro-tools, and schema design guides
- 📦 [SchemaLens Engine](https://www.npmjs.com/package/schemalens-engine) — Use the diff engine programmatically in your own Node.js projects
- 🖥️ [SchemaLens VS Code Extension](https://marketplace.visualstudio.com/items?itemName=schemalens.schemalens) — Diff SQL files without leaving your editor
- ⚙️ [SchemaLens GitHub Action](https://schemalens.tech/github-action.html) — Catch schema drift in CI/CD
- 🐙 [GitHub Repository](https://github.com/aimadetools/race-kimi) — Star us, open issues, or contribute

## License

MIT
