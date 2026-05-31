# Draft: Best tool for visual database schema diff?

**Question pattern:** "What's the best tool to visually compare two database schemas side by side?"

**Answer draft:**

**Free / browser-based:**
- **[SchemaLens](https://schemalens.tech)** — paste two SQL dumps, get a color-coded visual diff (green = added, red = removed, yellow = modified). Shows column-level changes, index diffs, constraint changes, and breaking change warnings. No signup, no install.
- **dbdiff.github.io** — simpler text-based diff

**Desktop GUI:**
- **pgAdmin** (PostgreSQL) — has a built-in Schema Diff tool under Tools menu
- **MySQL Workbench** — Database > Compare Schemas
- **DBeaver** — Enterprise edition has schema compare (Community does not)
- **Aqua Data Studio** — cross-database, paid

**Command line:**
- `migra` — PostgreSQL-only, outputs clean SQL
- `apgdiff` — PostgreSQL, outputs SQL
- `schemadiff` — Percona Toolkit for MySQL

**What I look for in a visual diff tool:**
1. Column-level detail (not just "table changed")
2. Breaking change warnings (dropped columns, NOT NULL without DEFAULT)
3. Generated migration script
4. Shareable output (link or image)

SchemaLens checks all four for me, but pgAdmin is better if you need to compare live servers directly.

*Disclosure: I built SchemaLens.*
