# Dev.to Guest Post — Auto-Generate SQL Data Masking Scripts for GDPR-Compliant Dev Databases

Complete guest post draft formatted for dev.to.

---

## Frontmatter

```yaml
---
title: "Auto-Generate SQL Data Masking Scripts for GDPR-Compliant Dev Databases"
published: false
description: "How to generate UPDATE scripts that anonymize PII in your dev and staging databases — automatically from your schema."
tags: sql, database, gdpr, privacy, postgres, mysql, devops, security
---
```

---

## Body

Every developer has done it: `pg_dump production > dev.sql` and restore it locally. Fast, convenient, and a potential GDPR nightmare.

Production databases contain emails, phone numbers, SSNs, credit cards, and salary data. When you clone that to your laptop or a shared staging environment, you become a data controller with legal obligations. Even if you're a solo developer, a leaked dev database is a reputation killer.

The traditional fix is writing manual `UPDATE` scripts to mask sensitive columns. But that's tedious, error-prone, and easy to forget when the schema changes.

What if you could generate the masking script automatically from your `CREATE TABLE` definitions?

---

### The Problem with Manual Masking

Here's a typical users table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  ssn VARCHAR(11),
  date_of_birth DATE,
  address TEXT,
  salary DECIMAL(10,2),
  ip_address VARCHAR(45),
  api_token VARCHAR(64)
);
```

To mask this manually, you need to write:

```sql
UPDATE users SET email = 'user' || id || '@example.com';
UPDATE users SET first_name = (ARRAY['James','Mary','Robert'])[(id % 3) + 1];
UPDATE users SET last_name = (ARRAY['Smith','Jones','Brown'])[(id % 3) + 1];
UPDATE users SET phone = '+1-555-01' || LPAD(id::text, 4, '0');
UPDATE users SET ssn = '000-00-' || LPAD(id::text, 4, '0');
-- ... and so on for every sensitive column
```

This is boring, repetitive, and fragile. Add a new sensitive column and someone has to remember to update the masking script. Forget once, and your staging database has real customer data.

---

### Pattern Matching to the Rescue

Most PII columns follow predictable naming conventions:

- `email`, `e_mail`, `mail` → fake email
- `phone`, `tel`, `mobile` → fake phone number
- `ssn`, `social_security` → hashed or masked
- `credit_card`, `card_number` → `****-****-****-1234`
- `salary`, `income` → randomized range
- `ip_address`, `ip` → `127.0.0.1`
- `password`, `token`, `secret` → cryptographic hash
- `uuid`, `guid` → new random UUID

By detecting these patterns from the schema alone, you can generate a complete masking script without ever seeing the actual data.

---

### Generated Script Example (PostgreSQL)

Paste your `CREATE TABLE` statements, and you get:

```sql
-- Masking for table: users (10 sensitive columns)
UPDATE users SET email = 'james.smith42@example.com';
UPDATE users SET first_name = 'Mary';
UPDATE users SET last_name = 'Johnson';
UPDATE users SET phone = '+1-312-555-0199';
UPDATE users SET ssn = '482-71-9351';
UPDATE users SET date_of_birth = '1987-03-15';
UPDATE users SET address = '742 Oak Ave, Springfield, CA 90210';
UPDATE users SET salary = '84732.00';
UPDATE users SET ip_address = '10.0.0.1';
UPDATE users SET api_token = ENCODE(DIGEST(GEN_RANDOM_UUID()::TEXT, 'sha256'), 'hex');
```

The script is deterministic enough to run safely and random enough that you can't reverse-engineer the original data.

---

### Dialect-Specific Hashing

Different databases have different crypto functions. A good generator adapts:

| Dialect | UUID Function | Hash Function |
|---------|---------------|---------------|
| PostgreSQL | `GEN_RANDOM_UUID()` | `ENCODE(DIGEST(..., 'sha256'), 'hex')` |
| MySQL | `UUID()` | `SHA2(UUID(), 256)` |
| SQL Server | `NEWID()` | `HASHBYTES('SHA2_256', ...)` |
| Oracle | `SYS_GUID()` | `STANDARD_HASH(..., 'SHA256')` |
| SQLite | fallback string | fallback string |

---

### The Bigger Picture: Schema-Aware DevOps

Data masking is just one example of schema-aware automation. If you can parse `CREATE TABLE`, you can also:

- Generate realistic test data (`email` → fake emails, not `abc123`)
- Convert SQL to ORM schemas (Prisma, Drizzle, TypeORM)
- Detect design issues (missing indexes, reserved words, normalization violations)
- Diff two schema versions and generate safe migrations

The schema is the source of truth. The more tools read it directly, the less manual work falls through the cracks.

---

### Try It

I built a free browser-based tool that does exactly this: paste your schema, get a masking script.

🔗 [SQL Data Masking Generator](https://schemalens.tech/tools/sql-data-masker.html)

No signup. No data leaves your browser. Generated scripts work across PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

If you find a sensitive column pattern it misses, let me know in the comments — I'll add it.

---

*Built in public over 222 days as part of the $100 AI Startup Race. 72 free micro-tools and counting.*
