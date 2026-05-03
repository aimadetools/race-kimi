# Community Feedback

Real users and developers have left feedback on your product. Read carefully and consider acting on it.


## Reddit r/PostgreSQL post engagement - First 2 hours

- Views: 1,100
- Upvotes: 3 (100% upvote ratio)
- Comments: 7
- Shares: 4

This is real traction from a targeted developer community. These users are your exact target audience.
## Reddit r/PostgreSQL feedback - April 30, 2026

### Q: How does it handle renames vs drop+add?
**Our reply:** It currently treats renames as drop+add since it compares two static schema snapshots. There is no way to infer intent from just the before/after state. If you need rename detection, you would annotate that manually in the generated migration. This is a known limitation of any diff-based approach vs migration-first tools like Sqitch.

**Action:** Consider adding rename detection heuristic. Same type + similar name = likely rename. Would differentiate from competitors.

### Q: What if I removed a column from a table, and that column is used in a view? Will the script generate the diff commands in the correct order?
**Our reply:** Currently it generates ALTER TABLE statements but does not track view dependencies. If you drop a column used in a view, the script will not automatically handle the view. You would need to manually drop/recreate the view. Column ordering in views is not enforced. It only cares about structural differences like types, constraints, and defaults, not column order.

**Action:** View dependency tracking is a high-value feature. Add to premium backlog.

### Q: But why? The migration already contains the changes.
**Our reply:** Fair point if you are already using a migration framework. This is more useful when you do not have migrations. Comparing production vs staging schemas, auditing drift between environments, or reviewing schema changes when you only have the DDL dumps. Not a replacement for migrations, more of a complement.

**Action:** Consider adding this positioning to the landing page and README. The when-to-use-SchemaLens messaging could be clearer.

### Q: Um liquibase? No need to use a browser. Still generates HTML reports.
**Our reply:** Liquibase is great for teams already using it in their CI/CD pipeline. SchemaLens fills a different niche: quick browser-based comparisons when you just have two DDL dumps and want to see what changed without setting up a tool chain. Different tools for different moments.

**Action:** Add a "SchemaLens vs Liquibase" comparison page. Clarify positioning: SchemaLens is for quick ad-hoc comparisons, Liquibase is for managed migration lifecycles. Consider adding this to the landing page FAQ.

### Q (follow-up): Liquibase has a diff tool for exactly this. One command. Supports 60+ DBs. Does drift auditing, DDL generation, dynamic flows.
**Our reply:** Acknowledged. The main difference is zero setup: SchemaLens runs in the browser with no install, no config, no CLI. Paste two CREATE TABLE blocks and get a visual diff in seconds. For quick one-off comparisons it is faster, but Liquibase covers far more ground for teams that already have it.

**Action:** HIGH PRIORITY. Build a SchemaLens vs Liquibase comparison page. Position clearly: SchemaLens = instant browser-based ad-hoc diffs, Liquibase = full migration lifecycle management. Do not compete on features, compete on speed and zero-setup. Consider adding Liquibase to the comparison pages alongside CLI tools.

### Q (follow-up 2): Liquibase is a single curl + add to path. 20 years of history. Devs trust CLI over a vibe-coded web app doing glorified text compares. Plus: is the diff about the DDL text or the actual database objects?
**Context:** This is a trust and positioning challenge. The commenter sees SchemaLens as a toy compared to Liquibase. The "vibe-coded" label is damaging.

**Action items:**
1. CRITICAL: The "vibe-coded" perception is a real risk. Consider adding a "How it works" or "About" section explaining the parser, diff engine, and architecture. Show it is engineered, not vibe-coded.
2. The CLI vs browser debate is real. Your CLI tool (schemalens-cli on npm) is the answer to this. Promote it more prominently. Developers who prefer CLI can use npx schemalens-cli.
3. The DDL text vs database object question is important. SchemaLens compares DDL text (CREATE TABLE statements). Liquibase can connect to live databases and compare actual objects. This is a fundamental limitation to be honest about.
4. Trust: 20 years of Liquibase history vs a new tool. The only way to build trust is time, adoption, and transparency. Open-source the diff engine if possible.

### Feedback from PH viewer (May 3, 2026)
**Source:** Email to hello@schemalens.tech

> Hey, saw SchemaLens on Product Hunt. Cool idea. I tried pasting two Postgres schemas and the diff worked fine, but I was hoping it would catch column type changes too (e.g. varchar(255) to text). Does it handle that? Also, any plans for MySQL support? We are mostly a MySQL shop.

**Action items:**
1. Verify column type change detection works correctly. If not, this is a bug.
2. MySQL support is a real demand signal. Consider adding it to the roadmap.
