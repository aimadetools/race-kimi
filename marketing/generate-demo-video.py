#!/usr/bin/env python3
"""Generate a demo video (WebM) of SchemaLens in action for Product Hunt and social media."""

import json
import os
import sys

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("Playwright not installed. Run: pip install playwright && playwright install chromium")
    sys.exit(1)

OUTDIR = os.path.join(os.path.dirname(__file__), "gallery")
os.makedirs(OUTDIR, exist_ok=True)

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
"""

DIALECT = "postgres"
URL = f"file://{os.path.abspath('app.html')}"


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Record video
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            record_video_dir=OUTDIR,
            record_video_size={"width": 1440, "height": 900},
        )
        page = context.new_page()

        print("Loading app...")
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(800)

        print("Populating Schema A...")
        page.evaluate(f"""
            const el = document.getElementById('schemaA');
            el.value = {json.dumps(SCHEMA_A)};
            el.dispatchEvent(new Event('input'));
        """)
        page.wait_for_timeout(600)

        print("Populating Schema B...")
        page.evaluate(f"""
            const el = document.getElementById('schemaB');
            el.value = {json.dumps(SCHEMA_B)};
            el.dispatchEvent(new Event('input'));
        """)
        page.wait_for_timeout(600)

        print("Clicking Compare...")
        page.click('#compareBtn')
        page.wait_for_timeout(2000)

        print("Scrolling to results...")
        page.evaluate("window.scrollTo(0, 400)")
        page.wait_for_timeout(1500)

        print("Clicking Migration SQL tab...")
        page.evaluate("""
            const tab = document.querySelector('button[data-tab=\"migration\"]');
            if (tab) tab.click();
        """)
        page.wait_for_timeout(1500)

        print("Clicking Export Markdown tab...")
        page.evaluate("""
            const tab = document.querySelector('button[data-tab=\"markdown\"]');
            if (tab) tab.click();
        """)
        page.wait_for_timeout(1500)

        print("Clicking back to Visual Diff...")
        page.evaluate("""
            const tab = document.querySelector('button[data-tab=\"diff\"]');
            if (tab) tab.click();
        """)
        page.wait_for_timeout(1500)

        # Scroll back to top for final frame
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(800)

        context.close()
        browser.close()

    # Find the generated video file
    videos = [f for f in os.listdir(OUTDIR) if f.endswith(".webm")]
    if videos:
        # Rename to a clean filename
        src = os.path.join(OUTDIR, videos[0])
        dst = os.path.join(OUTDIR, "demo-video.webm")
        os.rename(src, dst)
        size = os.path.getsize(dst)
        print(f"\nDone. Demo video saved to {dst} ({size // 1024}KB)")
    else:
        print("\nWarning: no video file found")


if __name__ == "__main__":
    main()
