# Changelog Generator

Beautiful static changelogs from Markdown files. Part of [Changelog.page](https://changelog.page).

## Quick Start

```bash
# Clone or download this generator
cd generator

# Install dependencies
npm install

# Add your changelog entries to content/
# Format: YYYY-MM-DD-title.md with YAML frontmatter

# Build your changelog
npm run build

# Preview locally
npm run serve
```

## Content Format

Create Markdown files in the `content/` directory:

```markdown
---
title: "Your Update Title"
date: 2026-04-07
category: Feature
tags: [api, new-feature]
author: Your Name
---

Your changelog content here in **Markdown**.
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Entry title |
| `date` | No | Publication date (also extracted from filename) |
| `category` | No | Feature, Improvement, Fix, Announcement |
| `tags` | No | Array of tag strings |
| `author` | No | Author name |
| `image` | No | Featured image URL |
| `github_release` | No | Associated GitHub release tag |
| `prerelease` | No | Boolean indicating if this is a prerelease |
| `auto_generated` | No | Boolean indicating auto-generated entry |

## Themes

Three beautiful themes included:

- **minimal** — Clean, typography-focused (default)
- **cards** — Visual, card-based layout
- **timeline** — Vertical timeline layout

Set theme via environment variable:

```bash
THEME=cards npm run build
```

## Configuration

Use environment variables to customize:

| Variable | Default | Description |
|----------|---------|-------------|
| `SITE_NAME` | "Changelog" | Your changelog title |
| `SITE_URL` | "" | Your site URL (for feeds) |
| `THEME` | "minimal" | Theme name |
| `CONTENT_DIR` | "./content" | Path to markdown files |
| `OUTPUT_DIR` | "./dist" | Build output directory |
| `GITHUB_REPO` | "" | Fetch releases from GitHub (format: owner/repo) |
| `GITHUB_INCLUDE_PRERELEASES` | "true" | Include prereleases when using GITHUB_REPO |
| `GITHUB_RELEASES_LIMIT` | "50" | Max releases to fetch from GitHub |
| `ENABLE_ANALYTICS` | "false" | Enable client-side analytics tracking |
| `SLACK_WEBHOOK_URL` | "" | Slack incoming webhook URL for notifications |
| `DISCORD_WEBHOOK_URL` | "" | Discord webhook URL for notifications |

## Analytics

Track changelog engagement with built-in, privacy-friendly analytics. No external services required - all data stays in the visitor's browser.

### Enable Analytics

```bash
ENABLE_ANALYTICS=true npm run build
```

### What Gets Tracked

- **Page Views** - Total and unique visitors
- **Entry Engagement** - Which changelog entries are most popular
- **Click Tracking** - Entry clicks, tag clicks, external link clicks
- **Traffic Sources** - Referrer domains
- **Time-based Stats** - Daily, weekly, monthly breakdowns

### View Analytics Dashboard

After enabling analytics and deploying, visit `/analytics.html` on your changelog to view:

- Overview stats (total views, unique visitors, today's views)
- Traffic chart (7/30/90 day views)
- Most popular entries
- Traffic sources
- Data export (JSON)

### Privacy

- All data stored locally in visitor's browser (localStorage)
- No cookies used
- No external tracking scripts
- No personal data collected
- Fully GDPR-compliant

## Private Entries

Password-protect specific changelog entries. Perfect for beta announcements, internal updates, or early access content.

### Create a Private Entry

Add `private: true` and a `password` to your entry's frontmatter:

```markdown
---
title: "Beta Feature Preview"
date: 2026-04-09
category: Feature
private: true
password: beta2026
---

This content is password protected...
```

### How It Works

1. **Build time**: Content is encrypted and embedded in the HTML
2. **Visitor experience**: Sees a password prompt instead of content
3. **Authentication**: Password decrypts content client-side
4. **Session**: Remembers authentication for browser session

### Security Notes

⚠️ **Important**: This provides casual privacy, not cryptographic security.

- Content is obfuscated, not truly encrypted
- Determined users could extract the password
- Suitable for: beta announcements, early access, casual privacy
- Not suitable for: confidential data, sensitive information

### Private Entry Features

- 🔒 Password prompt page with custom styling
- 🏷️ "Private" badge shown in entry list
- 🔐 Session-based authentication (no repeat passwords)
- 👁️ Toggle password visibility
- 📱 Responsive design

## Scheduled Posts

Write changelog entries now, publish them automatically later. Perfect for planning product launches and maintaining a consistent publishing schedule.

### Creating a Scheduled Entry

Set a future date in your entry's frontmatter:

```markdown
---
title: "Big Feature Launch"
date: 2026-04-20
category: Feature
tags: [launch, new-feature]
---

This entry won't appear until April 20, 2026...
```

Or use a future date in the filename:

```
content/
  2026-04-20-big-feature-launch.md
```

### How It Works

1. **Future dates are filtered** — At build time, entries with dates in the future are excluded from the output
2. **Automatic publishing** — When your next build runs on or after the scheduled date, the entry appears
3. **Set up scheduled builds** — Use GitHub Actions or similar to run daily builds for automatic publishing

### Setting Up Automatic Publishing

Add a scheduled workflow to automatically publish entries:

```yaml
# .github/workflows/scheduled-build.yml
name: Daily Scheduled Build

on:
  schedule:
    - cron: '0 9 * * *'  # Daily at 9 AM UTC
  workflow_dispatch:      # Allow manual trigger

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      # Add your deployment step here
```

### Best Practices

- **Use frontmatter dates** — Explicit dates ensure consistent behavior even if filenames change
- **Schedule daily builds** — Once per day is sufficient for most changelogs
- **Buffer time for review** — Schedule entries a few hours after you expect to finish writing
- **Preview before scheduling** — Run a local build to verify formatting before committing

## GitHub Integration

### Sync from GitHub Releases

Automatically generate changelog entries from your GitHub releases:

```bash
# Build with GitHub releases integration
GITHUB_REPO=owner/repo npm run build

# Exclude prereleases
GITHUB_REPO=owner/repo GITHUB_INCLUDE_PRERELEASES=false npm run build

# Limit to last 20 releases
GITHUB_REPO=owner/repo GITHUB_RELEASES_LIMIT=20 npm run build
```

This will:
- Fetch releases from the GitHub API
- Convert each release to a changelog entry
- Auto-categorize based on version number (Major/Feature/Patch/Prerelease)
- Extract tags from release body (#tag format)
- Add links back to GitHub releases

### Auto-Generate from GitHub Releases (GitHub Action)

Use the included workflow to automatically sync changelog when you publish releases:

1. Copy `.github/workflows/releases-to-changelog.yml` to your repository
2. The workflow triggers on every release publish/edit
3. It creates/updates changelog entries in the `content/` directory
4. Commits changes and redeploys your site

**Setup:**

```yaml
# .github/workflows/changelog.yml
name: Deploy Changelog

on:
  release:
    types: [published]

jobs:
  sync-releases:
    uses: changelogpage/generator/.github/workflows/releases-to-changelog.yml@main
```

### Auto-Generate from Commits (GitHub Action)

Automatically create changelog entries from your commit history:

1. Copy `.github/workflows/commits-to-changelog.yml` to your repository
2. Set `USE_CONVENTIONAL_COMMITS=true` in repository variables (optional, uses conventional commits format)
3. The workflow runs on every push to main/master
4. Groups commits by date and category

**Commit Categorization:**

If using conventional commits:
- `feat:` → Feature
- `fix:` → Fix
- `docs:` → Documentation
- `refactor:` → Improvement
- `perf:` → Performance
- `test:` → Testing
- `chore:` → Chore
- `ci:` → CI/CD
- `build:` → Build

Fallback categorization by keywords:
- "fix", "bug", "patch" → Fix
- "feat", "add", "new" → Feature
- "doc", "readme" → Documentation
- "perf", "speed" → Performance
- "security", "vuln" → Security

## Webhook Notifications

Automatically notify Slack or Discord channels when new changelog entries are published. Perfect for keeping your team and community updated.

### Setup

Configure webhook URLs via environment variables:

```bash
# Slack webhook
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ npm run build

# Discord webhook
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/XXX/YYY npm run build

# Both
SLACK_WEBHOOK_URL=... DISCORD_WEBHOOK_URL=... npm run build
```

### Getting Webhook URLs

**Slack:**
1. Go to your Slack workspace settings
2. Navigate to Apps → Incoming Webhooks
3. Add to Slack → Choose channel
4. Copy the webhook URL

**Discord:**
1. Open channel settings in your Discord server
2. Integrations → Webhooks
3. New Webhook → Choose channel
4. Copy the webhook URL

### Notification Features

**Slack notifications include:**
- Header with category emoji
- Site name and entry date
- Truncated content preview (500 chars)
- Tags as context elements
- "View Entry" button linking to the entry

**Discord notifications include:**
- Rich embed with color-coded category
- Entry description (600 chars)
- Timestamp and footer with site name
- Author and tags fields
- Direct link to entry

### Category Colors & Emojis

| Category | Emoji | Discord Color |
|----------|-------|---------------|
| Feature | ✨ | Indigo |
| Fix/Bug | 🐛 | Amber |
| Security | 🔒 | Red |
| Performance | ⚡ | Cyan |
| Release | 🚀 | Green |
| Breaking | 💥 | Dark Red |

### How It Works

1. **Build-time detection**: During each build, the generator compares entries against a state file
2. **New entry detection**: Only entries not previously notified are sent
3. **Deduplication**: A `.webhook-state.json` file tracks notified entries
4. **Rate limiting**: State file keeps last 100 entries to prevent bloat

### GitHub Actions with Webhooks

Add webhook URLs as repository secrets:

```yaml
# .github/workflows/deploy.yml
- name: Build changelog
  run: npm run build
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
    DISCORD_WEBHOOK_URL: ${{ secrets.DISCORD_WEBHOOK_URL }}
    SITE_NAME: "My Product"
    SITE_URL: "https://changelog.example.com"
```

## GitHub Actions Auto-Deploy

The included workflow automatically deploys when you push changes to the `content/` directory.

### Setup

1. Push this generator to a GitHub repository
2. Enable GitHub Pages (Settings → Pages → GitHub Actions)
3. Your changelog will deploy on every content push

### Custom Domain (Vercel)

For custom domains with Vercel:

1. Add `VERCEL_DEPLOY=true` to repository variables
2. Add Vercel credentials to repository secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

## Output

The generator produces:

- `index.html` — Main changelog page
- `[slug].html` — Individual entry pages
- `rss.xml` — RSS 2.0 feed
- `feed.json` — JSON Feed v1.1
- `css/style.css` — Theme styles
- `analytics.html` — Analytics dashboard (if enabled)
- `js/analytics.js` — Tracking script (if enabled)

## License

MIT © Changelog.page
