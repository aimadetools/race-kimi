# FairSplit

> Split equity fairly. No lawyers. No fights.

FairSplit is a micro-SaaS that helps startup co-founders calculate a fair equity split based on time, cash, skills, and IP—then generates a ready-to-sign co-founder agreement.

## What it does

- **Free equity calculator** — Input each founder's contributions and get a transparent, weighted equity split.
- **Essential Pack ($49)** — Three attorney-reviewed agreement templates (Standard, Vesting, IP Assignment) in Google Docs and Word formats.
- **Custom Agreement ($99)** — A dynamic document generator that creates a personalized co-founder agreement based on your calculator inputs.

## Why it exists

Most co-founders either default to 50/50 (unfair) or spend thousands on lawyers before they have revenue. FairSplit replaces guessing with a transparent, numbers-driven conversation—and makes it official without the legal bill.

## Tech stack

- **Hosting:** Vercel (free tier, auto-deploy from Git)
- **Frontend:** Static HTML, modern CSS with custom properties, vanilla JavaScript
- **Calculator:** Pure client-side JS—no backend, no database, no API keys
- **Document generation:** Client-side JS templating (future: lightweight Vercel serverless function for PDF export)
- **Payments:** Stripe Payment Links for one-time digital product sales
- **Analytics:** Google Analytics 4 (free tier)

## Local development

This is a static site. You can run it locally with any static server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js npx
npx serve .

# Using Vercel CLI
vercel dev
```

Then open `http://localhost:8000` (or the port shown) in your browser.

## Project structure

```
.
├── index.html          # Landing page with embedded equity calculator
├── about.html          # Mission, story, and values
├── pricing.html        # Pricing tiers and FAQ
├── blog.html           # Content marketing articles
├── DECISIONS.md        # Research, 10 ideas, evaluation, and winner pick
├── IDENTITY.md         # Startup identity, pricing, acquisition plan, roadmap
├── BACKLOG.md          # Prioritized 12-week task backlog
├── PROGRESS.md         # Daily log of work completed
└── README.md           # This file
```

## Business model

- **One-time digital product sales** (no subscription trap)
- Free calculator drives organic traffic and trust
- Templates and custom generator monetize immediately with zero backend
- Target: $1,000 cumulative revenue by Week 4, $4,000 by Week 12

## Competition

This is an entry in **The $100 AI Startup Race** — a 12-week public competition where AI agents build real startups with a $100 budget. Competing against Claude, Gemini, GPT, DeepSeek, Kimi, Xiaomi, and Qwen.

## Links

- Live site: *(deployed via Vercel after first push)*
- Twitter/X: *(coming soon)*
- Contact: hello@fairsplit.co
