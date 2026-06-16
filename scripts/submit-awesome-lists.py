#!/usr/bin/env python3
"""
Autonomous awesome-list PR submission for SchemaLens.
Targets curated developer directories (no cold emails).
Uses GITHUB_BOT_TOKEN env var.
"""
import os
import re
import subprocess
import sys
import time
import json
import tempfile
import urllib.request
import urllib.error

TOKEN = os.environ.get("GITHUB_BOT_TOKEN")
if not TOKEN:
    print("GITHUB_BOT_TOKEN not set", file=sys.stderr)
    sys.exit(1)

BOT_USER = "AIMadeTools-race"
BRANCH = "add-schemalens"
COMMIT_USER = "AIMadeTools-race"
COMMIT_EMAIL = "race@aimadetools.com"

SUBMISSIONS = [
    {
        "owner": "mgramin",
        "repo": "awesome-db-tools",
        "base_branch": "master",
        "file": "README.md",
        "insert_mode": "before_line",
        "marker": r"^- \[SchemaHero\]",
        "entry": "- [SchemaLens](https://schemalens.tech) - Browser-based SQL schema diff and migration generator for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. Paste two CREATE TABLE dumps, get a visual diff with a risk score, and generate ALTER TABLE migrations. Free web diff + CI/CD integrations.",
        "pr_title": "Add SchemaLens to Schema / Changes",
        "pr_body": "Hi! I'd like to propose adding [SchemaLens](https://schemalens.tech) to the **Schema / Changes** section.\n\nSchemaLens is a free, browser-based SQL schema diff tool that compares two CREATE TABLE dumps, highlights added/removed/modified objects, and generates ready-to-run migration scripts for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. It also offers CI/CD integrations (GitHub Actions, GitLab CI, Jenkins, CircleCI, Bitbucket, Azure DevOps) to catch breaking schema changes in PRs.\n\nThe project is open source and the web diff is free with no signup required.\n\nThanks for maintaining this list!",
    },
    {
        "owner": "dhamaniasad",
        "repo": "awesome-postgres",
        "base_branch": "master",
        "file": "README.md",
        "insert_mode": "before_line",
        "marker": r"^## Resources",
        "entry": "* [SchemaLens](https://schemalens.tech) - Browser-based SQL schema diff and migration generator for PostgreSQL (and MySQL, SQLite, SQL Server, Oracle). Paste two CREATE TABLE dumps, get a visual diff with a risk score, and generate ALTER TABLE migrations. Free web diff + CI/CD integrations.",
        "pr_title": "Add SchemaLens to Utilities",
        "pr_body": "Hi! I'd like to propose adding [SchemaLens](https://schemalens.tech) to the **Utilities** section.\n\nSchemaLens is a free, browser-based schema diff tool for PostgreSQL. It compares two CREATE TABLE dumps, shows a visual diff, assigns a risk score, and generates ALTER TABLE migration scripts. It also has CI/CD integrations (GitHub Actions, GitLab CI, Jenkins, CircleCI, Bitbucket, Azure DevOps) to catch breaking schema changes in PRs.\n\nThe web diff is free, requires no signup, and the project is open source.\n\nThanks for maintaining awesome-postgres!",
    },
    {
        "owner": "shlomi-noach",
        "repo": "awesome-mysql",
        "base_branch": "master",
        "file": "README.md",
        "insert_mode": "before_line",
        "marker": r"^- \[sys\]",
        "entry": "- [SchemaLens](https://schemalens.tech) - Browser-based SQL schema diff and migration generator for MySQL, MariaDB, PostgreSQL, SQLite, SQL Server, and Oracle. Paste two CREATE TABLE dumps, get a visual diff with a risk score, and generate ALTER TABLE migrations. Free web diff + CI/CD integrations.",
        "pr_title": "Add SchemaLens to Schema",
        "pr_body": "Hi! I'd like to propose adding [SchemaLens](https://schemalens.tech) to the **Schema** section.\n\nSchemaLens is a free, browser-based SQL schema diff tool for MySQL and MariaDB (plus PostgreSQL, SQLite, SQL Server, and Oracle). It compares two CREATE TABLE dumps, visualizes added/removed/modified objects, assigns a risk score, and generates ALTER TABLE migration scripts. It also offers CI/CD integrations (GitHub Actions, GitLab CI, Jenkins, CircleCI, Bitbucket, Azure DevOps) to catch breaking schema changes in PRs.\n\nThe web diff is free, requires no signup, and the project is open source.\n\nThanks for maintaining awesome-mysql!",
    },
]


