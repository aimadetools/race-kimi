# r/MySQL Post

## Title (choose one)
1. `I made a tool that generates ALTER TABLE scripts from two mysqldump outputs — free, no signup`
2. `Stop writing ALTER TABLE by hand: browser-based schema diff for MySQL/MariaDB`
3. `Schema diff + migration generator for MySQL — compare two dumps, get the exact ALTER statements`

## Body (Title 2 variant)

Hey r/MySQL,

I maintain a legacy PHP app with 80+ tables and no migration history. Every deploy is a manual `mysqldump` diff in a text editor, hoping I don't miss a `NOT NULL` constraint or an index change.

I got tired of it and built **SchemaLens** — a browser-based schema diff tool that compares two `mysqldump` outputs and generates the exact `ALTER TABLE`, `CREATE INDEX`, and `DROP` statements to get from schema A to schema B.

**What it handles:**
- Column additions, removals, type changes, default changes, nullability
- Index additions and drops (including composite indexes)
- Primary key and unique constraint changes
- Foreign key additions/drops
- Breaking change warnings (e.g., dropping a column with data, removing a NOT NULL)

**MySQL/MariaDB specifics:**
- Generates `ALTER TABLE ... ALGORITHM=INPLACE, LOCK=NONE` where safe
- Warns about `VARCHAR` reductions that trigger table rebuilds
- Detects `AUTO_INCREMENT` changes
- Supports both `mysqldump` and hand-written `CREATE TABLE` syntax

Free for up to 15 tables. $39 lifetime for unlimited.

No account. No data leaves your browser.

Would appreciate feedback from anyone dealing with messy legacy schemas.

🔗 [schemalens.tech](https://schemalens.tech)

---

## Follow-up Comment (if asked about safety)

The tool flags potentially dangerous changes with a "breaking change" label:
- Dropping columns or tables
- Reducing VARCHAR length
- Removing NOT NULL without a default
- Dropping indexes that might be used by queries
- Changing column types with potential data loss

You still review the generated SQL before running it, but it catches the things I used to miss at 2am before a deploy.

---

## Flair
`Tool` or `Discussion`
