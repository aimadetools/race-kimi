# schemalens-diff-cli

[![npm version](https://img.shields.io/npm/v/schemalens-diff-cli.svg)](https://www.npmjs.com/package/schemalens-diff-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> The official SchemaLens CLI — compare SQL schemas and generate migrations in your terminal.

## Install

```bash
# Run without installing
npx schemalens-diff-cli diff old.sql new.sql

# Install globally
npm install -g schemalens-diff-cli

# Or use in a project
npm install --save-dev schemalens-diff-cli
```

## Usage

```bash
schemalens diff <old.sql> <new.sql> [options]
```

## Features

- 🔍 **Semantic SQL Schema Diff** — tables, columns, indexes, constraints, views, triggers
- ⚡ **5 Dialects** — PostgreSQL, MySQL / MariaDB, SQLite, SQL Server, Oracle
- 🛡️ **Breaking Change Detection** — automatic warnings for destructive changes
- 📊 **Risk Score** — 0–100 rating for every diff
- 🔄 **Rollback Generation** — reverse ALTER TABLE scripts
- 📄 **4 Output Formats** — terminal, JSON, Markdown, raw SQL
- 🧪 **CI/CD Ready** — exit codes for automated pipelines

## Web App

Prefer a GUI? Try the free browser-based tool at **[schemalens.tech](https://schemalens.tech)** — no signup, no data leaves your device.

## Documentation

Full CLI documentation: [https://schemalens.tech/cli/](https://schemalens.tech/cli/)

## License

MIT © SchemaLens
