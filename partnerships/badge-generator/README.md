# "Powered by Changelog.page" Badge Generator

Create embeddable badges for users to display on their websites.

---

## Badge Styles

### 1. Minimal Badge
Clean, text-only badge that fits anywhere.

![Minimal Badge Preview](minimal-badge-preview.png)

**Embed Code:**
```html
<a href="https://changelog.page/?ref=badged" target="_blank" rel="noopener" 
   style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;
          background:#1a1a2e;color:#e2e8f0;text-decoration:none;
          border-radius:6px;font-family:system-ui,sans-serif;font-size:13px;
          border:1px solid #2d3748;transition:all 0.2s;"
   onmouseover="this.style.background='#252542'"
   onmouseout="this.style.background='#1a1a2e'">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
       stroke-width="2" style="color:#6366f1">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
  Changelog by Changelog.page
</a>
```

### 2. Modern Badge
With gradient and icon, stands out more.

![Modern Badge Preview](modern-badge-preview.png)

**Embed Code:**
```html
<a href="https://changelog.page/?ref=badged" target="_blank" rel="noopener" 
   style="display:inline-flex;align-items:center;gap:8px;padding:8px 16px;
          background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);
          color:#e2e8f0;text-decoration:none;border-radius:8px;
          font-family:system-ui,sans-serif;font-size:14px;font-weight:500;
          box-shadow:0 2px 8px rgba(99,102,241,0.2);
          border:1px solid rgba(99,102,241,0.3);transition:all 0.2s;"
   onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(99,102,241,0.3)'"
   onmouseout="this.style.transform='none';this.style.boxShadow='0 2px 8px rgba(99,102,241,0.2)'">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
       style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);border-radius:4px;padding:2px">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
          stroke="white" stroke-width="2" fill="none"/>
    <polyline points="14 2 14 8 20 8" stroke="white" stroke-width="2" fill="none"/>
    <line x1="16" y1="13" x2="8" y2="13" stroke="white" stroke-width="2"/>
    <line x1="16" y1="17" x2="8" y2="17" stroke="white" stroke-width="2"/>
  </svg>
  Powered by Changelog.page
</a>
```

### 3. Compact Badge
Small, for footers and tight spaces.

![Compact Badge Preview](compact-badge-preview.png)

**Embed Code:**
```html
<a href="https://changelog.page/?ref=badged" target="_blank" rel="noopener" 
   style="display:inline-flex;align-items:center;gap:4px;font-size:12px;
          color:#64748b;text-decoration:none;font-family:system-ui,sans-serif;
          transition:color 0.2s;"
   onmouseover="this.style.color='#6366f1'"
   onmouseout="this.style.color='#64748b'">
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
  Changelog.page
</a>
```

### 4. Dark Mode Badge
Optimized for dark backgrounds.

![Dark Badge Preview](dark-badge-preview.png)

**Embed Code:**
```html
<a href="https://changelog.page/?ref=badged" target="_blank" rel="noopener" 
   style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;
          background:rgba(255,255,255,0.1);color:#f1f5f9;text-decoration:none;
          border-radius:6px;font-family:system-ui,sans-serif;font-size:13px;
          border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(10px);
          transition:all 0.2s;"
   onmouseover="this.style.background='rgba(255,255,255,0.15)'"
   onmouseout="this.style.background='rgba(255,255,255,0.1)'">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
  </svg>
  Changelog.page
</a>
```

---

## Static Image Badges

For platforms that don't support HTML (GitHub READMEs, etc.):

### Markdown

```markdown
[![Changelog](https://changelog.page/badge.svg)](https://changelog.page/?ref=badged)
```

### HTML (for sites that strip JS)

```html
<a href="https://changelog.page/?ref=badged" target="_blank">
  <img src="https://changelog.page/badge.svg" alt="Powered by Changelog.page" width="150" height="30">
</a>
```

---

## Customization

### Change Colors

Update these CSS properties:

| Property | Description | Default |
|----------|-------------|---------|
| `background` | Badge background | `#1a1a2e` |
| `color` | Text color | `#e2e8f0` |
| `border` | Border style | `1px solid #2d3748` |

### Change Text

Replace the text inside the `<a>` tag:

```html
<a ...>
  <svg ...>...</svg>
  Your Custom Text Here
</a>
```

### Change Size

Adjust `padding`, `font-size`, and icon `width`/`height`:

```html
<!-- Larger badge -->
<a style="padding:12px 20px;font-size:16px;" ...>
  <svg width="20" height="20" ...>...</svg>
  Powered by Changelog.page
</a>
```

---

## Placement Recommendations

### Footer
Use **Compact** or **Minimal** badge:

```html
<footer>
  <p>&copy; 2026 Your Company</p>
  <p>[Compact Badge Here]</p>
</footer>
```

### Changelog Page Header
Use **Modern** badge:

```html
<header style="display:flex;justify-content:space-between;align-items:center;">
  <h1>What's New</h1>
  [Modern Badge Here]
</header>
```

### GitHub README
Use static image badge:

```markdown
## Changelog

See what's new: [changelog.yoursite.com](https://changelog.yoursite.com)

[![Changelog](https://changelog.page/badge.svg)](https://changelog.page/?ref=badged)
```

---

## Tracking

All badges include `?ref=badged` parameter for tracking:

- Badge clicks show in analytics as "badged" referrer
- Helps measure badge effectiveness
- Future: Individual badge tracking per user

---

## Accessibility

All badges include:

- Sufficient color contrast (WCAG AA compliant)
- `aria-label` support (add if needed)
- Focus states for keyboard navigation
- Semantic HTML (`<a>` element)

To add ARIA label:

```html
<a href="..." aria-label="Powered by Changelog.page - Click to learn more" ...>
  ...
</a>
```

---

## Future Features

Planned badge generator improvements:

- [ ] Interactive generator (choose colors, size, text)
- [ ] Dynamic badge with live changelog stats
- [ ] Animated badges (subtle hover effects)
- [ ] Badge with unread count (for embeddable widgets)

---

## Examples

See real-world examples:
- [Example 1: SaaS Startup](https://example.com)
- [Example 2: Open Source Project](https://example.com)
- [Example 3: Indie Hacker Product](https://example.com)

---

*Last updated: 2026-04-08*
