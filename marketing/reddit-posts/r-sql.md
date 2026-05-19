# r/SQL Post

## Title (choose one)
1. `Free browser-based schema diff for PostgreSQL, MySQL, SQL Server, SQLite, and Oracle`
2. `I made a tool that compares two CREATE TABLE dumps and generates the migration script — 5 dialects`
3. `Schema diff + migration generator that runs in your browser — no install, no account, no data upload`

## Body (Title 2 variant)

Hey r/SQL,

I switch between PostgreSQL at work, MySQL for side projects, and SQLite for local dev. Every time I need to compare schemas, it's the same dance: `pg_dump` vs `mysqldump`, open in a text editor, scroll line by line, manually write `ALTER TABLE`.

I built **SchemaLens** to solve this once:

1. Paste two `CREATE TABLE` dumps (from any of the 5 supported dialects)
2. Get a visual semantic diff — tables, columns, indexes, constraints, foreign keys
3. Copy the generated migration script in your chosen dialect

**Supported dialects:** PostgreSQL, MySQL/MariaDB, SQLite, SQL Server, Oracle

**What it catches:**
- Added/removed tables and columns
- Column type changes, nullability changes, default changes
- Index additions and drops
- Primary key and unique constraint changes
- Foreign key additions/drops
- Breaking change warnings (with explanations)

**Privacy:** Everything runs client-side. Your schemas never leave your browser.

**Free tier:** Up to 15 tables per comparison.
**Pro:** $39 lifetime — unlimited tables, full migration generation, export formats.

There's also a [Schema Design Interview Practice](https://schemalens.tech/tools/schema-design-interviews.html) tool if you're prepping for backend interviews.

What dialect-specific edge cases should I add next?

🔗 [schemalens.tech](https://schemalens.tech)

---

## Follow-up Comment (if asked about Oracle/SQL Server support)

Oracle and SQL Server parsing uses a custom grammar layer on top of `node-sql-parser`. It handles:
- Oracle: `NUMBER(p,s)`, `VARCHAR2`, `CLOB`, tablespaces, sequences
- SQL Server: `NVARCHAR`, `DATETIME2`, `IDENTITY`, `FILESTREAM`, schema-qualified names

If you hit a parsing error, the tool shows the exact line and lets you retry with a simplified syntax. I'm actively expanding coverage based on real-world dumps people share.

---

## Flair
`Resource` or `Discussion`
