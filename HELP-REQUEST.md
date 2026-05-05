# HELP-REQUEST.md — SchemaLens Distribution Execution

## What
Execute the Product Hunt launch for SchemaLens this week (ideally Tuesday or Wednesday). All assets are prepared — this is a matter of creating the PH account, uploading images, and posting.

## Steps (Estimated time: 45 minutes)

### 1. Create Product Hunt Account (5 min)
- Go to https://www.producthunt.com/ and sign up with a Google account
- Fill out maker profile with name, photo, and short bio
- Verify email

### 2. Request to Hunt SchemaLens (5 min)
- Go to https://www.producthunt.com/posts/new
- Search for "SchemaLens" — if it doesn't exist, create a new post
- If it requires an invite to post, request one from Product Hunt support or find a hunter on Twitter/X

### 3. Upload Gallery Images (10 min)
- **You need 3-5 screenshots at 1270×760 pixels**
- Use these pre-prepared screenshots from `marketing/screenshots/` or capture new ones:
  1. **Hero screenshot**: Open https://schemalens.tech/app.html in Chrome at 1280×800. Paste the sample schemas, capture the Visual Diff tab.
  2. **Migration SQL tab**: Same session, click Migration SQL tab, capture.
  3. **Share/Export**: Click Export Markdown or Share, capture.
  4. **Dialects collage**: Use `marketing/screenshots/` if available, or create a simple graphic listing PostgreSQL, MySQL, SQLite, SQL Server, Oracle.
  5. **Privacy promise**: Simple text graphic: "Your schemas never leave your browser" + lock icon.
- Upload all 5 to the Product Hunt gallery

### 4. Fill Product Page (10 min)
Copy and paste from `marketing/product-hunt-launch.md`:
- **Tagline**: "Compare SQL schemas in your browser. Generate migrations instantly."
- **Short description**: "Compare SQL schemas and generate migrations in your browser."
- **Long description**: Copy from the "Long Description" section in `marketing/product-hunt-launch.md`
- **Topics**: Developer Tools, PostgreSQL, MySQL, SQLite, SQL Server, Database, Productivity, Open Source, Privacy, SaaS
- **Pricing**: Free / Pro $12/mo
- **Offer for PH**: $19 for first year (better than the old 30% off — use this instead)

### 5. Post the Maker Comment (5 min)
- Copy the "Maker Comment" from `marketing/product-hunt-launch.md`
- Update the "17 free micro-tools" line to "24 free micro-tools"
- Post this as the first comment immediately after the post goes live

### 6. Launch Timing (5 min)
- **Best day**: Tuesday or Wednesday
- **Best time**: 00:01 Pacific Time (first minute of the day)
- Schedule the post to go live at that time, or manually post then

### 7. Cross-Post Same Day (5 min)
- Post "Show HN" on Hacker News 2-3 hours after PH goes live
  - Title: "Show HN: SchemaLens — Browser-based SQL schema diff and migration generator"
  - Link: https://schemalens.tech
  - Text: "I built a zero-install schema diff tool that runs entirely in the browser. Paste two CREATE TABLE dumps, get a visual semantic diff + ALTER TABLE migration scripts. Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. Also available as CLI: npx schemalens-cli. Would love feedback on the migration output accuracy!"

## Time: 45 minutes
## Priority: BLOCKING — This is the single highest-leverage action for driving traffic and getting our first sales
## Budget: $0

## Context
- We have built an extremely mature product (24 micro-tools, VS Code extension, CLI, GitHub Action, 50+ SEO pages) but have **ZERO sales** after 92 days because we have no distribution.
- Product Hunt can drive 5,000+ visits in 24 hours. This is our best shot at breaking out of the build loop and getting real users.
- All marketing copy, screenshots guidance, and FAQ templates are pre-written in `marketing/product-hunt-launch.md`.
