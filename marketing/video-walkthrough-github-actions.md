# Video Walkthrough Script: SchemaLens + GitHub Actions

**Target length:** 3–4 minutes  
**Format:** Screen recording with voiceover  
**Audience:** Backend developers and DevOps engineers using GitHub  
**Goal:** Show how to set up automated schema diff checks in a GitHub Actions pipeline in under 5 minutes

---

## Scene 1: Hook (0:00–0:25)

**[Screen: Terminal showing a failed production deploy]**

**Voiceover:**
> "You just deployed to production. Everything looked green in CI. But thirty seconds after the deploy finishes, your error tracker explodes. Turns out, a column rename in your migration script broke a query path that your tests never touched. The migration ran fine — but the application code and the schema were out of sync."

**[Screen: Cut to SchemaLens homepage]**

> "This is schema drift. And today I'm going to show you how to catch it automatically on every pull request using SchemaLens and GitHub Actions — in about three minutes."

---

## Scene 2: The Problem (0:25–0:50)

**[Screen: Split view — left side shows a migration file, right side shows the application query that breaks]**

**Voiceover:**
> "Most teams review application code in pull requests. But migrations? We often just glance at them. A missing index, a dropped column, a type change that truncates data — these are structural changes that static analysis can't catch. You need to compare the actual schema before and after the change."

---

## Scene 3: Prerequisites (0:50–1:05)

**[Screen: A GitHub repo page — any Node.js backend project with SQL migrations]**

**Voiceover:**
> "For this walkthrough, you need a GitHub repository with Node.js installed in your Actions runners — which is the default for most projects. You also need your schema defined in a SQL file, or you need to be able to export it. In this example, I'm using a PostgreSQL schema file at `db/schema.sql`."

**[Screen: Show the file tree with `db/schema.sql` highlighted]**

---

## Scene 4: Step 1 — Copy the Diff Script (1:05–1:35)

**[Screen: GitHub repo, creating a new file `ci/schemalens-diff.js`]**

**Voiceover:**
> "First, copy the SchemaLens diff script into your repository. You can grab it from the SchemaLens documentation or the CI integration page. Paste it into a new file — I'll use `ci/schemalens-diff.js`. This script is self-contained. No npm install, no dependencies."

**[Screen: Paste the script, commit the file with message "Add schema diff script"]**

> "Commit this to your main branch. The script is about two hundred lines and uses the same parser as the browser app, so you get consistent results whether you're diffing locally, in CI, or on the website."

---

## Scene 5: Step 2 — Create the Workflow (1:35–2:30)

**[Screen: Create `.github/workflows/schema-diff.yml`]**

**Voiceover:**
> "Now create a new GitHub Actions workflow. Go to `.github/workflows` and add `schema-diff.yml`. Here's the template from the SchemaLens docs."

**[Screen: Paste the workflow file, scrolling slowly so viewers can read it]**

> "Let me walk through what this does. The workflow triggers on pull requests that modify SQL files — so it only runs when something actually changed. It checks out the PR with full history, grabs the base branch version of the schema, and runs the diff script. Then it posts the results as a comment on the pull request and uploads the report as an artifact."

**[Screen: Highlight the key lines: the `on.pull_request.paths` filter, the `git show` command, the `node ci/schemalens-diff.js` step, and the PR comment step]**

> "The important part is this line: `git show origin-base-ref:db/schema.sql`. This pulls the schema from the target branch so you're always comparing against the correct baseline. If your schema file lives somewhere else, just update the path here and here."

---

## Scene 6: Step 3 — Customize for Your Database (2:30–2:55)

**[Screen: Edit the workflow to change dialect and schema path]**

**Voiceover:**
> "If you're using MySQL instead of PostgreSQL, change the dialect flag to `mysql`. If your schema file is named differently or lives in a `migrations` folder, update both paths. The script supports PostgreSQL, MySQL, SQLite, and SQL Server."

**[Screen: Show the `--dialect` and file path changes side by side]**

> "You can also change the output format. Markdown is great for PR comments. JSON is better if you want to write custom rules — like failing the build only when tables are dropped."

---

## Scene 7: Step 4 — Test It (2:55–3:25)

**[Screen: Create a new branch, edit `db/schema.sql` to add a column, push, open a PR]**

**Voiceover:**
> "Let's test it. I'll create a branch, add a new column to the users table, and open a pull request."

**[Screen: Show the Actions tab running the workflow, then cut to the PR comments]**

> "The workflow triggered automatically. And here's the comment it posted. We can see the added column highlighted in green, the table that changed, and a summary of the diff. If I had removed a column, it would be flagged in red as a breaking change."

**[Screen: Scroll through the PR comment to show the full report]**

---

## Scene 8: Advanced — Fail on Breaking Changes (3:25–3:50)

**[Screen: Show a script that wraps the diff tool and exits with error on table removal]**

**Voiceover:**
> "If you want to get stricter, you can wrap the diff script in a bash script that fails the build when breaking changes are detected. Here's an example from the docs: parse the JSON output, check if any tables were removed, and exit with an error if they were. This turns schema review from a manual checkbox into an automated gate."

---

## Scene 9: Close (3:50–4:00)

**[Screen: SchemaLens homepage with the CTA button visible]**

**Voiceover:**
> "That's it. Three files, zero dependencies, and every schema change gets reviewed automatically before it reaches production. If you want to try the browser version or set this up for GitLab or Bitbucket, head to schemalens.tech. The link is in the description."

**[Screen: End card — SchemaLens logo, URL, and tagline]**

> "Catch drift before it catches you."

---

## Recording Tips

- **Pacing:** Leave 1–2 seconds of silence after each major step so viewers can process.
- **Cursor:** Use a visible, large cursor highlight so viewers can follow clicks.
- **Zoom:** Zoom in on the code when pasting the workflow file. Text should be readable at 1080p.
- **Terminal:** Use a dark theme with high contrast. Consistent with SchemaLens branding.
- **Audio:** Record in a quiet space. A lavalier mic is ideal. Target -16 LUFS for YouTube.

## Distribution Checklist

- [ ] Record raw footage (estimate 10–15 min, edit to 3–4 min)
- [ ] Add intro bumper (3 sec, SchemaLens logo + sound)
- [ ] Add captions/subtitles (YouTube auto-captions + manual review)
- [ ] Export 1080p MP4, H.264
- [ ] Upload to YouTube with title: "Catch Schema Drift in CI/CD with SchemaLens + GitHub Actions"
- [ ] Description includes links to schemalens.tech, ci-cd-integration.html, and the GitHub repo
- [ ] Tags: schema diff, GitHub Actions, CI/CD, database migration, PostgreSQL, DevOps
- [ ] Embed in ci-cd-integration.html as a video section
- [ ] Post snippet to Twitter/X with GIF of the PR comment appearing
- [ ] Add to Product Hunt gallery materials
