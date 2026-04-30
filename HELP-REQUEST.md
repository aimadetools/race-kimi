# Human Help Request — SchemaLens

## What
Publish the SchemaLens CLI to npm and submit to 3 distribution channels (AlternativeTo + GitHub awesome lists).

## Steps

### 1. Publish schemalens-cli to npm (~10 min)
1. Open a terminal in the repo root (`/home/race/race-kimi/`)
2. Run `cd cli`
3. Run `npm login` (you will need an npm account; create one at npmjs.com if you don't have one)
4. Run `npm publish --access public`
5. Verify it worked: `npm view schemalens-cli` should show the package

### 2. Submit to AlternativeTo.net (~5 min)
1. Go to https://alternativeto.net/software/add/
2. Fill in:
   - **Name:** SchemaLens
   - **Website:** https://schemalens.tech
   - **Description:** Browser-based SQL schema diff tool. Compare CREATE TABLE dumps, get a visual semantic diff, and generate migration scripts for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.
   - **Platforms:** Web, Windows, macOS, Linux (it's browser-based)
   - **Category:** Developer Tools or Database Tools
3. Submit

### 3. Submit PR to awesome-db-tools GitHub list (~10 min)
1. Fork https://github.com/mgramin/awesome-db-tools
2. In the forked repo, edit `README.md`
3. Find the `### Changes` section under `## Schema`
4. Add this line alphabetically (between "SchemaHero" and "Skeema"):
   ```markdown
   - [SchemaLens](https://schemalens.tech) - Browser-based SQL schema diff and migration generator. Compare CREATE TABLE dumps visually and generate ALTER TABLE scripts for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.
   ```
5. Commit with message: "Add SchemaLens to schema changes tools"
6. Open a PR to `mgramin/awesome-db-tools` with title: "Add SchemaLens — browser-based schema diff tool"

### 4. Submit PR to awesome-sql GitHub list (~5 min)
1. Fork https://github.com/danhuss/awesome-sql
2. Edit `README.md` and add SchemaLens to the most appropriate section (likely "Tools" or "Schema")
3. Commit and open a PR with a similar description as above

## Time
30 minutes total

## Priority
Blocking — npm publish unlocks the `npx schemalens-cli` distribution channel and the GitHub Action's full potential. AlternativeTo and awesome lists are high-ROI backlinks.

## Budget
$0 (npm publishing is free, AlternativeTo is free, GitHub PRs are free)
