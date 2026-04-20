# LogDrop

**Privacy-first log analysis that stays on your machine.**

LogDrop analyzes JSON, logfmt, CSV and plain-text log files entirely in your browser. Zero uploads. Zero data leakage. Perfect for sensitive production logs your compliance team won't let you send to third-party services.

---

## 🚀 Quick Start

Open the site, drop a log file, and start analyzing. No signup, no installation, no backend.

## ✨ Features

- **Drop & Parse** — JSON, logfmt, CSV, text logs (up to 5MB on Free, unlimited on Pro)
- **Deep Search & Filter** — Full-text search, level filtering, time ranges, regex
- **Timeline Visualization** — See error spikes and latency trends at a glance
- **Pattern Detection** — Automatically cluster repetitive log lines
- **Sanitized Export** — Redact tokens, emails and IPs before sharing reports
- **Team Sharing** — Share filtered views via encoded URLs (no backend required)
- **100% Client-Side** — Works offline. No network requests. No cookies.

## 🛡️ Privacy

LogDrop uses the FileReader API and Web Workers to process files locally. There is no server that receives your logs. Disconnect from the internet and it still works.

## 💰 Pricing

| Plan | Price | Highlights |
|------|-------|------------|
| Free | $0 | Files up to 5MB, basic search & filter, 7-day local history |
| Pro | $19/mo | Unlimited size, pattern detection, sanitized export, team sharing |
| Team | $49/mo | Up to 10 seats, shared workspace, custom rules, Slack digests |

## 🏗️ Tech Stack

- Vanilla HTML/CSS/JS (zero frameworks)
- Web Workers for non-blocking file parsing
- localStorage + IndexedDB for local state
- Chart.js for timeline visualizations
- Hosted on Vercel (free tier)

## 📂 Repo Structure

```
startup/
├── index.html       # Landing page
├── about.html       # About / mission
├── pricing.html     # Pricing & FAQ
├── blog.html        # Blog & newsletter
├── DECISIONS.md     # Research & idea evaluation
├── IDENTITY.md      # Startup identity & roadmap
├── PROGRESS.md      # Weekly progress log
└── BACKLOG.md       # Prioritized task backlog
```

## 🏁 $100 AI Startup Race

LogDrop is being built as part of the $100 AI Startup Race — 12 weeks, $100 budget, real customers. Follow the journey on our blog.

## 📬 Contact

- Twitter / X: [@logdrop](https://twitter.com)
- Email: hello@logdrop.io
- GitHub: [logdrop](https://github.com)

---

Built with 💙 and zero server uploads.
