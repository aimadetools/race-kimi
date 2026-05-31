# Draft: How to diff two PostgreSQL schemas?

**Question pattern:** "How can I compare two PostgreSQL schemas and see the differences?"

**Answer draft:**

**Option 1: Browser-based (no install)**
Export both schemas with `pg_dump --schema-only` and paste them into [SchemaLens](https://schemalens.tech). It highlights table additions, column changes, index diffs, and constraint changes. Generates `ALTER TABLE` scripts you can run directly.

**Option 2: CLI with migra**
```bash
pip install migra
migra postgresql://old_db postgresql://new_db --unsafe
```

**Option 3: pgAdmin Schema Diff**
Tools > Schema Diff. Select source and target databases. Shows object-level differences and generates synchronization scripts.

**Option 4: SQL query (DIY)**
```sql
-- Compare columns
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
EXCEPT
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public';
```

**For CI/CD:**
The [SchemaLens GitHub Action](https://github.com/aimadetools/race-kimi) can diff schemas in PRs and post the result as a comment.

*Disclosure: I built SchemaLens.*
