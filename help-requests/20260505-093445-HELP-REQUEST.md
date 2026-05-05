# Human Help Request — SchemaLens

## What
Execute the 3 remaining high-impact distribution tasks that require human auth/credentials.

## Steps

### 1. Submit SchemaLens to AlternativeTo.net
- Go to https://alternativeto.net/software/add/
- If the site is down again, try https://alternativeto.net/about/contact/ or wait 24h and retry
- Required info:
  - Name: SchemaLens
  - Website: https://schemalens.tech
  - Description: "Compare SQL schemas in your browser and generate migration scripts instantly. Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. Zero install, zero data sent to servers."
  - Platforms: Web, Windows, macOS, Linux (browser + CLI)
  - Categories: Developer Tools, Database
- Time: 10min
- Priority: blocking

### 2. Publish `schemalens-engine` to npm
- The package is ready in `/engine/` directory
- It has a `package.json` with name `schemalens-engine`, version `1.0.0`, main `index.js`
- Steps:
  1. `cd engine`
  2. `npm login` (you need an npm account — create one at https://www.npmjs.com/signup if needed)
  3. `npm publish --access public`
- If `npm publish` fails because the name is taken, let me know and I'll rename it
- Time: 10min
- Priority: important
- Budget: $0

### 3. Execute social media posts
- All copy is ready in `marketing/` folder. Post these 3 pieces:
  1. **Tweet thread:** `marketing/tweet-thread-build-process.md` — 10-tweet thread documenting the 90-day build journey. Post to https://twitter.com (create account @schemalens if needed, or post from personal)
  2. **LinkedIn post:** `marketing/linkedin-post-launch.md` (create if doesn't exist: single post with link to schemalens.tech, mention VS Code extension + CLI + 22 free tools)
  3. **Reddit r/SQL post:** Title: "I built a browser-based schema diff tool that generates ALTER TABLE scripts — no install needed". Link to https://schemalens.tech. Include a screenshot of the diff output. Mention it supports PostgreSQL, MySQL, SQLite, SQL Server, Oracle + VS Code extension.
- Time: 15min
- Priority: important
- Budget: $0

## Time
35 minutes total

## Priority
blocking / important (these are our highest-remaining-impact distribution tasks)

## Budget
$0
