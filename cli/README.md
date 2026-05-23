# schemalens-cli — SQL Schema Diff & Migration Generator

[![npm version](https://img.shields.io/npm/v/schemalens-cli.svg)](https://www.npmjs.com/package/schemalens-cli)
[![npm downloads](https://img.shields.io/npm/dm/schemalens-cli.svg)](https://www.npmjs.com/package/schemalens-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Zero-install **schema diff CLI** — compare two SQL files, get a semantic diff, and generate `ALTER TABLE` migration scripts for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

**SchemaLens CLI** is the fastest way to diff database schemas from your terminal. No Docker, no JVM, no config files — just `npx schemalens-cli diff old.sql new.sql` and you get a colorized report, risk score, breaking-change warnings, and a ready-to-run migration script.

---

## Features

- 🔍 **Semantic SQL Schema Diff** — Detects added/removed/renamed tables, columns, indexes, constraints, views, triggers, and functions.
- ⚡ **5 Dialects** — PostgreSQL, MySQL / MariaDB, SQLite, SQL Server / Azure SQL, Oracle.
- 🛡️ **Breaking Change Detection** — Automatic warnings for destructive changes (column drops, type narrowing, NOT NULL additions).
- 📊 **Risk Score** — Every diff gets a 0–100 risk rating so you know if a migration is safe to run.
- 🔄 **Rollback Generation** — Generate reverse `ALTER TABLE` scripts to undo a migration.
- 📄 **4 Output Formats** — Pretty terminal output, JSON, Markdown, and raw SQL.
- 🧪 **CI/CD Ready** — Exit codes for automated pipelines. Fails builds on breaking changes.
- 🚫 **Zero Dependencies** — Single lightweight package. No database connection required.

---

## Install

```bash
npm install -g schemalens-cli
# or run without installing
npx schemalens-cli diff old.sql new.sql
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

## Why SchemaLens CLI?

| | SchemaLens CLI | Liquibase | Flyway |
|---|----------------|-----------|--------|
| **Setup** | Zero config | XML/YAML config | Java + config |
| **Dependencies** | Node.js only | JVM | JVM |
| **Diff two files** | Native | Via DB snapshot | Via DB snapshot |
| **Offline** | ✅ Yes | ❌ Needs DB | ❌ Needs DB |
| **Breaking detection** | Built-in | Manual checks | Manual checks |
| **Risk scoring** | Built-in | ❌ | ❌ |
| **Price** | Free | Freemium | Freemium |

SchemaLens CLI is the lightweight choice when you just want to **compare two SQL files** and know if the migration is safe.

---

## Related

- [SchemaLens Web App](https://schemalens.tech) — Visual diff viewer with shareable links, 57+ micro-tools, and schema design guides
- [SchemaLens API](https://schemalens.tech/api.html) — REST API for programmatic diffs
- [SchemaLens VS Code Extension](https://marketplace.visualstudio.com/items?itemName=schemalens.schemalens) — Diff SQL files without leaving your editor
- [SchemaLens GitHub](https://github.com/aimadetools/race-kimi)

## License

MIT
