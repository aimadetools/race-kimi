#!/usr/bin/env python3
"""Generate Product PH gallery screenshots and OG image for SchemaLens."""

import base64
import json
import os
import sys
from urllib.parse import quote

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("Playwright not installed. Run: pip install playwright && playwright install chromium")
    sys.exit(1)

# Compelling PostgreSQL schema diff for screenshots
SCHEMA_A = """CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_comments_post ON comments(post_id);
"""

SCHEMA_B = """CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL DEFAULT 1,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(300) UNIQUE,
  body TEXT,
  published BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE post_tags (
  post_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  CONSTRAINT fk_pt_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  CONSTRAINT fk_pt_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_posts_slug ON posts(slug);
"""

DIALECT = "postgres"

OUTDIR = os.path.join(os.path.dirname(__file__), "gallery")
os.makedirs(OUTDIR, exist_ok=True)


def encode_diff(a, b, dialect):
    payload = json.dumps({"a": a, "b": b, "d": dialect})
    encoded = quote(payload, safe="")
    b64 = base64.b64encode(encoded.encode("utf-8")).decode("utf-8")
    return b64


def generate_og_image(p):
    """Generate a 1200x630 OpenGraph image using HTML/CSS rendered by Playwright."""
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1200, "height": 630})
    page = context.new_page()

    og_html = """<!DOCTYPE html>
<html>
<head>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1200px; height: 630px;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #0f0f0f 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: #e5e5e5; position: relative; overflow: hidden;
}
.glow {
  position: absolute; width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
  top: -100px; right: -100px;
}
.glow2 {
  position: absolute; width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
  bottom: -80px; left: -80px;
}
.logo {
  display: flex; align-items: center; gap: 16px; margin-bottom: 40px;
}
.logo-mark {
  width: 72px; height: 72px; border-radius: 16px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 32px; font-weight: 800; color: #fff;
  box-shadow: 0 8px 32px rgba(99,102,241,0.35);
}
.logo-text { font-size: 52px; font-weight: 800; letter-spacing: -1px; }
.tagline {
  font-size: 32px; color: #a5b4fc; font-weight: 500;
  margin-bottom: 48px; text-align: center; max-width: 900px; line-height: 1.4;
}
.badges {
  display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;
}
.badge {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 14px 28px;
  font-size: 18px; font-weight: 600; color: #cbd5e1;
  backdrop-filter: blur(10px);
}
.badge.green { color: #86efac; border-color: rgba(134,239,172,0.25); }
.badge.yellow { color: #fde047; border-color: rgba(253,224,71,0.25); }
.badge.red { color: #fca5a5; border-color: rgba(252,165,165,0.25); }
.footer {
  position: absolute; bottom: 32px;
  font-size: 18px; color: #64748b; font-weight: 500;
}
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="glow2"></div>
  <div class="logo">
    <div class="logo-mark">SL</div>
    <div class="logo-text">SchemaLens</div>
  </div>
  <div class="tagline">Compare SQL schemas. Spot changes instantly.<br>Generate migrations in your browser.</div>
  <div class="badges">
    <div class="badge green">PostgreSQL</div>
    <div class="badge yellow">MySQL</div>
    <div class="badge">SQLite</div>
    <div class="badge red">SQL Server</div>
  </div>
  <div class="footer">schemalens.tech · 100% client-side · Zero signup</div>
</body>
</html>"""

    page.set_content(og_html)
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(OUTDIR, "og-image.png"))
    browser.close()


def run_comparison(page):
    """Manually populate editors and click Compare to ensure results render."""
    print("Populating editors...")
    page.evaluate(f"""
        document.getElementById('schemaA').value = {json.dumps(SCHEMA_A)};
        document.getElementById('schemaB').value = {json.dumps(SCHEMA_B)};
        document.getElementById('dialect').value = {json.dumps(DIALECT)};
    """)
    page.wait_for_timeout(200)
    print("Clicking Compare...")
    page.click('#compareBtn')
    page.wait_for_timeout(1200)
    # Ensure results are active
    page.evaluate("document.getElementById('results').classList.add('active')")
    page.wait_for_timeout(200)


def click_tab(page, tab_name):
    """Click a results tab by data-tab attribute using JS to avoid visibility issues."""
    page.evaluate(f"""
        const tab = document.querySelector('button[data-tab="{tab_name}"]');
        if (tab) {{
            tab.scrollIntoView({{block:'center'}});
            tab.click();
        }}
    """)
    page.wait_for_timeout(600)


def main():
    url = f"file://{os.path.abspath('app.html')}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        print("Loading app...")
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(500)

        run_comparison(page)

        # 1. Visual Diff screenshot
        page.evaluate("window.scrollTo(0,0)")
        page.wait_for_timeout(200)
        print("Capturing 01-visual-diff.png...")
        page.screenshot(path=os.path.join(OUTDIR, "01-visual-diff.png"))

        # 2. Migration SQL tab
        click_tab(page, "migration")
        page.evaluate("window.scrollTo(0,0)")
        page.wait_for_timeout(200)
        print("Capturing 02-migration-sql.png...")
        page.screenshot(path=os.path.join(OUTDIR, "02-migration-sql.png"))

        # 3. Export Markdown tab
        click_tab(page, "markdown")
        page.evaluate("window.scrollTo(0,0)")
        page.wait_for_timeout(200)
        print("Capturing 03-export-markdown.png...")
        page.screenshot(path=os.path.join(OUTDIR, "03-export-markdown.png"))

        # 4. Back to diff for breaking changes view
        click_tab(page, "diff")
        page.evaluate("window.scrollTo(0,0)")
        page.wait_for_timeout(200)
        print("Capturing 04-breaking-changes.png...")
        page.screenshot(path=os.path.join(OUTDIR, "04-breaking-changes.png"))

        browser.close()

        # 5. OG Image
        print("Generating OG image...")
        generate_og_image(p)

    print(f"\nDone. Images saved to {OUTDIR}/")
    for f in sorted(os.listdir(OUTDIR)):
        if f.endswith(".png"):
            size = os.path.getsize(os.path.join(OUTDIR, f))
            print(f"  {f} ({size // 1024}KB)")


if __name__ == "__main__":
    main()
