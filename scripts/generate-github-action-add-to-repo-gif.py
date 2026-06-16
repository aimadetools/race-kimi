#!/usr/bin/env python3
"""
Generate a short "Add SchemaLens to your repo" demo GIF for the GitHub Action
section of README.md and github-action.html.

Usage:
    python3 scripts/generate-github-action-add-to-repo-gif.py

Output:
    assets/github-action-add-to-repo.gif
"""

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent.parent
OUT_PATH = ROOT / "assets" / "github-action-add-to-repo.gif"
SCREENSHOT = ROOT / "assets" / "demo-gif-frames" / "06-cicd-integration.png"

WIDTH, HEIGHT = 1280, 720
DURATION_MS = 2200  # per frame
BG = (15, 23, 42)
CARD_BG = (30, 41, 59)
CARD_BORDER = (71, 85, 105)
PRIMARY = (99, 102, 241)
GREEN = (16, 185, 129)
TEXT = (226, 232, 240)
MUTED = (148, 163, 184)


def find_font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf" if bold else "/usr/share/fonts/truetype/freefont/FreeSans.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def draw_rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def load_bg():
    """Use a dark blurred version of the CI/CD page screenshot as background."""
    if SCREENSHOT.exists():
        img = Image.open(SCREENSHOT).convert("RGB")
        img = img.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
        # Darken
        overlay = Image.new("RGB", (WIDTH, HEIGHT), (0, 0, 0))
        img = Image.blend(img, overlay, 0.72)
        return img
    return Image.new("RGB", (WIDTH, HEIGHT), BG)


