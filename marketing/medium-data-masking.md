# Medium Article — How I Stop Worrying About Leaking Production Data to Dev Environments

## Title Options
1. How to Auto-Generate SQL Data Masking Scripts from Your Schema
2. The 30-Second GDPR Fix for Developer Database Clones
3. Stop Leaking Production PII to Your Laptop

## Body

Every developer has a horror story about production data in a dev environment. Maybe it was an intern who `pg_dump`ed the customer database to their laptop. Maybe it was a staging server with real emails that got breached. Maybe it was a screenshot in a PR that accidentally exposed a user's SSN.

The regulation is clear — GDPR Article 32 requires "appropriate technical and organizational measures" to protect personal data. The reality is messier. When you're trying to debug a production issue at 2 AM, you don't think about data protection. You think about getting the dump and fixing the bug.

**The real problem:** Writing masking scripts is tedious, so teams skip it. Until they can't.

---

### The Manual Approach (That Nobody Does)

Here's what a proper masking script looks like for a typical users table:

```sql
UPDATE users SET email = CONCAT('user_', id, '@example.com');
UPDATE users SET phone = '+1-555-0100';
UPDATE users SET ssn = '000-00-0000';
UPDATE users SET salary = FLOOR(RANDOM() * 100000);
UPDATE users SET api_token = ENCODE(DIGEST(GEN_RANDOM_UUID()::TEXT, 'sha256'), 'hex');
```

Then you do the same for orders, customers, employees, leads, and the twelve other tables with PII. Then a developer adds a `credit_card_last4` column and forgets to update the script. Then you're back to square one.

---

### The Schema-First Approach

What if the script generated itself from your CREATE TABLE statements?

Most sensitive columns follow predictable naming conventions:

- `email` → fake email
- `phone` → fake phone
- `ssn` / `social_security` → hashed
- `credit_card` → masked
- `salary` → randomized
- `ip_address` → localhost
- `password` / `token` / `secret` → cryptographic hash
- `uuid` → new UUID

By pattern-matching column names against 30+ known PII patterns, you can generate a complete masking script without ever seeing the actual data. The schema is the source of truth.

---

### Why This Works for Teams

1. **Schema-driven:** When a new sensitive column is added, the next script generation automatically includes it. No human has to remember.

2. **Dialect-aware:** PostgreSQL uses `GEN_RANDOM_UUID()` and `DIGEST`. MySQL uses `UUID()` and `SHA2`. SQL Server uses `NEWID()` and `HASHBYTES`. The generator adapts.

3. **Fast:** Paste schema, copy script, run on your dev database. Thirty seconds.

4. **Free and private:** No account. No data leaves your browser. The generator is a static HTML file.

---

### Try It

I built a free tool that does exactly this. Paste your CREATE TABLE statements, get a masking script for PostgreSQL, MySQL, SQLite, SQL Server, or Oracle.

[SQL Data Masking Generator →](https://schemalens.tech/tools/sql-data-masker.html)

If you find a column pattern it doesn't detect, leave a comment — I'll add it.

---

*Built in public over 222 days. 72 free developer tools and counting.*
