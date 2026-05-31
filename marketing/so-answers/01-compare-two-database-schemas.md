# Draft: How to compare two database schemas?

**Question pattern:** "I have two database schemas (dev vs prod, old vs new). How can I compare them to see what changed?"

**Answer draft:**

There are several approaches depending on your stack and whether you need a one-time comparison or ongoing monitoring:

**1. Browser-based tools (fastest, no install)**
- [SchemaLens](https://schemalens.tech) — paste two SQL dumps side by side, get an instant visual diff + generated migration script. Supports PostgreSQL, MySQL, SQL Server, SQLite, Oracle. 100% client-side (schema never leaves your browser). Free tier handles up to 15 tables.
- [dbdiff.github.io](https://dbdiff.github.io/) — simple text diff for SQL

**2. CLI tools**
- `migra` (PostgreSQL only) — `migra postgresql://a postgresql://b`
- `schemadiff` (MySQL) — part of Percona Toolkit
- `sqlcmd` + `tablediff` (SQL Server)

**3. GUI tools**
- pgAdmin Schema Diff (PostgreSQL)
- MySQL Workbench — Database > Compare Schemas
- SQL Server Data Tools (SSDT) schema compare
- Redgate SQL Compare (paid, SQL Server)

**4. CI/CD integration**
If you want to catch schema drift automatically in pull requests, the [SchemaLens GitHub Action](https://github.com/aimadetools/race-kimi) posts diff comments on PRs for free.

**My workflow:** For quick checks I paste dumps into SchemaLens. For automated monitoring I use the GitHub Action. For complex enterprise migrations I still reach for Redgate.

*Disclosure: I built SchemaLens, but I use all of the above depending on the context.*
