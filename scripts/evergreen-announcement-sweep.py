#!/usr/bin/env python3
"""
Site-wide evergreen announcement-bar sweep.
Replaces stale "Final Week" / "until July 10" copy in the first
.announcement-bar on each page with the evergreen messaging used on index.html.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NEW_ROOT = 'founding-member.html'
NEW_SUB = '../founding-member.html'
NEW_CONTENT = (
    '🚀 SchemaLens is free forever. Upgrade to <strong>Lifetime Pro for $39</strong> — or '
    '<a href="{href}" style="color:var(--success);font-weight:600;">get Pro free by sharing →</a>'
)

PATTERN = re.compile(
    r'(<div\b[^>]*\bclass="announcement-bar"[^>]*>)(.*?)(</div>)',
    re.IGNORECASE | re.DOTALL,
)


def process_file(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    if 'Final Week' not in text and 'July 10' not in text:
        return False

    def replacer(m: re.Match) -> str:
        inner = m.group(2)
        if 'Final Week' not in inner and 'July 10' not in inner:
            return m.group(0)
        href = NEW_SUB if path.parent != ROOT else NEW_ROOT
        return m.group(1) + NEW_CONTENT.format(href=href) + m.group(3)

    new_text, count = PATTERN.subn(replacer, text, count=1)
    if count and new_text != text:
        path.write_text(new_text, encoding='utf-8')
        return True
    return False


def main():
    changed = []
    for html in ROOT.rglob('*.html'):
        # Skip node_modules and .vercel just in case
        if 'node_modules' in html.parts or '.vercel' in html.parts:
            continue
        if process_file(html):
            changed.append(str(html.relative_to(ROOT)))
    if changed:
        print('Updated announcement bars in:')
        for f in sorted(changed):
            print(f'  {f}')
    else:
        print('No announcement bars needed updating.')


if __name__ == '__main__':
    main()
