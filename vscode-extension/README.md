# SchemaLens for VS Code — SQL Schema Diff & Migration Generator

[![VS Code Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/schemalens.schemalens)](https://marketplace.visualstudio.com/items?itemName=schemalens.schemalens)
[![VS Code Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/schemalens.schemalens)](https://marketplace.visualstudio.com/items?itemName=schemalens.schemalens)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Compare SQL schemas and generate migrations without leaving VS Code. Open the [SchemaLens](https://schemalens.tech) **SQL schema diff tool** directly from your editor. Diff two `.sql` files in seconds — no upload, no setup, no database connection required.

## Features

- 🚀 **Open SchemaLens** — Launch the browser-based diff tool in one keystroke (`Cmd/Ctrl + Shift + P` → "SchemaLens: Open SchemaLens").
- 🔍 **Diff Active SQL Files** — Compare the two open `.sql` files instantly. SchemaLens auto-detects your SQL dialect and generates a shareable diff URL.
- 🛡️ **Privacy First** — Your SQL never leaves your machine. The extension generates a local URL hash; SchemaLens runs entirely client-side in your browser.
- ⚡ **Zero Config** — No database connection, no login, no setup. Works offline after the first page load.
- 📊 **Breaking Change Detection** — See destructive changes (column drops, type narrowing, NOT NULL additions) highlighted before you deploy.
- 🔄 **Migration Generation** — Get ready-to-run `ALTER TABLE` scripts for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

## Usage

### Command Palette

| Command | What it does |
|---------|-------------|
| `SchemaLens: Open SchemaLens` | Opens https://schemalens.tech/app.html in your default browser. |
| `SchemaLens: Diff Active SQL Files` | Reads the two active `.sql` editors, encodes them, and opens SchemaLens with both schemas pre-filled. |

### Right-click a SQL file

Right-click any `.sql` file in the editor tab and choose **"Diff Active SQL Files"**.

## Use Cases

- **Migration Reviews** — Before running a migration, diff your old and new schema files to see exactly what changes and catch breaking modifications.
- **PR Prep** — Generate a Markdown diff report from two SQL files to attach to your pull request description.
- **Staging vs Production** — Export schemas from both environments, save as `.sql` files, and diff them locally to spot drift.
- **Learning SQL** — Use SchemaLens's built-in schema design patterns and 60+++ micro-tools to level up your database skills.

## Dialect Detection

The extension guesses the SQL dialect from your file name:

| File name contains | Dialect |
|-------------------|---------|
| `mysql`, `mariadb` | MySQL |
| `sqlite` | SQLite |
| `mssql`, `sqlserver` | SQL Server |
| `oracle` | Oracle |
| anything else | PostgreSQL |

You can always change the dialect inside SchemaLens after the page loads.

## How it works

The extension encodes your SQL using the same base64 format as SchemaLens's native Share button. Everything stays local — your schemas are never uploaded to a server. The generated URL is processed entirely in your browser.

## Requirements

- VS Code 1.74+
- A default web browser

## Related

- 🌐 [SchemaLens Web App](https://schemalens.tech) — 60+++ free SQL tools, schema design patterns, and migration guides
- 📦 [SchemaLens CLI](https://www.npmjs.com/package/schemalens-cli) — Diff schemas from your terminal
- ⚙️ [SchemaLens GitHub Action](https://schemalens.tech/github-action.html) — Catch schema drift in CI/CD
- 🐙 [GitHub Repository](https://github.com/aimadetools/race-kimi)

## License

MIT
