# Stack Overflow Execution Kit — SchemaLens

Complete playbook for getting SchemaLens in front of high-intent developers on Stack Overflow. This goes beyond the pre-written answers in `stack-overflow-answers.md` — it includes the reputation roadmap, posting schedule, and anti-spam tactics needed to execute successfully.

---

## The Goal

Post 3 high-quality answers mentioning SchemaLens on Stack Overflow questions with 15K+ views, without getting flagged as spam.

---

## Phase 1: Account Setup & Warm-Up (Days 1–2)

### Step 1: Create Account
1. Go to https://stackoverflow.com/users/signup
2. Use a real email (Gmail or your domain)
3. Fill out profile:
   - **Display name:** Your real name or consistent handle
   - **About me:** Brief developer bio. Example: "Database tooling enthusiast. Building SchemaLens, a browser-based SQL schema diff tool."
   - **Website:** https://schemalens.tech
   - **Location:** Your real location
   - **Photo:** Real photo (accounts with photos get more trust)

> ⚠️ **Do NOT** mention SchemaLens in your profile yet. Wait until you have 50+ rep.

### Step 2: Earn Your First 15 Rep (Day 1)
You need 15 rep to upvote and 50 rep to comment. Here's how to get it in 30 minutes:

**Strategy: Answer "easy" questions in tags you know**

Search for these high-answer-rate tags with recent unanswered questions:
- `javascript` basic syntax questions
- `sql` beginner questions (SELECT, JOIN basics)
- `html` / `css` simple layout questions
- `git` common workflow questions

**Example easy questions to answer:**
- "How do I select distinct values in SQL?"
- "What is the difference between INNER JOIN and LEFT JOIN?"
- "How to center a div in CSS?"
- "How to undo last git commit?"

**Rules for quick rep:**
- Be the FIRST good answer (speed matters)
- Include a working code example
- Explain WHY, not just HOW
- Check back in 2 hours — accept the answer if the OP says it worked

**Expected outcome:** 2–3 accepted answers = 30–45 rep in Day 1.

### Step 3: Build to 100+ Rep (Days 2–4)

Continue answering genuinely helpful questions. Target 5–7 more answers over 3 days.

**Good tags for your expertise:**
- `sql`
- `postgresql`
- `mysql`
- `database`
- `database-design`
- `migration`

