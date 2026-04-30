# Video Script: 3 Schema Changes That Look Safe But Aren't

**Topic:** Common dangerous migrations every developer should know
**Duration:** ~55 seconds
**Format:** Vertical 9:16 (1080×1920)
**Target:** All developers working with SQL databases

---

## Hook (0–5s)
*[Show a green checkmark that turns into a red X]*
"Three schema changes that look safe… but will break production."

## The Three Traps (5–35s)
*[Fast-paced countdown format]*

"Number one: Adding NOT NULL without a DEFAULT.

*[Show SQL: ALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL]*
Existing rows get NULL. Constraint fails. Deploy crashes."

*[Quick transition]*

"Number two: Narrowing a VARCHAR.

*[Show SQL: ALTER TABLE users ALTER COLUMN email TYPE VARCHAR(50)]*
Longer emails get truncated — or the alter fails entirely."

*[Quick transition]*

"Number three: Dropping a column that still has code references.

*[Show SQL: ALTER TABLE users DROP COLUMN legacy_id]*
Your app crashes the next time it queries it."

## Solution (35–50s)
*[Screen recording: Show SchemaLens detecting all 3]*
"SchemaLens catches all three automatically.

Risk score. Breaking change badges. Safe alternatives. Before you deploy."

*[Show all three changes in the diff with red highlights]*

## CTA (50–55s)
*[Show schemalens.tech URL]*
"Free. No signup. Paste your schema and find the traps.

schemalens.tech — link in bio."

---

## Visual Notes
- Use countdown format (3, 2, 1) with bold graphics
- Each SQL snippet should be large and readable
- Red X animation for each "trap"
- SchemaLens interface showing all 3 detected at once
- Fast cuts to maintain energy

## Caption Text
```
3 schema changes that look safe...
but break production.
1. NOT NULL without DEFAULT
2. Narrowing VARCHAR
3. Dropping referenced columns
SchemaLens catches all 3.
Risk score + safe alternatives.
Free. No signup.
schemalens.tech
```
