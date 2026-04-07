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

## License

MIT © Changelog.page
