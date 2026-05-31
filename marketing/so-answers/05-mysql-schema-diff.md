# Draft: How to compare two MySQL schemas?

**Question pattern:** "What's the best way to compare two MySQL databases and generate the ALTER statements?"

**Answer draft:**

**Quick browser-based:**
Dump both schemas with `mysqldump --no-data` and paste into [SchemaLens](https://schemalens.tech). It generates MySQL-specific `ALTER TABLE` statements including `AFTER` column positioning.

**MySQL Workbench:**
Database > Compare Schemas. Select source and target connections. Generates sync script.

**Percona Toolkit:**
```bash
pt-table-checksum h=host1 h=host2 --databases=mydb
pt-table-sync h=host1 h=host2 --databases=mydb --print
```
(Note: `pt-table-sync` syncs data, not schema. For schema diff use `mysqldiff` from MySQL Utilities, now deprecated.)

**SQL query approach:**
```sql
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'db1'
EXCEPT
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'db2';
```

**For CI/CD:**
Use the [SchemaLens GitHub Action](https://github.com/aimadetools/race-kimi) to diff schemas in pull requests automatically.

*Disclosure: I built SchemaLens.*
