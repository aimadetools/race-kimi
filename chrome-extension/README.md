# SchemaLens Chrome Extension

Adds an **"Open in SchemaLens"** button to `.sql` files on GitHub. Click it to instantly open the file in [SchemaLens](https://schemalens.tech) and start diffing.

## Features

- 🚀 One-click open any `.sql` file from GitHub into SchemaLens
- 🔍 Auto-detects SQL dialect (PostgreSQL, MySQL, SQLite, SQL Server, Oracle) from file path and content
- 🔒 Fetches raw file content directly from `raw.githubusercontent.com`
- ⚡ Works with GitHub's SPA navigation (no page reload required)

## Install (Developer Mode)

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select this `chrome-extension` folder
5. Visit any `.sql` file on GitHub (e.g., `https://github.com/owner/repo/blob/main/schema.sql`)
6. Look for the **Open in SchemaLens** button in the file header toolbar

## Publish to Chrome Web Store (for maintainers)

1. Zip the `chrome-extension` folder (keep internal structure)
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Pay the $5 developer registration fee (one-time)
4. Click **New Item** and upload the zip
5. Fill in store listing:
   - **Description:** One-click schema diff for GitHub SQL files. Open any `.sql` file in SchemaLens to compare schemas and generate migrations.
   - **Category:** Developer Tools
   - **Screenshots:** Capture the button on a GitHub SQL file page
6. Submit for review (usually 1–3 business days)

## How It Works

1. The content script monitors GitHub pages for `.sql` blob URLs
2. When detected, it injects an "Open in SchemaLens" button into the file header
3. On click, it fetches the raw SQL from `raw.githubusercontent.com`
4. The content is base64-encoded into a SchemaLens share URL
5. A new tab opens at `schemalens.tech/app.html#diff=<payload>` with the file pre-loaded

## Permissions

- `activeTab` — to read the current GitHub page URL
- `https://github.com/*` — to inject the button on GitHub pages
- `https://raw.githubusercontent.com/*` — to fetch raw SQL file content

## Notes

- **Public repos:** Works out of the box
- **Private repos:** The extension fetches via `raw.githubusercontent.com`, which requires authentication. For private repos, users need to be logged into GitHub in the same browser session (cookies are sent automatically). If that fails, they can copy-paste the SQL manually.

## License

MIT — same as SchemaLens core.
