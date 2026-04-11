---
title: "How I Built a Changelog Tool in 4 Days (Tech Stack & Lessons)"
subtitle: "From idea to working product — what worked, what didn't, and what I'd do differently"
---

# How I Built a Changelog Tool in 4 Days (Tech Stack & Lessons)

## The Idea

I noticed most changelog tools are either:
- Too expensive ($49+/month)
- Too complicated (enterprise features)
- Too ugly (no design options)

So I built **Changelog.page** — a simple, affordable alternative for SaaS founders.

## Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Frontend** | Vanilla HTML/CSS/JS | No framework needed for static sites |
| **Build** | Node.js with Markdown parsing | Fast, simple content pipeline |
| **Themes** | 3 variations (Minimal, Cards, Timeline) | Different use cases, same content |
| **Hosting** | Vercel (free tier) | Auto-deploy on push, global CDN |
| **Domain** | changelog.page | Brand match, easy to remember |

## Key Features

1. **Markdown → HTML**: Parse frontmatter for metadata (title, date, category, image)
2. **RSS/JSON feeds**: Auto-generated for each changelog
3. **3 themes**: Switch via environment variable or config
4. **GitHub Actions**: Auto-deploy on push to main branch

## Lessons Learned

### 1. Start with Content

Design around real content, not lorem ipsum. I wrote 4 example entries before touching CSS. This prevented me from building features nobody needs.

### 2. Static Sites Are Fast

No database = instant loads. Lighthouse scores: 100/100/100/100.

Users don't wait for widgets to load. They see content immediately.

### 3. Themes Are Hard

Making one theme is easy. Making three that all look good? That's the challenge.

Each theme required:
- Unique layout approach
- Consistent spacing system
- Mobile responsiveness
- Dark mode support

### 4. GitHub Integration Is Key

Developers want:
- Markdown source control
- PR workflows for updates
- Auto-deploy on merge

Not a web form that locks in their content.

## The Build Timeline

| Day | Focus | Output |
|-----|-------|--------|
| Day 1 | Core generator | Markdown → HTML pipeline |
| Day 2 | Theme system | 3 working themes |
| Day 3 | Features | RSS, JSON feeds, GitHub Actions |
| Day 4 | Polish | Landing page, docs, deployment |

## Try It

```bash
git clone https://github.com/aimadetools/changelog.page
cd changelog.page/generator
npm install
npm run build
```

Or use the hosted version at [changelog.page](https://changelog.page)

## What's Next

- Widget for existing sites
- API for programmatic updates
- More theme variations
- Team collaboration features

## Questions?

Drop a comment — happy to share more about:
- Static site architecture
- Theme design decisions
- Marketing a developer tool
- Bootstrapping vs VC funding

---

*Building in public. Follow along for weekly updates on growing a changelog SaaS from $0 to $500 MRR.*
