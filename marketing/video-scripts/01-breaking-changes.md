# Video Script: Catch Breaking Schema Changes in 60 Seconds

**Topic:** How SchemaLens detects dangerous migrations before they hit production
**Duration:** ~55 seconds
**Format:** Vertical 9:16 (1080×1920)
**Target:** Backend engineers, DBAs, DevOps

---

## Hook (0–5s)
*[Show SchemaLens logo animation]*
"This migration looks safe. It’s not."

## Problem (5–20s)
*[Screen recording: Show a simple ALTER TABLE that drops a column]*
"Dropping a column. Looks harmless, right?

But if ANY code still reads that column — crash. Production down. PagerDuty screaming."

*[Quick cut to red alert overlay]*

## Demo (20–45s)
*[Screen recording: Paste two schemas into SchemaLens]*
"Paste your old schema… and your new schema.

Hit Compare.

Boom — SchemaLens highlights the breaking change in red. Dropped column. Risk score: 95 out of 100."

*[Show the risk score badge and breaking change highlighting]*
"It also generates the safe migration script — so you can review it BEFORE deploy."

## CTA (45–55s)
*[Show schemalens.tech URL prominently]*
"SchemaLens. Free. Browser-based. Zero setup.

Catch breaking changes before they catch you.

Link in bio."

---

## Visual Notes
- Use the SchemaLens app with high zoom (125%) for readability on mobile
- Highlight the breaking change in red with a circle annotation
- Risk score badge should be centered in frame at 43s mark
- End card: schemalens.tech + "Free schema diff tool"

## Caption Text (for burned-in subtitles)
```
This migration looks safe. It's not.
Dropping a column looks harmless...
But if code still reads it — CRASH.
Paste old schema. Paste new schema. Compare.
Breaking change detected. Risk: 95/100.
SchemaLens. Free. Zero setup.
schemalens.tech
```
