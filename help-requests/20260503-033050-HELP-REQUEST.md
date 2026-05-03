# Human Help Request — SchemaLens

## What
Execute the Product Hunt launch, Show HN re-post, Chrome Web Store publish, and VS Code Marketplace publish. All materials are pre-written and packaged. This should take 45–60 minutes total.

## Steps

### 1. Product Hunt Launch (10 min)
1. Go to https://www.producthunt.com/posts/new
2. Fill in the form using the exact copy from `marketing/product-hunt-launch.md`:
   - **Name:** SchemaLens
   - **Tagline:** Compare SQL schemas and generate migrations in your browser
   - **Description:** Use the long description from the markdown file
   - **Gallery:** Upload screenshots from `marketing/screenshots/` (5 images)
   - **Thumbnail:** Use `og-image.png`
   - **URL:** https://schemalens.tech
   - **Maker:** Sign as founder
3. Add the special PH discount comment: "Launch week special: 30% off first year with code PH30"
4. Submit and save the post URL

### 2. Show HN Re-post (5 min)
1. Go to https://news.ycombinator.com/submit
2. Title: "Show HN: SchemaLens — Compare SQL schemas and generate migrations in your browser"
3. URL: https://schemalens.tech
4. Text: "I built a zero-install browser tool that diffs database schemas and generates ALTER TABLE scripts. Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. Core engine is open source (MIT). Would love feedback from anyone who writes migrations by hand."
5. Submit

### 3. Chrome Web Store Publish (15 min, $5)
1. Go to https://chrome.google.com/webstore/devconsole/
2. Pay the one-time $5 developer registration fee
3. Click "New Item" and upload `chrome-extension.zip` (already in repo root)
4. Fill in store listing:
   - **Description:** Adds an "Open in SchemaLens" button to SQL files on GitHub. Instantly diff schemas and generate migrations. Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.
   - **Category:** Developer Tools
   - **Language:** English
   - **Privacy:** No data collection — extension runs entirely client-side
5. Submit for review

### 4. VS Code Marketplace Publish (20 min)
1. If you don't have one, create a free Microsoft account at https://account.microsoft.com
2. Go to https://dev.azure.com and create a free organization
3. Create a Personal Access Token at https://dev.azure.com/_usersSettings/tokens:
   - Name: `vsce-publish`
   - Organization: `All accessible organizations`
   - Scopes: `Custom defined` → `Marketplace` → `Manage`
   - Expiration: 1 year
4. In a terminal, run:
   ```bash
   cd /home/race/race-kimi/vscode-extension
   npm install -g vsce
   vsce login schemalens
   # paste the PAT when prompted
   vsce publish
   ```
5. If publisher "schemalens" doesn't exist, create it at https://marketplace.visualstudio.com/manage/publishers/schemalens
6. After publishing, copy the marketplace URL and paste it here so we can update links

### 5. Publish schemalens-engine to npm (2 min)
1. In a terminal, run:
   ```bash
   cd /home/race/race-kimi/engine
   npm login
   npm publish --access public
   ```
   The package is self-contained and ready to publish.
2. After publishing, verify with: `npm view schemalens-engine`

### 6. Republish schemalens-cli to npm (2 min)
The current `schemalens-cli@1.0.0` on npm is broken for global installs (references a file outside the package). This has been fixed.
1. In a terminal, run:
   ```bash
   cd /home/race/race-kimi/cli
   npm login
   npm publish
   ```
   Version is already bumped to `1.0.1`.
2. After publishing, verify with: `npm view schemalens-cli`

## Time
50–65 minutes

## Priority
Blocking — these are our highest-leverage distribution channels and we are in Week 2 with 10 weeks remaining.

## Budget
$5 for Chrome Web Store developer registration fee.
