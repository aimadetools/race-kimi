#!/usr/bin/env python3
"""Generate vertical short-form videos (1080×1920) for TikTok/Reels/Shorts."""

import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from playwright.sync_api import sync_playwright

OUTDIR = os.path.join(os.path.dirname(__file__), "gallery")
os.makedirs(OUTDIR, exist_ok=True)

TEMPLATE = f"file://{os.path.abspath(os.path.join(os.path.dirname(__file__), 'video-renderer.html'))}"

VIDEO_IDS = ["01", "02", "03", "04", "05"]


def generate_video(video_id: str):
    out_path = os.path.join(OUTDIR, f"reel-{video_id}.webm")
    if os.path.exists(out_path):
        print(f"  Skipping reel-{video_id}.webm (already exists)")
        return

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1080, "height": 1920},
            record_video_dir=OUTDIR,
            record_video_size={"width": 1080, "height": 1920},
        )
        page = context.new_page()

        url = f"{TEMPLATE}?id={video_id}"
        print(f"  Loading {url} ...")
        page.goto(url, wait_until="networkidle")

        # Wait for video to finish playing (calculate total duration + buffer)
        # Each slide has a delay; add 800ms startup + 2000ms final hold
        delays = {
            "01": 2500 + 3000 + 2500 + 3000 + 3000 + 3500 + 800 + 2000,
            "02": 2500 + 3000 + 3000 + 3000 + 3500 + 800 + 2000,
            "03": 2500 + 2500 + 3000 + 3000 + 3500 + 800 + 2000,
            "04": 2500 + 2500 + 3000 + 3000 + 3500 + 800 + 2000,
            "05": 2500 + 2500 + 2500 + 2500 + 3000 + 3500 + 800 + 2000,
        }
        total_ms = delays.get(video_id, 20000)
        print(f"  Recording for {total_ms}ms ...")
        page.wait_for_timeout(total_ms)

        context.close()
        browser.close()

    # Rename the generated video to a clean filename
    videos = [f for f in os.listdir(OUTDIR) if f.endswith(".webm") and not f.startswith("reel-") and not f == "demo-video.webm"]
    if videos:
        src = os.path.join(OUTDIR, videos[0])
        os.rename(src, out_path)
        size = os.path.getsize(out_path)
        print(f"  ✓ Saved {out_path} ({size // 1024}KB)")
    else:
        print(f"  ⚠ Warning: no video file found for {video_id}")


def main():
    print("SchemaLens Reel Generator")
    print("=" * 40)
    for vid in VIDEO_IDS:
        print(f"\nGenerating reel {vid} ...")
        try:
            generate_video(vid)
        except Exception as e:
            print(f"  ✗ Error generating reel {vid}: {e}")
    print("\n" + "=" * 40)
    print("Done. Check marketing/gallery/ for output files.")


if __name__ == "__main__":
    main()
