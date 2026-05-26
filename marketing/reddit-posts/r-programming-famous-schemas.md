# r/programming Post — Famous Database Schemas Gallery

## Title (choose one)
1. `I reverse-engineered the database schemas of 6 famous apps — GitHub, Slack, Instagram, etc.`
2. `Famous Database Schemas: ERDs for GitHub, Uber, Airbnb, Slack, Instagram, and TikTok`
3. `What do GitHub, Uber, and Instagram's databases actually look like? I mapped them out`

## Body (Title 1 variant)

Hey r/programming,

I spent way too much time reverse-engineering the database schemas of famous apps and building interactive ERDs for each.

**The gallery includes:**
- **GitHub** — repos, stars, forks, issues, PRs, actions
- **Uber** — riders, drivers, trips, payments, ratings
- **Airbnb** — listings, bookings, reviews, users, payments
- **Slack** — workspaces, channels, messages, threads, reactions
- **Instagram** — users, posts, stories, follows, likes, comments
- **TikTok** — videos, users, follows, likes, comments, feeds

Each schema includes:
- Entity-relationship diagram (Mermaid ERD)
- Table definitions with columns, types, keys
- Design notes on why the schema is shaped that way
- "See the diff" links if you want to compare versions

It's educational, not official — these are reverse-engineered from public APIs, blog posts, and engineering talks. But they're accurate enough to learn from.

🔗 https://schemalens.tech/famous-database-schemas.html

If you want me to add another app (Netflix, Stripe, Discord, etc.), let me know.

---

## Follow-up Comment (if asked about methodology)

I reverse-engineered these from:
- Public API documentation (GitHub REST API, Slack API, etc.)
- Engineering blog posts (Instagram's sharding strategy, Uber's microservice data model)
- Open-source clones and mock implementations
- Common patterns from schema design literature

They're designed to be *teaching tools*, not production blueprints.

---

## Note
r/programming allows self-promo if the content is genuinely educational and you disclose your involvement. Lead with value, not the product.
