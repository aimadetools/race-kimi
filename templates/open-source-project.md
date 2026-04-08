# Open Source Project Template

> Crafted for open source projects. Balances technical details for contributors with accessible summaries for users.

---

## How to Use This Template

1. Copy this file to your changelog content directory
2. Update version numbers following semantic versioning
3. Credit contributors (they'll appreciate it!)
4. Link to migration guides for breaking changes
5. Build and deploy

---

## YAML Frontmatter Template

```yaml
---
date: 2026-04-08
title: "v2.5.0: Async Support, Performance Boost & Bug Fixes"
categories: ["Release", "Performance", "Breaking Changes"]
version: "2.5.0"
semver: "minor"
featured: true
---
```

---

## Entry Structure

### 🏷️ Version Header

```markdown
**Release:** v2.5.0  
**Semver Impact:** Minor (new features, backward compatible)  
**npm:** `npm install package@latest`  
**GitHub:** [View on GitHub](https://github.com/username/repo/releases/tag/v2.5.0)
```

---

### 🚀 Highlights

Summarize the 2-3 most important changes for users who just want the TL;DR.

> **Async/Await Support:** All methods now return Promises natively  
> **2x Faster:** Bundle size reduced by 40%, execution time improved  
> **TypeScript:** Full type definitions included

---

### ✨ New Features

#### Feature Name
Detailed description of what this feature does and why it's useful.

**Usage:**
```javascript
// Example code showing the new feature
const result = await newFeature({
  option: 'value'
});
```

**Documentation:** [View docs](https://docs.example.com/new-feature)

---

### ⚡ Improvements

- **Performance:** Reduced memory footprint by 30%
- **Bundle size:** Tree-shaking support added
- **Error messages:** More descriptive stack traces
- **Documentation:** 5 new code examples added

---

### 🐛 Bug Fixes

| Issue | Description | Fix |
|-------|-------------|-----|
| #123 | Memory leak in long-running processes | Properly cleanup event listeners |
| #145 | Race condition in concurrent requests | Added mutex for shared state |
| #167 | Incorrect TypeScript types for optional params | Updated type definitions |

---

### 💥 Breaking Changes

> ⚠️ **Migration Required:** These changes may break existing code.

#### Changed: Default Behavior of `config.option`
**Previous:** `config.option` defaulted to `true`  
**New:** `config.option` defaults to `false`

**Migration:**
```javascript
// Before (still works, but behavior changed)
const instance = createInstance();

// After (explicit configuration recommended)
const instance = createInstance({
  option: true  // Set explicitly
});
```

#### Removed: Deprecated `oldMethod()`
**Replacement:** Use `newMethod()` instead

---

### 📦 Dependencies

- **Added:** `dependency-name@^1.0.0` - Required for new feature X
- **Updated:** `other-package` 2.1.0 → 2.3.1
- **Removed:** `deprecated-package` (no longer needed)

---

### 🙏 Contributors

Thanks to everyone who contributed to this release!

- @username1 - Async implementation
- @username2 - Bug fixes #123, #145
- @username3 - Documentation improvements
- @username4 - TypeScript definitions

[View all contributors](https://github.com/username/repo/graphs/contributors)

---

### 🆙 Upgrade Guide

```bash
# npm
npm install package@latest

# yarn
yarn upgrade package

# pnpm
pnpm update package
```

**Check for breaking changes:**
```bash
npm test
```

---

## Full Example Entry

```markdown
---
date: 2026-04-08
title: "v2.5.0: Async Support, Performance Boost & Bug Fixes"
categories: ["Release"]
version: "2.5.0"
---

# v2.5.0: Async Support, Performance Boost & Bug Fixes

**Release:** v2.5.0  
**npm:** `npm install package@latest`  
**GitHub:** [Release Notes](https://github.com/username/repo/releases/tag/v2.5.0) | [Full Changelog](https://github.com/username/repo/compare/v2.4.0...v2.5.0)

## 🚀 Highlights

- **Native Async/Await:** All async methods now return native Promises
- **2x Performance:** Execution time improved across all operations
- **40% Smaller:** Bundle size reduced with better tree-shaking
- **Full TypeScript:** Complete type definitions included

## ✨ New Features

### Native Promise Support
All callback-based methods now support async/await out of the box.

```javascript
// New: Async/await
const data = await processData({
  input: 'value',
  options: { async: true }
});

// Old: Callbacks (still supported)
processData({ input: 'value' }, (err, data) => {
  // ...
});
```

### Streaming API
Process large datasets without loading everything into memory:

```javascript
const stream = createStream({ batchSize: 100 });

for await (const batch of stream) {
  console.log(`Processing ${batch.length} items`);
}
```

## ⚡ Improvements

- Reduced memory footprint by 30% in long-running processes
- Added automatic retry with exponential backoff
- Improved error messages with stack trace preservation
- Better support for edge runtime environments

## 🐛 Bug Fixes

- Fixed #234: Memory leak in event emitter cleanup
- Fixed #256: Race condition in concurrent file operations
- Fixed #278: Incorrect handling of Unicode filenames on Windows
- Fixed #301: Promise rejection not being caught in edge cases

## 💥 Breaking Changes

### Node.js Version Support
**Minimum Node.js version is now 16.**

Node.js 14 has reached end-of-life. Please upgrade to Node.js 16 or later.

```bash
# Check your version
node --version

# Update using nvm
nvm install 18
nvm use 18
```

### Deprecated API Removal
The following deprecated methods have been removed:

| Removed | Replacement |
|---------|-------------|
| `oldMethod()` | `newMethod()` |
| `legacyCallback()` | Use async/await |

## 📦 Dependencies

- Added: `fast-glob@^3.3.0` for improved file matching
- Updated: `minimatch` 5.0.0 → 9.0.0
- Removed: `deprecated-lib` (functionality merged into core)

## 🙏 Contributors

Special thanks to:

- @alice-dev - Async implementation and Promise support
- @bob-coder - Performance optimizations
- @charlie-ts - TypeScript improvements
- @diana-docs - Documentation updates

## 📊 Stats

- 42 commits
- 12 contributors
- 156 files changed
- +2,341 / -1,876 lines

---

**Full Changelog:** [v2.4.0...v2.5.0](https://github.com/username/repo/compare/v2.4.0...v2.5.0)
```

---

## Tips for This Template

✅ **DO:**
- Follow [Semantic Versioning](https://semver.org/)
- Always credit contributors by username
- Provide clear migration paths for breaking changes
- Include before/after code examples
- Link to related issues and PRs

❌ **DON'T:**
- Release without updating the changelog
- Forget to update version numbers in package files
- Skip testing migration paths
- Use vague descriptions like "various bug fixes"

---

## Badges & Shields

Include these at the top of your README:

```markdown
![Version](https://img.shields.io/npm/v/package-name)
![Downloads](https://img.shields.io/npm/dm/package-name)
![License](https://img.shields.io/npm/l/package-name)
![Build](https://img.shields.io/github/actions/workflow/status/username/repo/ci.yml)
```

---

*Template provided by [Changelog.page](https://changelog.page)*
