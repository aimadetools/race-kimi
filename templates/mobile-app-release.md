# Mobile App Release Template

> Optimized for iOS and Android app updates. Highlights new features while addressing app store requirements and user onboarding.

---

## How to Use This Template

1. Copy this file to your changelog content directory
2. Update version numbers and platform-specific details
3. Write release notes suitable for both your changelog and app stores
4. Include download/update CTAs
5. Build and deploy

---

## YAML Frontmatter Template

```yaml
---
date: 2026-04-08
title: "Version 3.2: Dark Mode & Offline Support"
categories: ["iOS", "Android", "New Features"]
version: "3.2.0"
build: "3200"
platforms: ["iOS 15+", "Android 8+"]
featured: true
---
```

---

## Entry Structure

### 📱 Version Header

```markdown
**Version:** 3.2.0 (Build 3200)  
**Platforms:** iOS 15+, Android 8+  
**Release Date:** April 8, 2026  
**Update Size:** ~45 MB

[![Download on App Store](https://changelog.page/badge-app-store.png)](https://apps.apple.com/app/id1234567890)
[![Get it on Google Play](https://changelog.page/badge-google-play.png)](https://play.google.com/store/apps/details?id=com.example.app)
```

---

### ✨ What's New

Use this section for major features that will excite users.

#### Feature Name with Emoji
**The headline feature.** Describe what it does in one sentence.

- Key benefit #1
- Key benefit #2
- Key benefit #3

![Feature screenshot or GIF](https://your-cdn.com/feature-demo.gif)

---

### 🎨 New Features

List additional new features in a scannable format:

| Feature | Description | Platform |
|---------|-------------|----------|
| 🌙 Dark Mode | Automatic and manual switching | iOS & Android |
| 📴 Offline Mode | Access content without internet | iOS & Android |
| 🔍 Universal Search | Search across all content types | iOS only |
| ⚡ Quick Actions | Long-press shortcuts | Android only |

---

### ⚡ Improvements

#### Performance
- **App launch time:** 40% faster cold starts
- **Memory usage:** Reduced by 25% on average
- **Battery impact:** Background sync optimized

#### UI/UX
- Smoother scrolling in long lists
- Improved touch targets for accessibility
- Better VoiceOver/TalkBack support

---

### 🐛 Bug Fixes

**Fixed in this release:**
- Fixed crash when opening large files
- Resolved sync conflict with server
- Corrected timezone display in history
- Fixed keyboard covering input fields on small screens
- Addressed memory leak in image viewer

---

### 🔒 Security Updates

- Updated SSL certificate pinning
- Enhanced biometric authentication
- Fixed potential data exposure in logs

---

### 🔄 Update Instructions

**Automatic Updates:**
Your app will update automatically. To check manually:
- **iOS:** App Store → Profile → Pull to refresh
- **Android:** Play Store → Profile → Manage apps → Update

**Having Issues?**
Try these troubleshooting steps:
1. Force close and reopen the app
2. Restart your device
3. Uninstall and reinstall (data is cloud-synced)

---

## Full Example Entry

```markdown
---
date: 2026-04-08
title: "Version 3.2: Dark Mode & Offline Support"
categories: ["iOS", "Android", "New Features"]
version: "3.2.0"
---

# Version 3.2: Dark Mode & Offline Support

**Version:** 3.2.0 (Build 3200)  
**Platforms:** iOS 15+, Android 8+  
**Release Date:** April 8, 2026

<a href="https://apps.apple.com/app/id1234567890">
  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on App Store" height="40">
</a>
<a href="https://play.google.com/store/apps/details?id=com.example.app">
  <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" height="40">
</a>

## ✨ What's New

### 🌙 Dark Mode Has Arrived
Your eyes will thank you. Dark Mode automatically matches your system preference or can be set manually in Settings.

- Beautiful dark theme throughout the app
- OLED black option for AMOLED screens
- Scheduled switching (sunset to sunrise)

![Dark Mode Demo](https://your-cdn.com/dark-mode-demo.gif)

### 📴 Work Offline, Anywhere
No internet? No problem. Your content is now available offline.

- Automatic sync when connected
- Manual offline mode toggle
- Smart caching of frequently accessed items

---

## 🎨 More New Features

| Feature | Description |
|---------|-------------|
| 🔍 Smart Search | Find anything with our new AI-powered search |
| 📎 Rich Attachments | Support for PDFs, images, and documents |
| 🔔 Custom Notifications | Choose exactly what you want to be notified about |
| 👆 Quick Actions | Long-press app icon for shortcuts |

---

## ⚡ Improvements

- **2x faster** initial load time
- **50% smaller** app download size
- **Smoother animations** on older devices
- **Better battery life** with optimized background sync

---

## 🐛 Bug Fixes

- Fixed: App freezing when switching tabs quickly
- Fixed: Push notifications not opening correct screen
- Fixed: Data sync failing on poor connections
- Fixed: Text overlapping in landscape mode
- Fixed: Biometric unlock occasionally failing

---

## 💬 We Want Your Feedback

Love the update? Found a bug? Let us know:

- **Rate us** on the App Store or Play Store
- **Email us** at [feedback@example.com](mailto:feedback@example.com)
- **Join our beta** at [beta.example.com](https://beta.example.com)

---

*Thanks for using OurApp!* 🙏
```

---

## App Store Release Notes (Condensed)

Use this shorter version for the App Store and Google Play:

```
Version 3.2: Dark Mode & Offline Support

NEW:
🌙 Dark Mode - Automatic and manual switching
📴 Offline Mode - Access content without internet
🔍 Smart Search - AI-powered search across everything

IMPROVED:
• 2x faster load times
• 50% smaller download size
• Better battery life

FIXED:
• Fixed app freezing when switching tabs
• Fixed notification deep linking
• Fixed sync issues on poor connections

Questions? Contact us at support@example.com
```

---

## Tips for This Template

✅ **DO:**
- Lead with visual/screenshot-heavy features
- Keep app store release notes under 500 characters
- Include platform-specific badges
- Add CTAs for ratings and feedback
- Mention download size for users on limited data

❌ **DON'T:**
- Use technical jargon users won't understand
- List more than 5 bug fixes in app store notes
- Forget to test on different screen sizes
- Skip accessibility improvements in notes

---

*Template provided by [Changelog.page](https://changelog.page)*
