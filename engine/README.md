# schemalens-engine — SQL Schema Diff & Migration Engine

[![npm version](https://img.shields.io/npm/v/schemalens-engine.svg)](https://www.npmjs.com/package/schemalens-engine)
[![npm downloads](https://img.shields.io/npm/dm/schemalens-engine.svg)](https://www.npmjs.com/package/schemalens-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/aimadetools/race-kimi?style=social)](https://github.com/aimadetools/race-kimi)

> Zero-dependency **SQL schema diff engine** for Node.js — semantic diff, breaking change detection, risk scoring, and migration generation for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

Use `schemalens-engine` to build your own schema diff tool, CI integration, or migration safety checker on top of a battle-tested parser and diff logic.

---

## Table of Contents

- [Install](#install)
- [Quick Start](#quick-start)
- [API](#api)
- [Use Cases](#use-cases)
- [Related](#related)
- [License](#license)

---

## Install

```bash
npm install schemalens-engine
```

---

## Quick Start

```javascript
const { diffSchemas, generateMigration, detectBreakingChanges, calculateRiskScore } = require('schemalens-engine');

const oldSQL = `CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));`;
const newSQL = `CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255));`;

const result = diffSchemas(oldSQL, newSQL, { dialect: 'postgres' });

console.log('Added tables:', result.addedTables.length);
console.log('Removed tables:', result.removedTables.length);
console.log('Modified tables:', result.modifiedTables.length);

const migration = generateMigration(result, { dialect: 'postgres' });
console.log(migration);

const breaking = detectBreakingChanges(result);
console.log('Breaking changes:', breaking.length);

const risk = calculateRiskScore(result);
console.log('Risk score:', risk.score, risk.label);
```

---

## API

### `diffSchemas(oldSQL, newSQL, options)`

Compare two SQL schema dumps and return a structured diff.

**Options:**
- `dialect` — `'postgres' | 'mysql' | 'sqlite' | 'mssql' | 'oracle' | 'generic'`
- `renameThreshold` — Number 0–1 for rename detection sensitivity (default: 0.6)

**Returns:**
```js
{
  addedTables: [...],
  removedTables: [...],
  modifiedTables: [...],
  addedIndexes: [...],
  removedIndexes: [...],
  addedViews: [...],
  removedViews: [...],
  addedTriggers: [...],
  removedTriggers: [...],
  addedFunctions: [...],
  removedFunctions: [...],
  addedTypes: [...],
  removedTypes: [...]
}
```

### `generateMigration(diffResult, options)`

Generate a ready-to-run migration script from a diff result.

**Options:**
- `dialect` — Same as above
- `rollback` — Boolean. If `true`, generates reverse `ALTER TABLE` scripts.

**Returns:** String containing SQL migration statements.

### `detectBreakingChanges(diffResult)`

Analyze a diff result and return an array of breaking changes with severity and explanation.

**Returns:**
```js
[
  { type: 'column_removed', severity: 'high', message: '...' },
  { type: 'type_narrowed', severity: 'medium', message: '...' }
]
```

### `calculateRiskScore(diffResult)`

Calculate an overall risk score for the schema change.

**Returns:**
```js
{ score: 42, label: 'Medium Risk', color: 'yellow' }
```

---

## Use Cases

- **Custom DevOps Tools** — Build internal CLI tools that gate deployments based on schema risk scores.
- **Migration Safety Dashboards** — Integrate diff results into your team's admin panel or Slack bot.
- **ORM Plugins** — Add schema diff capabilities to your ORM's migration workflow.
- **Database Monitoring** — Periodically diff production vs expected schema to detect drift.

---

## Related

- 🖥️ [SchemaLens CLI](https://www.npmjs.com/package/schemalens-cli) — Ready-to-use terminal interface built on this engine
- 🌐 [SchemaLens Web App](https://schemalens.tech) — Zero-install browser tool with 59++ micro-tools
- ⚙️ [SchemaLens GitHub Action](https://schemalens.tech/github-action.html) — Catch schema drift in CI/CD
- 🐙 [GitHub Repository](https://github.com/aimadetools/race-kimi)

## License

MIT
