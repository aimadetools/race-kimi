# schemalens-cli

> CLI for SchemaLens — compare SQL schemas and generate migrations locally.

Zero-install schema diffing from your terminal. Parse two SQL files, get a semantic diff, and generate `ALTER TABLE` migration scripts in PostgreSQL, MySQL, SQLite, SQL Server, or Oracle dialects.

## Install

```bash
npm install -g schemalens-cli
# or use npx (no install)
npx schemalens-cli diff old.sql new.sql
```

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

## Output Formats

- **pretty** — Colorized terminal output with summary, risk score, breaking changes, and migration preview.
- **json** — Machine-readable JSON with `diff`, `migration`, `breakingChanges`, `riskScore`, and `summary`.
- **sql** — Ready-to-run `ALTER TABLE` / `CREATE TABLE` script.
- **markdown** — Human-readable report for PR descriptions or documentation.

## Supported SQL

- `CREATE TABLE` with columns, constraints (PK, FK, UNIQUE, CHECK), and indexes
- `CREATE INDEX` / `CREATE UNIQUE INDEX`
- `CREATE TYPE ... AS ENUM` (PostgreSQL)
- `CREATE VIEW`
- `CREATE TRIGGER`
- `CREATE FUNCTION` / `CREATE PROCEDURE`

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success, no breaking changes |
| 1 | General error (invalid args, file not found, parse error) |
| 2 | Breaking changes detected (only with `SCHEMALENS_STRICT=1`) |

## Related

- [SchemaLens Web App](https://schemalens.tech) — Visual diff viewer with shareable links
- [SchemaLens API](https://schemalens.tech/api.html) — REST API for programmatic diffs
- [SchemaLens GitHub](https://github.com/jochenboele/schemalens)

## License

MIT
