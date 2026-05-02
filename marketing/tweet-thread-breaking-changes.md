# Tweet Thread — 5 Breaking Schema Changes That Should Never Reach Production

Copy and paste these tweets one by one. Post as a thread (reply to previous tweet).

Best time to post: Tuesday–Thursday, 9–11am ET.

---

**Tweet 1/7**

I caught these 5 breaking changes in code review last month.

Any one of them would have caused a production incident.

Here's what to watch for ↓

---

**Tweet 2/7**

Breaking change 1: Dropping a column the app still reads.

```sql
ALTER TABLE users DROP COLUMN legacy_id;
```

Looks safe. The migration passes CI.

But a background job still references `legacy_id`. Production crashes when the job runs.

Always grep your entire codebase before dropping.

---

**Tweet 3/7**

Breaking change 2: Renaming a column without updating all queries.

```sql
ALTER TABLE orders RENAME COLUMN total TO amount;
```

ORM queries, raw SQL in reports, analytics pipelines, and third-party integrations all break.

A semantic diff flags this instantly. A text diff might not.

---

**Tweet 4/7**

Breaking change 3: Narrowing a VARCHAR that truncates existing data.

```sql
ALTER TABLE products ALTER COLUMN description TYPE VARCHAR(500);
```

Migration succeeds. Data is silently corrupted.

Run `SELECT MAX(LENGTH(description))` before narrowing any type.

---

**Tweet 5/7**

Breaking change 4: Adding a foreign key without an index.

```sql
ALTER TABLE orders ADD CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id);
```

PostgreSQL locks both tables while it validates. Writes block. Timeouts cascade.

Add the index first. Then add the FK with `NOT VALID` → `VALIDATE CONSTRAINT`.

---

**Tweet 6/7**

Breaking change 5: Dropping a table that a view depends on.

```sql
DROP TABLE old_events;
```

The migration passes. The view `monthly_event_summary` fails on the next SELECT.

View dependency tracking should be part of every schema review.

---

**Tweet 7/7**

The pattern: breaking changes look safe in isolation.

They're only dangerous when you consider the whole system — views, jobs, queries, integrations.

That's why I built SchemaLens to detect them automatically:

→ https://schemalens.tech

Paste two schemas. See breaking changes highlighted in red. Get a safe migration script.

Ship with confidence.
