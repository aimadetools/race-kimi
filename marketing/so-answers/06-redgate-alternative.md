# Draft: Free alternative to Redgate SQL Compare?

**Question pattern:** "Is there a free alternative to Redgate SQL Compare for SQL Server schema comparison?"

**Answer draft:**

**For SQL Server specifically:**
- **SSDT Schema Compare** — built into Visual Studio. Free, works well for SQL Server-to-SQL Server comparisons.
- **mssql-scripter + diff** — script both schemas, then use any text diff tool.
- **Azure Data Studio** — has a Schema Compare extension.

**For cross-database (including SQL Server):**
- **[SchemaLens](https://schemalens.tech)** — browser-based, handles SQL Server alongside PostgreSQL, MySQL, SQLite, Oracle. Paste two `CREATE TABLE` scripts, get visual diff + generated migrations. Free tier up to 15 tables.
- **DBeaver Enterprise** — has schema compare, but Enterprise is paid.

**My take:**
Redgate is still the gold standard for complex SQL Server migrations (especially with data compare and deployment). But for routine schema diffs, SSDT is free and good enough. For teams working across multiple database types, a browser-based tool saves everyone from installing 3 different desktop apps.

*Disclosure: I built SchemaLens.*
