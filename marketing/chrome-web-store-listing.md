# Chrome Web Store Listing — SchemaLens Extension (Optimized)

## Store Listing Details

### Name
SchemaLens — SQL Schema Diff for GitHub

### Short Description (max 132 chars)
One-click schema diff for SQL files on GitHub. Detect breaking changes & generate migrations for PostgreSQL, MySQL, SQLite, SQL Server, Oracle.

### Detailed Description
SchemaLens is a privacy-first SQL schema diff tool for developers. This extension adds an **"Open in SchemaLens"** button to every `.sql` file on GitHub, letting you instantly diff schemas, detect breaking changes, and generate migration scripts — all without leaving your workflow.

**What you can do:**
• Open any `.sql` file from GitHub into SchemaLens with one click
• Auto-detects SQL dialect (PostgreSQL, MySQL, SQLite, SQL Server, Oracle)
• See exactly what changed between two schemas with color-coded visual diffs
• Get warned about breaking changes before you deploy
• Generate dialect-correct ALTER TABLE migration scripts
• Copy diff summaries as Markdown for PR descriptions

**Privacy-first by design:**
This extension does not collect, store, or transmit any data to SchemaLens servers. It only reads the current GitHub page URL and fetches raw SQL content when you explicitly click the button. Your schema structure never touches our servers — it parses entirely in your browser.

**How it works:**
When you view a `.sql` file on GitHub, the extension injects an "Open in SchemaLens" button into the file toolbar. Click it, and the raw SQL is fetched and opened in schemalens.tech with the diff tool ready to go.

**Also available:**
• Web app: https://schemalens.tech
• VS Code Extension: https://schemalens.tech/vscode-extension.html
• CLI: `npx schemalens-cli`
• GitHub Action: https://schemalens.tech/github-action.html

### Category
Developer Tools

### Language
English

### Website
https://schemalens.tech

### Support URL
https://schemalens.tech

### Privacy Policy
https://schemalens.tech/privacy-policy.html

### Price
Free

### Distribution
Public (listed in the Chrome Web Store)

---

## Screenshots Needed (human to capture on update)

1. **Screenshot 1 — Button on GitHub:**
   - Visit https://github.com/aimadetools/race-kimi/blob/main/supabase-schema.sql
   - Capture the "Open in SchemaLens" button in the file header toolbar
   - Size: 1280x800 or 640x400

2. **Screenshot 2 — SchemaLens diff view:**
   - After clicking the button, capture the SchemaLens app with the schema loaded
   - Show the visual diff or migration output
   - Size: 1280x800 or 640x400

3. **Screenshot 3 — Small promo tile (optional):**
   - Size: 440x280
   - Simple graphic with the SchemaLens logo and tagline

---

## Assets Checklist

- [x] Extension packaged as `chrome-extension.zip`
- [x] `manifest.json` includes `privacy_policy_url`
- [x] Icons: 16x16, 48x48, 128x128
- [x] Privacy policy page live at https://schemalens.tech/privacy-policy.html
- [ ] Screenshots (needs human)
- [x] $5 developer fee (paid)
- [x] Google account with Chrome Web Store access (configured)

---

*Optimized May 26, 2026. Version 1.0.1.*