def add_header(draw, title, subtitle, font_title, font_sub):
    draw.text((WIDTH // 2, 38), title, font=font_title, fill=TEXT, anchor="mt")
    draw.text((WIDTH // 2, 78), subtitle, font=font_sub, fill=MUTED, anchor="mt")


def add_step_badge(draw, number, x, y, font_badge):
    r = 22
    draw.ellipse([x - r, y - r, x + r, y + r], fill=PRIMARY)
    draw.text((x, y), str(number), font=font_badge, fill=(255, 255, 255), anchor="mm")


def frame1(font_title, font_sub, font_body, font_code, font_badge):
    img = load_bg()
    draw = ImageDraw.Draw(img)
    add_header(draw, "Add SchemaLens to any repo in 30 seconds", "No YAML to write — pick the starter workflow from the Actions tab", font_title, font_sub)

    # Mock GitHub repo header
    header_h = 58
    draw.rectangle([0, 120, WIDTH, 120 + header_h], fill=(22, 30, 46))
    draw.text((40, 120 + header_h // 2), "my-org / my-database-repo", font=font_body, fill=TEXT, anchor="lm")
    tabs = ["Code", "Issues", "Pull requests", "Actions", "Projects"]
    tx = 40
    for tab in tabs:
        if tab == "Actions":
            draw.text((tx, 205), tab, font=font_body, fill=TEXT)
            tw = draw.textbbox((0, 0), tab, font=font_body)[2]
            draw.line([tx, 228, tx + tw, 228], fill=PRIMARY, width=3)
        else:
            draw.text((tx, 205), tab, font=font_body, fill=MUTED)
            tw = draw.textbbox((0, 0), tab, font=font_body)[2]
        tx += draw.textbbox((0, 0), tab, font=font_body)[2] + 50

    # New workflow button
    btn_w, btn_h = 220, 46
    btn_x, btn_y = WIDTH - btn_w - 50, 182
    draw_rounded_rect(draw, [btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], 6, PRIMARY)
    draw.text((btn_x + btn_w // 2, btn_y + btn_h // 2), "New workflow", font=font_body, fill=(255, 255, 255), anchor="mm")

    # Main content area
    card = [60, 260, WIDTH - 60, 620]
    draw_rounded_rect(draw, card, 12, CARD_BG, outline=CARD_BORDER, width=1)
    draw.text((card[0] + 30, card[1] + 30), "Workflows made for your repository", font=font_title, fill=TEXT)
    draw.text((card[0] + 30, card[1] + 72), "Suggested for this repository", font=font_sub, fill=MUTED)

    # SchemaLens template card
    tcard = [card[0] + 30, card[1] + 110, card[0] + 680, card[1] + 230]
    draw_rounded_rect(draw, tcard, 10, (30, 41, 59), outline=PRIMARY, width=2)
    # Icon
    draw.ellipse([tcard[0] + 22, tcard[1] + 22, tcard[0] + 66, tcard[1] + 66], fill=PRIMARY)
    draw.text((tcard[0] + 44, tcard[1] + 44), "SL", font=font_badge, fill=(255, 255, 255), anchor="mm")
    draw.text((tcard[0] + 90, tcard[1] + 30), "SchemaLens Schema Diff", font=font_body, fill=TEXT)
    draw.text((tcard[0] + 90, tcard[1] + 60), "Catch breaking database schema changes in every pull request.", font=font_sub, fill=MUTED)
    draw.text((tcard[0] + 90, tcard[1] + 92), "PostgreSQL · MySQL · SQLite · SQL Server · Oracle", font=font_sub, fill=MUTED)

    add_step_badge(draw, 1, 70, 300, font_badge)
    return img


def frame2(font_title, font_sub, font_body, font_code, font_badge):
    img = load_bg()
    draw = ImageDraw.Draw(img)
    add_header(draw, "The template writes the YAML for you", "Pre-configured with PR comments, Check Runs, and smart skip", font_title, font_sub)

    add_step_badge(draw, 2, 70, 300, font_badge)

    # Code editor mock
    card = [60, 130, WIDTH - 60, 640]
    draw_rounded_rect(draw, card, 12, CARD_BG, outline=CARD_BORDER, width=1)
    # Title bar
    draw.rectangle([card[0], card[1], card[2], card[1] + 42], fill=(22, 30, 46), outline=CARD_BORDER)
    draw.text((card[0] + 18, card[1] + 21), ".github/workflows/schema-diff.yml", font=font_sub, fill=TEXT, anchor="lm")

    code_lines = [
        ("comment", "# SchemaLens Schema Diff — free for every PR"),
        ("key", "name"), ("plain", ": "), ("str", "Schema Diff"),
        ("key", "on"), ("plain", ": [pull_request]"),
        ("key", "jobs"), ("plain", ":"),
        ("plain", "  "), ("key", "diff"), ("plain", ":"),
        ("plain", "    "), ("key", "runs-on"), ("plain", ": "), ("str", "ubuntu-latest"),
        ("plain", "    "), ("key", "steps"), ("plain", ":"),
        ("plain", "      - "), ("key", "uses"), ("plain", ": "), ("str", "actions/checkout@v4"),
        ("plain", "      - "), ("key", "uses"), ("plain", ": "), ("str", "aimadetools/race-kimi@main"),
        ("plain", "        "), ("key", "with"), ("plain", ":"),
        ("plain", "          "), ("key", "old-schema-path"), ("plain", ": "), ("str", "./schema/base.sql"),
        ("plain", "          "), ("key", "new-schema-path"), ("plain", ": "), ("str", "./schema/current.sql"),
        ("plain", "          "), ("key", "dialect"), ("plain", ": "), ("str", "postgres"),
        ("plain", "          "), ("key", "post-comment"), ("plain", ": "), ("str", "true"),
        ("plain", "          "), ("key", "create-check-run"), ("plain", ": "), ("str", "true"),
        ("plain", "          "), ("key", "run-only-on-schema-change"), ("plain", ": "), ("str", "true"),
        ("plain", "          "), ("key", "github-token"), ("plain", ": "), ("str", "${{ secrets.GITHUB_TOKEN }}"),
    ]

    # Pre-render colored segments
    colors = {"comment": (100, 116, 139), "key": (125, 211, 252), "str": (134, 239, 172), "plain": (226, 232, 240)}
    y = card[1] + 62
    line_height = 28
    for line in code_lines:
        x = card[0] + 28
        # line is a tuple of (type, text) segments
        i = 0
        while i < len(line):
            typ = line[i]
            txt = line[i + 1]
            draw.text((x, y), txt, font=font_code, fill=colors[typ])
            x += draw.textbbox((0, 0), txt, font=font_code)[2]
            i += 2
        y += line_height

    return img


def frame3(font_title, font_sub, font_body, font_code, font_badge):
    img = load_bg()
    draw = ImageDraw.Draw(img)
    add_header(draw, "Every PR gets a schema diff report", "Breaking changes, risk score, and full migration SQL — automatically", font_title, font_sub)

    add_step_badge(draw, 3, 70, 300, font_badge)

    # Check run mock
    card = [60, 130, WIDTH - 60, 640]
    draw_rounded_rect(draw, card, 12, CARD_BG, outline=CARD_BORDER, width=1)
    draw.text((card[0] + 28, card[1] + 28), "Pull request #42: Add email verification", font=font_title, fill=TEXT)

    # Green check
    check_y = card[1] + 90
    draw.ellipse([card[0] + 28, check_y, card[0] + 60, check_y + 32], fill=GREEN)
    draw.text((card[0] + 76, check_y + 16), "SchemaLens Schema Diff — Successful in 2s", font=font_body, fill=TEXT, anchor="lm")

    # Summary box
    box = [card[0] + 28, check_y + 50, card[2] - 28, check_y + 360]
    draw_rounded_rect(draw, box, 10, (22, 30, 46), outline=CARD_BORDER)
    draw.text((box[0] + 20, box[1] + 20), "🔍 SchemaLens Schema Diff Report", font=font_title, fill=TEXT)

    rows = [
        ("🟢 Tables Added", "1"),
        ("🔴 Tables Removed", "0"),
        ("🟡 Tables Modified", "2"),
        ("⚠️ Breaking Changes", "1"),
        ("📊 Risk Score", "42/100 (Medium)"),
    ]
    ry = box[1] + 64
    for label, value in rows:
        draw.text((box[0] + 20, ry), label, font=font_body, fill=MUTED)
        draw.text((box[2] - 20, ry), value, font=font_body, fill=TEXT, anchor="rt")
        ry += 36

    draw.text((box[0] + 20, ry + 8), "Generated Migration", font=font_title, fill=TEXT)
    code_box = [box[0] + 20, ry + 48, box[2] - 20, ry + 148]
    draw_rounded_rect(draw, code_box, 8, (15, 23, 42))
    draw.text((code_box[0] + 14, code_box[1] + 14), "ALTER TABLE users", font=font_code, fill=(226, 232, 240))
    draw.text((code_box[0] + 14, code_box[1] + 44), "  ADD COLUMN email_verified_at TIMESTAMP;", font=font_code, fill=(226, 232, 240))

    return img


def main():
    font_title = find_font(28, bold=True)
    font_sub = find_font(18)
    font_body = find_font(20)
    font_code = find_font(17)
    font_badge = find_font(20, bold=True)

    frames = [
        frame1(font_title, font_sub, font_body, font_code, font_badge),
        frame2(font_title, font_sub, font_body, font_code, font_badge),
        frame3(font_title, font_sub, font_body, font_code, font_badge),
    ]

    # Convert palette and save GIF
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        OUT_PATH,
        save_all=True,
        append_images=frames[1:],
        duration=DURATION_MS,
        loop=0,
        optimize=True,
    )

    size_kb = OUT_PATH.stat().st_size / 1024
    print(f"Created {OUT_PATH} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    main()
