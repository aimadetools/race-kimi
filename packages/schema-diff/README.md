# schema-diff

Compare SQL database schemas and generate migrations from the command line. Zero config, zero dependencies at runtime, and built for CI/CD pipelines.

[![npm version](https://img.shields.io/npm/v/schema-diff.svg)](https://www.npmjs.com/package/schema-diff)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- **5 SQL dialects** — PostgreSQL, MySQL, SQLite, SQL Server, Oracle
- **Breaking change detection** — Catch dropped columns, table removals, and dangerous type changes before they reach production
- **Migration generation** — Generate ready-to-run `ALTER TABLE` scripts
- **Rollback support** — Generate reverse migration scripts
- **CI-native formats** — GitHub Actions annotations, GitLab CI, JUnit XML, JSON, Markdown
- **Risk scoring** — Every diff gets a 0-100 risk score with a severity label

## Install

```bash
npm install -g schema-diff
# or
npx schema-diff old.sql new.sql
```

## Quick Start

```bash
# Basic diff
schema-diff old-schema.sql new-schema.sql

# MySQL dialect with JSON output
schema-diff old.sql new.sql --dialect mysql --format json

# Generate a markdown report
schema-diff old.sql new.sql --format markdown --output report.md

# CI mode — concise, exits with code 1 on breaking changes
schema-diff old.sql new.sql --ci --strict

# Generate rollback SQL
schema-diff old.sql new.sql --rollback --format sql
```

## CI/CD Integration

### GitHub Actions

Add schema diff checks to your pull requests:

```yaml
- name: Schema Diff Check
  run: npx schema-diff base.sql head.sql --dialect postgres --format github --ci --strict
```

Breaking changes will appear as annotations in your PR:

```
::error title=Breaking Change::[DROP_COLUMN] Column 'email' was removed from table 'users'
```

### GitLab CI

```yaml
schema-check:
  script:
    - npx schema-diff base.sql head.sql --dialect mysql --format gitlab --ci --strict
```

### Jenkins / JUnit

```bash
npx schema-diff old.sql new.sql --format junit --output schema-diff.xml
```

Jenkins will parse the JUnit XML and show breaking changes as test failures.

## Output Formats

| Format | Description |
|--------|-------------|
| `pretty` | Human-readable colored output (default) |
| `json` | Machine-readable JSON with full diff structure |
| `markdown` | PR-ready markdown report |
| `sql` | Raw migration SQL |
| `github` | GitHub Actions annotation commands |
| `gitlab` | GitLab CI-compatible output |
| `junit` | JUnit XML for Jenkins and other CI systems |

## CLI Options

```
Options:
  -d, --dialect <dialect>   SQL dialect: postgres | mysql | sqlite | mssql | oracle
  -f, --format <format>     Output format (see table above)
  -o, --output <file>       Write output to file instead of stdout
  --rollback                Generate rollback migration SQL
  --ci                      CI mode: concise, no colors, exit 1 on breaking changes
  --strict                  Exit with code 2 if breaking changes are detected
  -h, --help                Show help
  -v, --version             Show version
```

## Why schema-diff?

Most schema diff tools are either:
- **GUI-only** — requires clicking through a desktop app
- **Framework-locked** — only works with Prisma, Rails, etc.
- **Expensive** — enterprise pricing starts at $300+/year

`schema-diff` is a **universal, zero-config CLI** that works with any SQL `CREATE TABLE` dump from any database or ORM.

## Pro Features

Want a visual diff, shareable links, and advanced migration recipes?

→ **[Try SchemaLens](https://schemalens.tech)** — the browser-based schema diff tool that powers `schema-diff`.

- Visual side-by-side diff with syntax highlighting
- Export to PDF, Markdown, and SQL
- 70+ free database tools
- **Lifetime Pro for $39** — unlimited diffs, full migration generation, and priority support

## License

MIT © [SchemaLens](https://schemalens.tech)
