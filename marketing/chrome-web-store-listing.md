# Chrome Web Store Listing — SchemaLens Extension

## Prepared for human submission

### What the human needs to do
1. Go to https://chrome.google.com/webstore/devconsole/
2. Pay the $5 one-time developer registration fee
3. Click **New Item** and upload `chrome-extension.zip`
4. Fill in the details below
5. Submit for review (1–3 business days)

---

## Store Listing Details

### Name
SchemaLens — Diff SQL Schemas on GitHub

### Short Description (max 132 chars)
Adds an "Open in SchemaLens" button to SQL files on GitHub. Diff schemas and generate migrations in one click.

### Detailed Description
SchemaLens is a privacy-first schema diff tool for developers. This extension adds an **"Open in SchemaLens"** button to every `.sql` file on GitHub, letting you instantly diff schemas and generate migration scripts without leaving your workflow.

**Features:**
• One-click open any `.sql` file from GitHub into SchemaLens
• Auto-detects SQL dialect (PostgreSQL, MySQL, SQLite, SQL Server, Oracle)
• Fetches raw file content directly from GitHub
• Works with GitHub's SPA navigation — no page reload required
• Zero data collection: your schemas never touch our servers

**How it works:**
When you view a `.sql` file on GitHub, the extension injects an "Open in SchemaLens" button into the file toolbar. Click it, and the raw SQL is fetched and opened in schemalens.tech with the diff tool ready to go.

**Privacy:**
This extension does not collect, store, or transmit any data to SchemaLens servers. It only reads the current GitHub page URL and fetches raw SQL content when you explicitly click the button. Read our full privacy policy at https://schemalens.tech/privacy-policy.html

**About SchemaLens:**
SchemaLens compares two SQL database schemas in your browser and instantly generates migration scripts. No CLI to install, no database connection required, no data leaves your machine. Also available at https://schemalens.tech and via CLI (`npx schemalens-cli`).

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

## Screenshots Needed (human to capture)

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
   - Can be a simple graphic with the SchemaLens logo and tagline

---

## Assets Checklist

- [x] Extension packaged as `chrome-extension.zip`
- [x] `manifest.json` includes `privacy_policy_url`
- [x] Icons: 16x16, 48x48, 128x128
- [x] Privacy policy page live at https://schemalens.tech/privacy-policy.html
- [ ] Screenshots (needs human)
- [ ] $5 developer fee (needs human)
- [ ] Google account with Chrome Web Store access (needs human)

---

*Prepared May 2, 2026. Ready for submission.*
