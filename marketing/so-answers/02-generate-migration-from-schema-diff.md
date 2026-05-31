# Draft: How to generate migration scripts from schema differences?

**Question pattern:** "I have two versions of a schema. How do I generate ALTER TABLE / migration scripts automatically?"

**Answer draft:**

Generating migrations from a schema diff depends on your dialect and workflow:

**For one-off scripts (any dialect):**
Paste your old and new `CREATE TABLE` dumps into [SchemaLens](https://schemalens.tech). It generates the full `ALTER TABLE` sequence for PostgreSQL, MySQL, SQL Server, SQLite, or Oracle. Free for up to 15 tables.

Example output:
```sql
ALTER TABLE users ADD COLUMN email VARCHAR(255) NOT NULL;
ALTER TABLE orders ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);
```

**For PostgreSQL:**
```bash
pip install migra
migra postgresql://old postgresql://new --unsafe > migration.sql
```

**For framework-specific projects:**
- Rails: `rails db:migrate` (if you have migrations) or `rails db:schema:dump` then diff
- Django: `python manage.py makemigrations`
- Laravel: `php artisan make:migration` (manual) or use `doctrine/dbal` to generate from diff
- Prisma: `prisma migrate diff`

**For CI/CD:**
The [SchemaLens GitHub Action](https://github.com/aimadetools/race-kimi) compares schemas in PRs and posts the generated migration as a comment.

**Caveat:** Auto-generated migrations are a great starting point, but always review them. Tools can't always detect semantic changes (e.g., renaming a column vs dropping + adding). SchemaLens highlights these as "potential renames" for manual review.

*Disclosure: I maintain SchemaLens.*