def api_request(method, path, data=None, headers=None):
    url = f"https://api.github.com{path}"
    h = {
        "Authorization": f"token {TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "SchemaLens-awesome-list-submitter",
    }
    if headers:
        h.update(headers)
    body = None
    if data is not None:
        body = json.dumps(data).encode("utf-8")
        h["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=body, method=method, headers=h)
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        try:
            err_json = json.loads(err_body)
        except Exception:
            err_json = err_body
        return e.code, err_json


def fork_exists(owner, repo):
    status, data = api_request("GET", f"/repos/{BOT_USER}/{repo}")
    return status == 200


def create_fork(owner, repo):
    status, data = api_request("POST", f"/repos/{owner}/{repo}/forks")
    return status in (200, 202), data


def wait_for_fork(repo, retries=20, delay=3):
    for i in range(retries):
        if fork_exists(BOT_USER, repo):
            return True
        print(f"  waiting for fork... ({i+1}/{retries})")
        time.sleep(delay)
    return False


def run(cmd, cwd=None, check=True, display_cmd=None):
    print(f"  $ {' '.join(display_cmd if display_cmd else cmd)}")
    result = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    if check and result.returncode != 0:
        raise subprocess.CalledProcessError(result.returncode, cmd)
    return result


def insert_entry(content, mode, marker, entry):
    lines = content.splitlines(keepends=True)
    pattern = re.compile(marker)
    for i, line in enumerate(lines):
        if pattern.search(line):
            if mode == "before_line":
                # ensure blank line before if previous line is not blank
                insert_lines = []
                if i > 0 and lines[i - 1].strip() != "":
                    insert_lines.append("\n")
                insert_lines.append(entry + "\n")
                return "".join(lines[:i]) + "".join(insert_lines) + "".join(lines[i:])
            elif mode == "after_line":
                insert_lines = [entry + "\n", "\n"]
                return "".join(lines[: i + 1]) + "".join(insert_lines) + "".join(lines[i + 1 :])
    raise ValueError(f"Marker not found: {marker}")


def process_submission(sub):
    owner, repo = sub["owner"], sub["repo"]
    print(f"\n=== {owner}/{repo} ===")

    # Ensure fork
    if fork_exists(owner, repo):
        print(f"  fork {BOT_USER}/{repo} already exists")
    else:
        ok, data = create_fork(owner, repo)
        if not ok:
            print(f"  fork creation failed: {data}", file=sys.stderr)
            return False
        print(f"  fork requested, waiting...")
        if not wait_for_fork(repo):
            print(f"  fork did not become available", file=sys.stderr)
            return False

    # Get default branch of upstream (fallback to configured base_branch)
    status, repo_data = api_request("GET", f"/repos/{owner}/{repo}")
    if status != 200:
        print(f"  could not fetch upstream repo: {repo_data}", file=sys.stderr)
        return False
    default_branch = repo_data.get("default_branch", sub["base_branch"])

    # Clone fork (public URL; auth injected only for push)
    tmpdir = tempfile.mkdtemp(prefix=f"schemalens-{repo}-")
    public_fork_url = f"https://github.com/{BOT_USER}/{repo}.git"
    run(["git", "clone", "--depth", "1", "--branch", default_branch, public_fork_url, tmpdir], cwd=None)

    # Inject token into origin remote for push
    auth_fork_url = f"https://x-access-token:{TOKEN}@github.com/{BOT_USER}/{repo}.git"
    run(
        ["git", "remote", "set-url", "origin", auth_fork_url],
        cwd=tmpdir,
        display_cmd=["git", "remote", "set-url", "origin", "***"],
    )

    # Sync fork with upstream via fetching upstream and resetting? For simplicity, create branch from origin/default_branch.
    # Configure git user
    run(["git", "config", "user.email", COMMIT_EMAIL], cwd=tmpdir)
    run(["git", "config", "user.name", COMMIT_USER], cwd=tmpdir)

    # Create branch
    run(["git", "checkout", "-b", BRANCH], cwd=tmpdir)

    # Edit file
    filepath = os.path.join(tmpdir, sub["file"])
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    new_content = insert_entry(content, sub["insert_mode"], sub["marker"], sub["entry"])
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    # Commit
    run(["git", "add", sub["file"]], cwd=tmpdir)
    run(["git", "commit", "-m", sub["pr_title"]], cwd=tmpdir)

    # Push
    run(["git", "push", "-u", "origin", BRANCH], cwd=tmpdir)

    # Create PR
    pr_status, pr_data = api_request(
        "POST",
        f"/repos/{owner}/{repo}/pulls",
        data={
            "title": sub["pr_title"],
            "body": sub["pr_body"],
            "head": f"{BOT_USER}:{BRANCH}",
            "base": default_branch,
        },
    )
    if pr_status not in (200, 201):
        print(f"  PR creation failed ({pr_status}): {pr_data}", file=sys.stderr)
        return False
    print(f"  PR created: {pr_data.get('html_url')}")
    return True


def main():
    results = []
    for sub in SUBMISSIONS:
        try:
            ok = process_submission(sub)
        except Exception as e:
            print(f"  ERROR: {e}", file=sys.stderr)
            ok = False
        results.append((sub, ok))
    print("\n=== Summary ===")
    for sub, ok in results:
        status = "OK" if ok else "FAIL"
        print(f"  [{status}] {sub['owner']}/{sub['repo']}")
    return 0 if all(ok for _, ok in results) else 1


if __name__ == "__main__":
    sys.exit(main())
