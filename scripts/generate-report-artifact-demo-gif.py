#!/usr/bin/env python3
"""
Generate a 30-second demo GIF showing the SchemaLens HTML report artifact
being downloaded from a GitHub PR and opened offline.

Usage:
    python3 scripts/generate-report-artifact-demo-gif.py

Output:
    assets/schema-diff-report-demo.gif
"""

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent.parent
OUT_PATH = ROOT / "assets" / "schema-diff-report-demo.gif"

WIDTH, HEIGHT = 1280, 720
DURATION_MS = 5000  # 6 frames × 5s = 30s
BG = (15, 23, 42)
CARD_BG = (30, 41, 59)
CARD_BORDER = (71, 85, 105)
PRIMARY = (99, 102, 241)
GREEN = (16, 185, 129)
RED = (239, 68, 68)
AMBER = (245, 158, 11)
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
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def new_frame():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG)
    return img, ImageDraw.Draw(img)


def add_header(draw, title, subtitle, font_title, font_sub):
    draw.text((WIDTH // 2, 34), title, font=font_title, fill=TEXT, anchor="mt")
    draw.text((WIDTH // 2, 72), subtitle, font=font_sub, fill=MUTED, anchor="mt")


def add_step_badge(draw, number, x, y, font_badge):
    r = 22
    draw.ellipse([x - r, y - r, x + r, y + r], fill=PRIMARY)
    draw.text((x, y), str(number), font=font_badge, fill=(255, 255, 255), anchor="mm")


def frame1_github_pr(font_title, font_sub, font_body, font_small, font_badge):
    img, draw = new_frame()
    add_header(draw, "Every PR gets a schema diff report", "SchemaLens runs in GitHub Actions and creates a Check Run", font_title, font_sub)

    # Mock GitHub PR header
    draw.rectangle([0, 108, WIDTH, 174], fill=(22, 30, 46))
    draw.text((40, 141), "my-org / my-database-repo", font=font_body, fill=MUTED, anchor="lm")
    draw.text((WIDTH - 40, 141), "Pull request #42", font=font_body, fill=TEXT, anchor="rm")

    # PR title
    draw.text((40, 200), "Add email verification to users", font=font_title, fill=TEXT)
    draw.text((40, 242), "opened by sarah-chen · 2 commits · +45 −12", font=font_small, fill=MUTED)

    # Tabs
    tabs = [("Conversation", False), ("Commits", False), ("Checks", True), ("Files changed", False)]
    tx = 40
    for tab, active in tabs:
        color = TEXT if active else MUTED
        draw.text((tx, 290), tab, font=font_body, fill=color)
        tw = draw.textbbox((0, 0), tab, font=font_body)[2]
        if active:
            draw.line([tx, 318, tx + tw, 318], fill=PRIMARY, width=3)
        tx += tw + 50

    # Check run card
    card = [40, 350, WIDTH - 40, 640]
    draw_rounded_rect(draw, card, 12, CARD_BG, outline=CARD_BORDER, width=1)
    draw.text((card[0] + 28, card[1] + 24), "SchemaLens Schema Diff", font=font_title, fill=TEXT)
    draw.ellipse([card[0] + 28, card[1] + 72, card[0] + 60, card[1] + 104], fill=GREEN)
    draw.text((card[0] + 76, card[1] + 88), "Successful in 3s", font=font_body, fill=TEXT, anchor="lm")

    # Report artifact row (highlighted)
    row = [card[0] + 28, card[1] + 130, card[2] - 28, card[1] + 196]
    draw_rounded_rect(draw, row, 8, (30, 41, 59), outline=PRIMARY, width=2)
    draw.text((row[0] + 20, row[1] + 20), "📄 schemalens-report.html", font=font_body, fill=TEXT)
    draw.text((row[0] + 20, row[1] + 52), "Self-contained HTML report artifact", font=font_small, fill=MUTED)
    btn = [row[2] - 150, row[1] + 14, row[2] - 20, row[1] + 56]
    draw_rounded_rect(draw, btn, 6, PRIMARY)
    draw.text((btn[0] + (btn[2] - btn[0]) // 2, btn[1] + (btn[3] - btn[1]) // 2), "Download", font=font_body, fill=(255, 255, 255), anchor="mm")

    # Secondary artifacts
    draw.text((card[0] + 28, card[1] + 220), "📄 migration.sql", font=font_body, fill=MUTED)
    draw.text((card[0] + 28, card[1] + 258), "📄 rollback.sql", font=font_body, fill=MUTED)

    add_step_badge(draw, 1, 70, 400, font_badge)
    return img


def frame2_downloading(font_title, font_sub, font_body, font_small, font_badge):
    img, draw = new_frame()
    add_header(draw, "Download the report with one click", "The artifact is attached to the workflow run — no auth needed", font_title, font_sub)

    # Browser download bar mock
    draw.rectangle([0, HEIGHT - 80, WIDTH, HEIGHT], fill=(22, 30, 46))
    draw.text((40, HEIGHT - 40), "⬇ schemalens-report.html", font=font_body, fill=TEXT, anchor="lm")
    draw.text((360, HEIGHT - 40), "142 KB · Done", font=font_small, fill=GREEN, anchor="lm")
    draw.text((WIDTH - 120, HEIGHT - 40), "Show in folder", font=font_small, fill=PRIMARY, anchor="lm")

    # Large file icon in center
    cx, cy = WIDTH // 2, HEIGHT // 2 - 40
    file_rect = [cx - 140, cy - 90, cx + 140, cy + 90]
    draw_rounded_rect(draw, file_rect, 16, CARD_BG, outline=PRIMARY, width=3)
    # Page curl
    draw.polygon([(file_rect[2] - 56, file_rect[1]), (file_rect[2], file_rect[1]), (file_rect[2], file_rect[1] + 56)], fill=(51, 65, 85))
    draw.polygon([(file_rect[2] - 56, file_rect[1]), (file_rect[2] - 56, file_rect[1] + 56), (file_rect[2], file_rect[1] + 56)], fill=(71, 85, 105))
    draw.text((cx, cy - 10), "📄", font=font_title, fill=TEXT, anchor="mm")
    draw.text((cx, cy + 42), "schemalens-report.html", font=font_body, fill=TEXT, anchor="mm")
    draw.text((cx, cy + 76), "Self-contained · Works offline", font=font_small, fill=MUTED, anchor="mm")

    add_step_badge(draw, 2, 70, 340, font_badge)
    return img


def frame3_opened_summary(font_title, font_sub, font_body, font_small, font_code, font_badge):
    img, draw = new_frame()
    add_header(draw, "Open the report — no server required", "One HTML file with inline CSS, JS, and SQL syntax highlighting", font_title, font_sub)

    # Browser chrome
    chrome = [40, 108, WIDTH - 40, 660]
    draw_rounded_rect(draw, chrome, 12, CARD_BG, outline=CARD_BORDER, width=1)
    draw.rectangle([chrome[0], chrome[1], chrome[2], chrome[1] + 44], fill=(22, 30, 46), outline=CARD_BORDER)
    draw.ellipse([chrome[0] + 16, chrome[1] + 14, chrome[0] + 30, chrome[1] + 28], fill=RED)
    draw.ellipse([chrome[0] + 36, chrome[1] + 14, chrome[0] + 50, chrome[1] + 28], fill=AMBER)
    draw.ellipse([chrome[0] + 56, chrome[1] + 14, chrome[0] + 70, chrome[1] + 28], fill=GREEN)
    draw.text((chrome[0] + 90, chrome[1] + 22), "file:///Downloads/schemalens-report.html", font=font_small, fill=MUTED, anchor="lm")

    body_y = chrome[1] + 64
    draw.text((chrome[0] + 28, body_y), "SchemaLens Schema Diff Report", font=font_title, fill=TEXT)
    draw.text((chrome[0] + 28, body_y + 38), "my-org/my-database-repo · pull/42 · commit a1b2c3d", font=font_small, fill=MUTED)

    # Summary cards
    cards = [
        ("2", "Tables Added", GREEN),
        ("1", "Tables Removed", RED),
        ("4", "Tables Modified", AMBER),
        ("1", "Breaking Changes", RED),
    ]
    cw = (chrome[2] - chrome[0] - 70) // 4
    for i, (num, label, color) in enumerate(cards):
        x = chrome[0] + 28 + i * (cw + 14)
        c = [x, body_y + 80, x + cw, body_y + 170]
        draw_rounded_rect(draw, c, 8, (22, 30, 46), outline=CARD_BORDER)
        draw.text(((c[0] + c[2]) // 2, c[1] + 24), num, font=font_title, fill=color, anchor="mt")
        draw.text(((c[0] + c[2]) // 2, c[1] + 66), label, font=font_small, fill=MUTED, anchor="mt")

    # Risk score badge
    draw.rounded_rectangle([chrome[2] - 180, body_y + 10, chrome[2] - 28, body_y + 56], radius=20, fill=(239, 68, 68, 30), outline=RED, width=2)
    draw.text((chrome[2] - 104, body_y + 33), "Risk 42/100", font=font_body, fill=TEXT, anchor="mm")

    add_step_badge(draw, 3, 70, 320, font_badge)
    return img


def frame4_migration_sql(font_title, font_sub, font_body, font_small, font_code, font_badge):
    img, draw = new_frame()
    add_header(draw, "Forward migration SQL, ready to run", "Copy-paste the generated ALTER TABLE script in your dialect", font_title, font_sub)

    chrome = [40, 108, WIDTH - 40, 660]
    draw_rounded_rect(draw, chrome, 12, CARD_BG, outline=CARD_BORDER, width=1)

    # Code block title
    title_bar = [chrome[0] + 28, chrome[1] + 28, chrome[2] - 28, chrome[1] + 74]
    draw_rounded_rect(draw, title_bar, 8, (22, 30, 46), outline=CARD_BORDER)
    draw.text((title_bar[0] + 16, title_bar[1] + 23), "migration.sql", font=font_body, fill=TEXT, anchor="lm")

    # Code area
    code_box = [chrome[0] + 28, chrome[1] + 90, chrome[2] - 28, chrome[3] - 28]
    draw_rounded_rect(draw, code_box, 8, (15, 23, 42))

    lines = [
        ((100, 116, 139), "-- Generated by SchemaLens"),
        ((100, 116, 139), "-- Dialect: postgresql"),
        (None, ""),
        ((192, 132, 252), "ALTER TABLE "), ((226, 232, 240), "users"),
        ((192, 132, 252), "ADD COLUMN "), ((226, 232, 240), "email_verified_at "),
        ((192, 132, 252), "TIMESTAMP"), ((226, 232, 240), ";"),
        (None, ""),
        ((192, 132, 252), "ALTER TABLE "), ((226, 232, 240), "orders"),
        ((192, 132, 252), "DROP COLUMN "), ((226, 232, 240), "legacy_notes;"),
    ]
    y = code_box[1] + 24
    x = code_box[0] + 24
    for color, text in lines:
        if color is None:
            y += 26
            x = code_box[0] + 24
            continue
        draw.text((x, y), text, font=font_code, fill=color)
        x += draw.textbbox((0, 0), text, font=font_code)[2]
        # simple line wrap simulation
        if x > code_box[2] - 40:
            x = code_box[0] + 24
            y += 28
    add_step_badge(draw, 4, 70, 320, font_badge)
    return img


def frame5_breaking_changes(font_title, font_sub, font_body, font_small, font_badge):
    img, draw = new_frame()
    add_header(draw, "Breaking changes are flagged first", "Reviewers see severity and affected tables instantly", font_title, font_sub)

    chrome = [40, 108, WIDTH - 40, 660]
    draw_rounded_rect(draw, chrome, 12, CARD_BG, outline=CARD_BORDER, width=1)
    draw.text((chrome[0] + 28, chrome[1] + 28), "⚠️ Breaking Changes", font=font_title, fill=TEXT)

    rows = [
        ("HIGH", "DROP COLUMN orders.legacy_notes", "Data loss — column contains production data"),
        ("MEDIUM", "MODIFY COLUMN users.phone VARCHAR(20) → TEXT", "May affect indexes and application validation"),
    ]
    y = chrome[1] + 84
    for severity, title, desc in rows:
        color = RED if severity == "HIGH" else AMBER
        row = [chrome[0] + 28, y, chrome[2] - 28, y + 96]
        draw_rounded_rect(draw, row, 8, (22, 30, 46), outline=CARD_BORDER)
        draw.rounded_rectangle([row[0] + 16, row[1] + 16, row[0] + 76, row[1] + 40], radius=4, fill=color)
        draw.text((row[0] + 46, row[1] + 28), severity, font=font_small, fill=(255, 255, 255), anchor="mm")
        draw.text((row[0] + 96, row[1] + 26), title, font=font_body, fill=TEXT, anchor="lm")
        draw.text((row[0] + 96, row[1] + 58), desc, font=font_small, fill=MUTED, anchor="lm")
        y += 116

    # Rollback mention
    draw.text((chrome[0] + 28, y + 20), "📄 rollback.sql is also included to reverse every change.", font=font_body, fill=MUTED)

    add_step_badge(draw, 5, 70, 300, font_badge)
    return img


def frame6_share(font_title, font_sub, font_body, font_small, font_badge):
    img, draw = new_frame()
    add_header(draw, "Share the report with your team", "Attach it to tickets, post in Slack, or archive for compliance", font_title, font_sub)

    # Chat / thread mock
    card = [40, 120, WIDTH - 40, 640]
    draw_rounded_rect(draw, card, 12, CARD_BG, outline=CARD_BORDER, width=1)
    draw.text((card[0] + 28, card[1] + 24), "#database-migrations", font=font_title, fill=TEXT)

    # Message bubbles
    bubble1 = [card[0] + 28, card[1] + 80, card[0] + 580, card[1] + 180]
    draw_rounded_rect(draw, bubble1, 12, (22, 30, 46))
    draw.text((bubble1[0] + 20, bubble1[1] + 16), "sarah-chen", font=font_body, fill=PRIMARY)
    draw.text((bubble1[0] + 20, bubble1[1] + 52), "PR #42 has one breaking change —", font=font_body, fill=TEXT)
    draw.text((bubble1[0] + 20, bubble1[1] + 84), "dropping legacy_notes. Report attached.", font=font_body, fill=TEXT)

    bubble2 = [card[0] + 28, card[1] + 210, card[0] + 420, card[1] + 290]
    draw_rounded_rect(draw, bubble2, 12, (22, 30, 46), outline=PRIMARY, width=1)
    draw.text((bubble2[0] + 20, bubble2[1] + 20), "📄 schemalens-report.html", font=font_body, fill=TEXT)
    draw.text((bubble2[0] + 20, bubble2[1] + 54), "Risk 42/100 · 1 breaking change", font=font_small, fill=MUTED)

    bubble3 = [card[2] - 480, card[1] + 330, card[2] - 28, card[1] + 410]
    draw_rounded_rect(draw, bubble3, 12, PRIMARY)
    draw.text((bubble3[0] + 20, bubble3[1] + 20), "alex-dba", font=font_body, fill=(255, 255, 255))
    draw.text((bubble3[0] + 20, bubble3[1] + 54), "Good catch — let's add a data export step", font=font_body, fill=(255, 255, 255))

    # CTA
    cta = [card[0] + 28, card[3] - 90, card[2] - 28, card[3] - 28]
    draw_rounded_rect(draw, cta, 8, (30, 41, 59), outline=PRIMARY, width=2)
    draw.text((cta[0] + 20, cta[1] + 20), "Add this to your repo → set upload-report: true in the SchemaLens GitHub Action", font=font_body, fill=TEXT)

    add_step_badge(draw, 6, 70, 260, font_badge)
    return img


def main():
    font_title = find_font(26, bold=True)
    font_sub = find_font(18)
    font_body = find_font(19)
    font_small = find_font(15)
    font_code = find_font(17)
    font_badge = find_font(20, bold=True)

    frames = [
        frame1_github_pr(font_title, font_sub, font_body, font_small, font_badge),
        frame2_downloading(font_title, font_sub, font_body, font_small, font_badge),
        frame3_opened_summary(font_title, font_sub, font_body, font_small, font_code, font_badge),
        frame4_migration_sql(font_title, font_sub, font_body, font_small, font_code, font_badge),
        frame5_breaking_changes(font_title, font_sub, font_body, font_small, font_badge),
        frame6_share(font_title, font_sub, font_body, font_small, font_badge),
    ]

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
