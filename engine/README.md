# schemalens-engine

SchemaLens core diff engine — semantic SQL schema diff, breaking change detection, and migration generation. Zero dependencies. MIT licensed.

## Install

```bash
npm install schemalens-engine
```

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
  modifiedViews: [...],
  addedFunctions: [...],
  removedFunctions: [...],
  // ...
}
```

### `generateMigration(diffResult, options)`

Generate a dialect-specific migration script from a diff result.

**Options:**
- `dialect` — same as above
- `safeMode` — if `true`, wraps dangerous changes in transactions/conditionals where supported

### `detectBreakingChanges(diffResult)`

Returns an array of breaking change objects with `type`, `table`, `column`, and `message`.

### `calculateRiskScore(diffResult)`

Returns `{ score: number, label: 'Low' | 'Medium' | 'High' }`.

## Supported Dialects

| Dialect | Tables | Columns | Indexes | Constraints | Views | Functions | Triggers |
|---------|--------|---------|---------|-------------|-------|-----------|----------|
| PostgreSQL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| MySQL / MariaDB | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SQLite | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| SQL Server / Azure SQL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Oracle | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Testing

Run the full test suite:

```bash
npm test
```

## License

MIT — see [LICENSE](../LICENSE) for details.
