# Draft: How to generate ALTER TABLE statements from two CREATE TABLE scripts?

**Question pattern:** "I have the old CREATE TABLE and the new CREATE TABLE. How do I generate the ALTER TABLE statements to migrate?"

**Answer draft:**

**The fastest way:**
Paste both `CREATE TABLE` statements into [SchemaLens](https://schemalens.tech). It generates the exact `ALTER TABLE` sequence for your dialect.

Example:
```sql
-- Old
CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255));

-- New
CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) NOT NULL);
```

Output:
```sql
ALTER TABLE users ADD COLUMN email VARCHAR(255) NOT NULL;
```

**Other approaches:**

**PostgreSQL:**
```bash
pip install migra
migra postgresql://old postgresql://new --unsafe
```

**MySQL:**
MySQL Workbench can reverse-engineer and compare, but for just two CREATE statements, a browser tool is faster.

**Framework-specific:**
- Rails: `rails db:migrate` (if migrations exist)
- Django: `python manage.py makemigrations`
- Prisma: `prisma migrate diff`

**Manual approach:**
Diff the two `CREATE TABLE` statements line by line, then write `ALTER TABLE` for each change. Tedious but works for simple changes.

*Disclosure: I built SchemaLens.*
