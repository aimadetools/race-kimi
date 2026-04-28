#!/usr/bin/env python3
"""
Generate a demo GIF/screenshots of SchemaLens in action.
Uses Playwright to automate the browser and Pillow to create an animated GIF.

Usage:
    python3 scripts/generate-demo-gif.py

Outputs:
    marketing/screenshots/demo-step-{N}.png
    marketing/demo-assets/demo.gif
    marketing/demo-assets/demo-static.png (final frame, for OG/social)
"""

import os
import sys
import time
import subprocess
import signal
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright

# Directories
ROOT = Path(__file__).parent.parent
SCREENSHOTS_DIR = ROOT / "marketing" / "screenshots"
ASSETS_DIR = ROOT / "marketing" / "demo-assets"
SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)
ASSETS_DIR.mkdir(parents=True, exist_ok=True)

# Viewport
VIEWPORT = {"width": 1440, "height": 900}

# Steps configuration
STEPS = [
    {"name": "start", "label": "Start", "desc": "Open SchemaLens"},
    {"name": "sample-a", "label": "Load Schema", "desc": "Paste your old schema"},
    {"name": "sample-b", "label": "Load New Schema", "desc": "Paste your new schema"},
    {"name": "compare", "label": "Compare", "desc": "Click Compare Schemas"},
    {"name": "results", "label": "View Diff", "desc": "Visual diff & summary"},
    {"name": "migration", "label": "Migration", "desc": "Generated ALTER TABLE scripts"},
]


