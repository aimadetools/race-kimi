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