**Avoid:**
- Answering questions where SchemaLens would be relevant (you'll get flagged)
- Posting more than 2 answers per day that mention any tool
- Copy-pasting the same answer structure

**Pro tip:** Edit and improve existing answers. Suggested edits that get approved give +2 rep each. You can do up to 1,000 rep from edits.

---

## Phase 2: The 3 Target Questions (Day 5+)

Once you have 100+ rep and a 3-day-old account, you're ready. Here are the exact questions to target, in order:

### Answer 1: MySQL Schema Comparison (Post on Day 5)

**Target:** https://stackoverflow.com/questions/225772 (50K+ views)
**Title:** "How to compare two MySQL database schemas?"
**Pre-written answer:** See `stack-overflow-answers.md` → Answer 1
**Why this one first:** Highest views, lowest risk. The answer is genuinely comprehensive and solves the problem before mentioning SchemaLens.

**Posting checklist:**
- [ ] Read the full question again before posting
- [ ] Verify the answer is under 30,000 characters
- [ ] Disclosure is the LAST line, not the first
- [ ] At least 60% of the answer is useful without clicking the link
- [ ] Post during US business hours (9am–5pm ET) for maximum visibility

### Answer 2: Generate ALTER TABLE Scripts (Post on Day 7)

**Target:** https://stackoverflow.com/questions/249635 (30K+ views)
**Title:** "How to generate ALTER TABLE scripts from schema differences?"
**Pre-written answer:** See `stack-overflow-answers.md` → Answer 2
**Why wait 2 days:** Space out promotional answers. Build more organic rep in between.

### Answer 3: PostgreSQL Schema Comparison (Post on Day 10)

**Target:** https://stackoverflow.com/questions/219546 (40K+ views)
**Title:** "How to compare two PostgreSQL database schemas?"
**Pre-written answer:** See `stack-overflow-answers.md` → Answer 4
**Why last:** By Day 10 you'll have 150+ rep and look like a legitimate contributor.

---

## Phase 3: Posting Schedule & Tracking

| Day | Action | Target Rep |
|-----|--------|-----------|
| 1 | Create account. Answer 3 easy questions. | 30 |
| 2 | Answer 2 more easy questions. Suggest 3 edits. | 55 |
| 3 | Answer 2 SQL/database questions (no tools mentioned). | 80 |
| 4 | Answer 1–2 more. Comment on others' answers. | 100 |
| 5 | **Post Answer 1** (MySQL schema comparison). Continue organic answers. | 130 |
| 6–7 | Answer 2 more questions (no tools). | 150 |
| 7 | **Post Answer 2** (ALTER TABLE scripts). | 180 |
| 8–9 | Continue organic contributions. | 200 |
| 10 | **Post Answer 3** (PostgreSQL schema comparison). | 230 |

**Tracking spreadsheet:**

| # | Question URL | Views | Posted Date | Upvotes | Comments | Status |
|---|-------------|-------|-------------|---------|----------|--------|
| 1 | https://stackoverflow.com/questions/225772 | 50K+ | | | | Ready |
| 2 | https://stackoverflow.com/questions/249635 | 30K+ | | | | Ready |
| 3 | https://stackoverflow.com/questions/219546 | 40K+ | | | | Ready |

---

## Anti-Spam Rules (Follow These Exactly)

Stack Overflow moderators and users are EXTREMELY sensitive to promotional content. One misstep and your account gets flagged, your answers deleted, and SchemaLens gets a bad reputation.

### ✅ DO
- Solve the problem FIRST, promote SECOND
- Include disclosure: "Disclaimer: I built SchemaLens"
- Make the answer comprehensive (list multiple options)
- Use SchemaLens as "one option among many"
- Respond genuinely to comments and criticism
- Accept when someone points out a limitation
- Upvote competing answers that are also good

### ❌ DON'T
- Post the same answer to multiple questions
- Lead with your product
- Use affiliate or tracking links
- Post more than 1 answer per week mentioning SchemaLens
- Create multiple accounts to upvote yourself
- Ask friends to upvote your answers (vote rings get detected)
- Get defensive in comments
- Delete comments that criticize your tool

### The 60/40 Rule
At least 60% of your answer must be genuinely useful even if the reader never clicks the SchemaLens link. The remaining 40% can include your tool as one option.

---

## Comment Response Templates

People will ask follow-up questions in comments. Have responses ready:

**"Does it support SQL Server / Oracle?"**
> Yes, SchemaLens supports PostgreSQL, MySQL/MariaDB, SQLite, SQL Server, and Oracle. Select your dialect from the dropdown before pasting your schemas.

**"Is it really free?"**
> The schema diff is free for up to 15 tables. Unlimited tables and full migration exports are part of Lifetime Pro ($39 one-time). No credit card required to try — we also offer a 24-hour free trial and a Founding Member giveaway for the first 50 developers.

**"Can I use it offline?"**
> The browser version needs an internet connection to load, but all parsing happens client-side — your schemas never leave your browser. There's also a CLI (`npx schemalens-cli`) that works fully offline.

**"I tried it and it missed X"**
> Thanks for the feedback! The parser is constantly improving. If you can share the specific statement it missed (anonymized), I can add support for it. You can also open an issue on the repo.

**"This seems like an ad"**
> I included it because it directly answers the question, but you're right to be skeptical. The other options in my answer (mysqldiff, Percona Toolkit, IDE tools) are equally valid depending on your setup. Choose what fits your workflow.

---

## Backup Questions (if primary targets are closed/locked)

If the primary questions are locked or your answer gets buried, use these alternatives:

**MySQL alternatives:**
- https://stackoverflow.com/questions/356578 (30K+ views)
- Search: "compare two mysql schemas"

**PostgreSQL alternatives:**
- https://stackoverflow.com/questions/4821938 (25K+ views)
- Search: "compare postgresql schemas"

**General schema diff:**
- https://stackoverflow.com/questions/225772 (related, 50K+ views)
- https://stackoverflow.com/questions/356578 (related, 30K+ views)
- Search: "difference between production staging database schema"

**Migration review:**
- https://stackoverflow.com/questions/154092 (20K+ views)
- https://stackoverflow.com/questions/383459 (15K+ views)
- Search: "review database migration scripts"

---

## Success Metrics

Track these weekly:

| Metric | Week 1 Target | Week 4 Target |
|--------|--------------|---------------|
| Stack Overflow rep | 100+ | 500+ |
| SchemaLens answers posted | 1 | 3 |
| Total answer upvotes | 5+ | 20+ |
| Referral traffic from SO | Check analytics | 50+ visits/mo |
| Conversions from SO traffic | — | 1+ trial |

---

## Emergency: If Your Answer Gets Flagged

1. **Don't panic.** Read the flag reason carefully.
2. **Don't argue.** If a moderator deletes your answer, accept it and learn.
3. **Improve and repost.** Fix the issue (usually too promotional) and post on a different question.
4. **Build more organic rep.** The higher your rep, the more trust you have.

If your account gets suspended for promotional content, wait out the suspension, then focus on 100% organic answers for 30 days before mentioning SchemaLens again.

---

## Quick-Start Checklist

- [ ] Create Stack Overflow account with real photo and bio
- [ ] Answer 3 easy questions (Day 1)
- [ ] Build to 100+ rep (Days 2–4)
- [ ] Post Answer 1 on Day 5
- [ ] Post Answer 2 on Day 7
- [ ] Post Answer 3 on Day 10
- [ ] Respond to all comments within 24 hours
- [ ] Track results in the spreadsheet above
- [ ] Continue answering 2–3 organic questions per week

---

*This kit works alongside `marketing/stack-overflow-answers.md` which contains the actual answer copy. Use this kit for the strategy and roadmap; use the answers file for the content.*