def find_font(size):
    """Find a usable system font for overlays."""
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "C:\\Windows\\Fonts\\arialbd.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def add_overlay(image_path, step_info, index, total):
    """Add step label overlay to a screenshot."""
    img = Image.open(image_path).convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Top bar background
    bar_height = 56
    draw.rectangle([0, 0, img.width, bar_height], fill=(15, 23, 42, 220))

    # Step counter circle
    circle_x = 30
    circle_y = 28
    circle_r = 18
    draw.ellipse(
        [circle_x - circle_r, circle_y - circle_r, circle_x + circle_r, circle_y + circle_r],
        fill=(99, 102, 241),
        outline=(129, 140, 248),
        width=2,
    )

    font_bold = find_font(16)
    font_regular = find_font(14)

    # Step number
    num_text = str(index + 1)
    bbox = draw.textbbox((0, 0), num_text, font=font_bold)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((circle_x - tw // 2, circle_y - th // 2 - 2), num_text, font=font_bold, fill=(255, 255, 255))

    # Label
    label_x = 60
    draw.text((label_x, 12), step_info["label"], font=font_bold, fill=(255, 255, 255))

    # Description
    draw.text((label_x, 32), step_info["desc"], font=font_regular, fill=(148, 163, 184))

    # Progress bar at bottom
    pb_height = 4
    pb_y = img.height - pb_height
    draw.rectangle([0, pb_y, img.width, pb_y + pb_height], fill=(30, 41, 59))
    progress_width = int(img.width * (index + 1) / total)
    draw.rectangle([0, pb_y, progress_width, pb_y + pb_height], fill=(99, 102, 241))

    # Composite
    out = Image.alpha_composite(img, overlay)
    return out.convert("RGB")


def make_gif(frames, output_path, duration_ms=1500):
    """Create an animated GIF from frame images."""
    if not frames:
        print("No frames to create GIF")
        return

    imgs = [Image.open(f) for f in frames]
    imgs[0].save(
        output_path,
        save_all=True,
        append_images=imgs[1:],
        duration=duration_ms,
        loop=0,
        optimize=True,
    )
    print(f"GIF saved: {output_path}")


def main():
    # Start local HTTP server
    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", "3000"],
        cwd=str(ROOT),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(1.5)  # Let server start

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(viewport=VIEWPORT)
            page = context.new_page()

            # Block analytics and external resources to keep screenshots clean
            page.route("**/*", lambda route, request: route.abort() if any(x in request.url for x in ["analytics", "google", "gtag", "supabase"]) else route.continue_())

            # Disable onboarding tour before page scripts run
            page.context.add_init_script("""
                localStorage.setItem('schemalens_tour_seen', '1');
                localStorage.setItem('schemalens-theme', 'dark');
            """)

            print("Navigating to app...")
            page.goto("http://localhost:3000/app.html", wait_until="networkidle")
            time.sleep(0.5)

            # Hide welcome hint
            page.evaluate("""
                const wh = document.getElementById('welcomeHint');
                if (wh) wh.classList.add('hidden');
            """)
            time.sleep(0.2)

            # --- Step 0: Clean page ---
            path0 = SCREENSHOTS_DIR / "demo-step-0-raw.png"
            page.screenshot(path=str(path0))
            print(f"Screenshot 0: {path0}")

            # --- Step 1: Load sample A ---
            page.click("button:has-text('Load sample (PostgreSQL)')")
            time.sleep(0.4)
            path1 = SCREENSHOTS_DIR / "demo-step-1-raw.png"
            page.screenshot(path=str(path1))
            print(f"Screenshot 1: {path1}")

            # --- Step 2: Load sample B ---
            page.click("button:has-text('Copy from A & modify')")
            time.sleep(0.4)
            path2 = SCREENSHOTS_DIR / "demo-step-2-raw.png"
            page.screenshot(path=str(path2))
            print(f"Screenshot 2: {path2}")

            # --- Step 3: Click compare ---
            page.click("button#compareBtn")
            # Wait for results to appear
            page.wait_for_selector("#results.active", timeout=10000)
            time.sleep(0.6)
            path3 = SCREENSHOTS_DIR / "demo-step-3-raw.png"
            page.screenshot(path=str(path3))
            print(f"Screenshot 3: {path3}")

            # --- Step 4: Scroll to diff tables ---
            page.evaluate("document.getElementById('results').scrollIntoView({behavior:'instant',block:'start'})")
            time.sleep(0.3)
            path4 = SCREENSHOTS_DIR / "demo-step-4-raw.png"
            page.screenshot(path=str(path4))
            print(f"Screenshot 4: {path4}")

            # --- Step 5: Scroll to migration ---
            migration_tab = page.query_selector("button[data-tab='migration']")
            if migration_tab:
                migration_tab.click()
                time.sleep(0.3)
            path5 = SCREENSHOTS_DIR / "demo-step-5-raw.png"
            page.screenshot(path=str(path5))
            print(f"Screenshot 5: {path5}")

            browser.close()

        # Generate overlayed frames
        raw_paths = [SCREENSHOTS_DIR / f"demo-step-{i}-raw.png" for i in range(6)]
        frame_paths = []
        for i, (raw_path, step) in enumerate(zip(raw_paths, STEPS)):
            if not raw_path.exists():
                print(f"Missing raw screenshot: {raw_path}")
                continue
            out_path = SCREENSHOTS_DIR / f"demo-step-{i}.png"
            frame = add_overlay(raw_path, step, i, len(STEPS))
            frame.save(out_path, optimize=True)
            frame_paths.append(out_path)
            print(f"Overlay frame: {out_path}")

        # Create GIF
        gif_path = ASSETS_DIR / "demo.gif"
        make_gif(frame_paths, gif_path, duration_ms=1800)

        # Save final static image (step 4 or 5 — the most impressive one)
        static_source = frame_paths[4] if len(frame_paths) > 4 else frame_paths[-1]
        static_path = ASSETS_DIR / "demo-static.png"
        Image.open(static_source).save(static_path, optimize=True)
        print(f"Static demo image: {static_path}")

        print("\nDone! Assets generated:")
        for p in sorted(ASSETS_DIR.iterdir()):
            size = p.stat().st_size
            print(f"  {p.name} ({size/1024:.1f} KB)")

    finally:
        server.send_signal(signal.SIGTERM)
        try:
            server.wait(timeout=3)
        except Exception:
            server.kill()


if __name__ == "__main__":
    main()
