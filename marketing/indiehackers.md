# IndieHackers Post Draft

## Post 1: Launch / Introduction

**Title:** Launched SchemaLens — a privacy-first SQL schema diff tool. Built in public.

**Body:**
Hey Indie Hackers,

I just launched SchemaLens, a browser-based SQL schema diff tool for PostgreSQL, MySQL, and SQLite.

**The problem:** Reviewing database migrations by comparing two SQL dumps is tedious and error-prone. Text diffs miss semantic meaning. CLI tools require installation and database connections.

**The solution:** Paste two CREATE TABLE dumps into SchemaLens. Get an instant visual diff and a dialect-correct migration script. No install, no signup, no backend.

**Why privacy-first matters:** Your schema structure reveals a lot about your business logic. SchemaLens parses everything in the browser. Your data never touches a server.

**Stack:** Vanilla HTML/CSS/JS. Custom SQL parser. Vercel hosting. $0 infrastructure cost.

**Monetization:** Free for 10 tables. Lifetime Pro at $39 one-time for unlimited access.

**Live:** https://schemalens.tech

I'm building this as part of a 12-week $100 startup race (documenting everything publicly). Would love feedback from developers and indie hackers alike.

---

## Post 2: Metrics Update (Week 2-3)

**Title:** SchemaLens — 2 weeks in: traffic, feedback, and what's next

**Body:**
Update on SchemaLens, my browser-based SQL schema diff tool.

**Numbers since launch:**
- Unique visitors: [TBD]
- Schemas compared: [TBD]
- Blog posts published: 2
- Revenue: $0 (not surprising at 2 weeks)

**What I did:**
- Built custom SQL parser for PostgreSQL, MySQL, SQLite
- Added Markdown + SQL export
- Published 2 SEO blog posts
- Drafted Show HN / Reddit posts

**What surprised me:**
- The parser was easier to build than expected. ~600 lines of vanilla JS handles 90% of real-world schemas.
- SQLite's ALTER TABLE limitations are brutal. Users need clear messaging about what we can/can't generate.

**What's next:**
- Keyboard shortcuts and URL sharing for diffs
- Gumroad integration for Pro licenses
- Submit to SaaS directories and dev communities

**Ask:** If you work with SQL databases, try https://schemalens.tech and tell me what breaks.

---

## Post 3: Lessons Learned (Month 1)

**Title:** What I learned building a dev tool with a $0 infrastructure budget

**Body:**
One month into SchemaLens. Some lessons:

1. **Client-side only is a feature, not a limitation.** Privacy-first positioning resonates with developers. "Your schema never leaves your browser" is a stronger pitch than "we have great security."

2. **The app IS the landing page.** Once someone pastes two schemas and sees the diff, they're sold. My job is getting them to paste.

3. **SEO > social for dev tools.** A blog post ranking for "compare mysql schemas" will convert better than a viral tweet. Technical content compounds.

4. **Scope discipline is everything.** I want to add ER diagrams, query builders, live DB connections. But schema diff only for Q1. Saying no is the hardest part.

Full journey: https://schemalens.tech/blog.html

---

## Engagement Tips
- Post in "Products & Startups" or "Growth & Marketing" sections
- Respond to every comment
- Share real numbers (even if they're small—indie hackers respect honesty)
- Cross-link to blog posts for SEO juice
