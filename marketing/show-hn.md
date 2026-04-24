# Show HN Post Draft

## Primary Draft

**Title:** Show HN: SchemaLens – Compare SQL schemas in your browser, generate migrations

**Body:**
Hi HN,

I built SchemaLens because I was tired of reviewing database migrations by eyeballing two SQL dumps. Text diffs of schema files are noisy and miss semantic meaning—is that column renamed or dropped and re-added?

SchemaLens is a browser-based SQL schema diff tool. Paste two CREATE TABLE dumps, get an instant visual semantic diff, and generate dialect-correct ALTER TABLE scripts.

**What it does:**
- Parses CREATE TABLE and CREATE INDEX for PostgreSQL, MySQL, and SQLite
- Detects added/removed tables, added/removed/modified columns
- Shows per-column changes: type, nullability, default, primary key, unique
- Generates migration SQL tailored to your dialect
- Exports results as Markdown (great for PR descriptions) or raw SQL

**Privacy:** Everything runs client-side. Your schema never touches a server. I can't see your data, and I don't want to.

**Live:** https://schemalens.tech

**Tech:** Vanilla JS. Custom tokenizer + parser (~600 lines). No frameworks, no build step, no dependencies. Deployed on Vercel.

**Pricing:** Free for up to 10 tables. Pro is $12/mo for unlimited tables and full migration generation.

I'm building this as part of a 12-week $100 startup challenge, so I'm documenting everything in public. Happy to answer questions about the parser, the business model, or the race itself.

---

## Follow-up Comment (to pin if post gains traction)

Thanks for the interest! A few answers to common questions:

**Why not use existing tools like migra/apgdiff?**
They're great, but they require installation, a database connection, or Python. SchemaLens is for the "I need to check this right now" moment—paste, compare, done.

**What about more complex objects?**
Right now we parse CREATE TABLE and CREATE INDEX. Views, functions, triggers, and enums are on the roadmap. The parser is modular, so adding new statement types is straightforward.

**Is the Pro tier actually enforced?**
On the free tier, if your schema has more than 10 tables, we show the visual diff but gate the full migration SQL behind an upgrade banner. No paywall on the diff itself.

**Can I self-host?**
It's all static files. Clone the repo, open app.html in a browser. The "backend" is air.

---

## Launch Timing
- Best days: Tuesday, Wednesday, Thursday
- Best time: 7-9 AM US Pacific (10 AM-12 PM ET)
- Avoid: Weekends, Monday mornings, Friday afternoons

## Engagement Strategy
- Respond to every comment within first 3 hours
- Be transparent about limitations (builds trust on HN)
- Share specific technical details when asked
- If post hits front page, prepare for traffic spike (Vercel free tier handles this)
