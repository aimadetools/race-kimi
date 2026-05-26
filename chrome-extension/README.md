# SchemaLens Chrome Extension

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/jbigkphlkggibnnbfdlkhcjpedjchgde?label=Chrome%20Web%20Store)](https://chromewebstore.google.com/detail/jbigkphlkggibnnbfdlkhcjpedjchgde)
[![SchemaLens](https://img.shields.io/badge/Website-schemalens.tech-6366f1)](https://schemalens.tech)

Add an **"Open in SchemaLens"** button to every `.sql` file on GitHub. Click it to instantly diff schemas, detect breaking changes, and generate migration SQL — without leaving your workflow.

## 🚀 Features

- **One-click schema diff** — Open any `.sql` file from GitHub directly in [SchemaLens](https://schemalens.tech)
- **Auto-detects SQL dialect** — PostgreSQL, MySQL, SQLite, SQL Server, and Oracle
- **Breaking change detection** — See exactly what changed and whether it's safe to deploy
- **Zero backend** — Your schema never touches a server. Everything parses client-side.
- **SPA-aware** — Works with GitHub's dynamic navigation (no page reload needed)

## 🔒 Privacy

This extension does not collect, store, or transmit any data to SchemaLens servers. It only reads the current GitHub page URL and fetches raw SQL content when you explicitly click the button. Read our full [privacy policy](https://schemalens.tech/privacy-policy.html).

## 📦 Install

**From Chrome Web Store:**
[Install SchemaLens Extension →](https://chromewebstore.google.com/detail/jbigkphlkggibnnbfdlkhcjpedjchgde)

**Developer mode (latest):**
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select this `chrome-extension` folder
5. Visit any `.sql` file on GitHub (e.g., `https://github.com/owner/repo/blob/main/schema.sql`)
6. Look for the **Open in SchemaLens** button in the file header toolbar

## 🛠 How It Works

1. The content script monitors GitHub pages for `.sql` blob URLs
2. When detected, it injects an "Open in SchemaLens" button into the file header
3. On click, it fetches the raw SQL from `raw.githubusercontent.com`
4. The content is base64-encoded into a SchemaLens share URL with auto-detected dialect
5. A new tab opens at `schemalens.tech/app.html#diff=<payload>` with the file pre-loaded

## 🌐 Permissions

- `activeTab` — to read the current GitHub page URL
- `https://github.com/*` — to inject the button on GitHub pages
- `https://raw.githubusercontent.com/*` — to fetch raw SQL file content

## 📝 Notes

- **Public repos:** Works out of the box
- **Private repos:** The extension fetches via `raw.githubusercontent.com`, which requires authentication. For private repos, users need to be logged into GitHub in the same browser session (cookies are sent automatically). If that fails, copy-paste the SQL manually into [schemalens.tech](https://schemalens.tech).

## 🔗 Related

- [SchemaLens Web App](https://schemalens.tech)
- [VS Code Extension](https://schemalens.tech/vscode-extension.html)
- [CLI (`npx schemalens-cli`)](https://www.npmjs.com/package/schemalens-cli)
- [GitHub Action](https://schemalens.tech/github-action.html)

## License

MIT — same as SchemaLens core.
