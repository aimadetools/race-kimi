#!/usr/bin/env node
/**
 * Generate Product Hunt screenshot assets
 * 5 images at 1200x800 for gallery
 */

const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Check if canvas is installed
try {
  require.resolve('canvas');
} catch (e) {
  console.error('❌ Canvas not installed. Run: npm install canvas');
  process.exit(1);
}

const WIDTH = 1200;
const HEIGHT = 800;
const OUTPUT_DIR = path.join(__dirname, 'screenshots');

// Colors
const COLORS = {
  bg: '#0f172a',
  bgSecondary: '#1e293b',
  primary: '#6366f1',
  primaryLight: '#818cf8',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  accent: '#22d3ee',
  success: '#22c55e',
  border: '#334155'
};

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function createGradient(ctx, x, y, width, height, color1, color2) {
  const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Screenshot 1: Hero Dashboard
function generateHeroDashboard() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Top bar
  ctx.fillStyle = COLORS.bgSecondary;
  ctx.fillRect(0, 0, WIDTH, 60);
  
  // Logo
  ctx.fillStyle = COLORS.primary;
  ctx.beginPath();
  ctx.arc(40, 30, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 18px Arial';
  ctx.fillText('Changelog.page', 65, 36);

  // Nav items
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '14px Arial';
  const navItems = ['Dashboard', 'Entries', 'Settings'];
  let navX = 700;
  navItems.forEach(item => {
    ctx.fillText(item, navX, 36);
    navX += 100;
  });

  // CTA button
  drawRoundedRect(ctx, 1050, 15, 120, 30, 6);
  ctx.fillStyle = COLORS.primary;
  ctx.fill();
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('New Entry', 1075, 35);

  // Main content area
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(50, 100, 500, 650);
  ctx.fillStyle = COLORS.bgSecondary;
  ctx.fillRect(580, 100, 570, 650);

  // Left panel - entries list
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 20px Arial';
  ctx.fillText('Recent Entries', 80, 140);

  const entries = [
    { title: 'New Team Collaboration Features', date: 'Apr 7, 2026', type: 'feature' },
    { title: 'Bug Fixes & Performance', date: 'Apr 1, 2026', type: 'fix' },
    { title: 'Public Launch 🚀', date: 'Mar 15, 2026', type: 'launch' },
    { title: 'New Themes Available', date: 'Mar 10, 2026', type: 'feature' }
  ];

  let entryY = 180;
  entries.forEach(entry => {
    drawRoundedRect(ctx, 70, entryY, 460, 80, 8);
    ctx.fillStyle = COLORS.bgSecondary;
    ctx.fill();
    
    // Type badge
    const badgeColors = { feature: COLORS.primary, fix: COLORS.accent, launch: COLORS.success };
    drawRoundedRect(ctx, 85, entryY + 15, 60, 20, 4);
    ctx.fillStyle = badgeColors[entry.type];
    ctx.fill();
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 10px Arial';
    ctx.fillText(entry.type.toUpperCase(), 95, entryY + 28);

    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 16px Arial';
    ctx.fillText(entry.title, 85, entryY + 55);
    ctx.fillStyle = COLORS.textMuted;
    ctx.font = '12px Arial';
    ctx.fillText(entry.date, 400, entryY + 55);

    entryY += 100;
  });

  // Right panel - preview
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(600, 120, 530, 610);
  
  // Preview header
  ctx.fillStyle = COLORS.primary;
  ctx.font = 'bold 24px Arial';
  ctx.fillText('Changelog', 630, 170);
  
  // Preview content
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 18px Arial';
  ctx.fillText('New Team Collaboration Features', 630, 220);
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '14px Arial';
  ctx.fillText('April 7, 2026', 630, 245);
  
  ctx.fillStyle = COLORS.text;
  ctx.font = '14px Arial';
  const previewText = [
    'Today we\'re excited to announce team',
    'collaboration features that make it easier',
    'to work together on your changelog.',
    '',
    '✨ What\'s new:',
    '• Multi-user support',
    '• Role-based permissions',
    '• Activity logging'
  ];
  let textY = 280;
  previewText.forEach(line => {
    ctx.fillText(line, 630, textY);
    textY += 24;
  });

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, '01-hero-dashboard.png'), buffer);
  console.log('✅ Generated: 01-hero-dashboard.png');
}

// Screenshot 2: Themes Comparison
function generateThemesComparison() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Title
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 32px Arial';
  ctx.fillText('Choose Your Theme', 450, 60);

  const themes = [
    { name: 'Minimal', x: 50, color: '#64748b' },
    { name: 'Cards', x: 430, color: COLORS.primary },
    { name: 'Timeline', x: 810, color: COLORS.accent }
  ];

  themes.forEach(theme => {
    // Theme card
    drawRoundedRect(ctx, theme.x, 100, 340, 650, 12);
    ctx.fillStyle = COLORS.bgSecondary;
    ctx.fill();
    ctx.strokeStyle = theme.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Theme name
    ctx.fillStyle = theme.color;
    ctx.font = 'bold 20px Arial';
    ctx.fillText(theme.name, theme.x + 20, 140);

    // Preview content based on theme
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Public Launch 🚀', theme.x + 20, 190);
    ctx.fillStyle = COLORS.textMuted;
    ctx.font = '12px Arial';
    ctx.fillText('March 15, 2026', theme.x + 20, 215);

    // Sample text
    ctx.fillStyle = COLORS.text;
    ctx.font = '14px Arial';
    if (theme.name === 'Cards') {
      drawRoundedRect(ctx, theme.x + 20, 240, 300, 100, 8);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.fillStyle = COLORS.text;
      ctx.fillText('We\'re officially live! 🎉', theme.x + 35, 280);
    } else if (theme.name === 'Timeline') {
      ctx.fillStyle = theme.color;
      ctx.beginPath();
      ctx.arc(theme.x + 30, 260, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COLORS.text;
      ctx.fillText('Launched to public', theme.x + 55, 265);
    } else {
      ctx.fillText('Clean, simple text', theme.x + 20, 260);
      ctx.fillText('with great typography.', theme.x + 20, 285);
    }

    // Select button
    drawRoundedRect(ctx, theme.x + 70, 680, 200, 45, 6);
    ctx.fillStyle = theme.color;
    ctx.fill();
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Use This Theme', theme.x + 95, 708);
  });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, '02-themes-comparison.png'), buffer);
  console.log('✅ Generated: 02-themes-comparison.png');
}

// Screenshot 3: Markdown Editor
function generateMarkdownEditor() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Header
  ctx.fillStyle = COLORS.bgSecondary;
  ctx.fillRect(0, 0, WIDTH, 60);
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 18px Arial';
  ctx.fillText('✏️ Edit Entry: New Features', 30, 38);
  ctx.fillStyle = COLORS.success;
  ctx.font = '14px Arial';
  ctx.fillText('● Auto-saved', 1050, 38);

  // Split view
  ctx.fillStyle = COLORS.bgSecondary;
  ctx.fillRect(30, 80, 560, 700);
  ctx.fillRect(610, 80, 560, 700);

  // Left panel - Markdown
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('MARKDOWN', 50, 110);
  ctx.fillStyle = '#334155';
  ctx.fillRect(30, 120, 560, 2);

  // Markdown content
  const markdown = `---
date: 2026-04-07
category: feature
title: "Team Collaboration"
---

# Team Collaboration Features

Today we're launching **team collaboration**!

## What's New

- Multi-user support
- Role-based permissions  
- Activity logging

## Getting Started

1. Go to Settings → Team
2. Invite your teammates
3. Assign roles

> 💡 Pro tip: Use @mentions 
> in comments to notify team 
> members.`;

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px monospace';
  let mdY = 150;
  markdown.split('\n').forEach(line => {
    // Syntax highlighting
    if (line.startsWith('---')) {
      ctx.fillStyle = '#64748b';
    } else if (line.startsWith('date:') || line.startsWith('title:') || line.startsWith('category:')) {
      ctx.fillStyle = '#f472b6';
    } else if (line.startsWith('#')) {
      ctx.fillStyle = '#22d3ee';
    } else if (line.startsWith('-') || line.startsWith('1.')) {
      ctx.fillStyle = '#a78bfa';
    } else if (line.startsWith('>')) {
      ctx.fillStyle = '#22c55e';
    } else if (line.includes('**')) {
      ctx.fillStyle = '#fbbf24';
    } else {
      ctx.fillStyle = '#e2e8f0';
    }
    ctx.fillText(line, 50, mdY);
    mdY += 22;
  });

  // Right panel - Preview
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('PREVIEW', 630, 110);
  ctx.fillStyle = '#334155';
  ctx.fillRect(610, 120, 560, 2);

  // Preview content
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 28px Arial';
  ctx.fillText('Team Collaboration Features', 640, 170);
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '14px Arial';
  ctx.fillText('April 7, 2026 • Feature', 640, 195);

  ctx.fillStyle = COLORS.text;
  ctx.font = '16px Arial';
  ctx.fillText('Today we\'re launching', 640, 240);
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 16px Arial';
  ctx.fillText('team collaboration!', 825, 240);

  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 18px Arial';
  ctx.fillText("What's New", 640, 290);

  const items = ['Multi-user support', 'Role-based permissions', 'Activity logging'];
  let itemY = 320;
  items.forEach(item => {
    ctx.fillStyle = COLORS.primary;
    ctx.beginPath();
    ctx.arc(650, itemY - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.text;
    ctx.font = '16px Arial';
    ctx.fillText(item, 670, itemY);
    itemY += 28;
  });

  ctx.fillStyle = COLORS.bgSecondary;
  drawRoundedRect(ctx, 640, 430, 500, 80, 8);
  ctx.fill();
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('💡 Pro tip', 660, 460);
  ctx.fillStyle = COLORS.text;
  ctx.font = '14px Arial';
  ctx.fillText('Use @mentions in comments to notify', 660, 485);
  ctx.fillText('team members.', 660, 505);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, '03-markdown-editor.png'), buffer);
  console.log('✅ Generated: 03-markdown-editor.png');
}

// Screenshot 4: Custom Domain Setup
function generateCustomDomain() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Settings sidebar
  ctx.fillStyle = COLORS.bgSecondary;
  ctx.fillRect(0, 0, 280, HEIGHT);

  // Sidebar menu
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 20px Arial';
  ctx.fillText('⚙️ Settings', 30, 50);

  const menuItems = ['General', 'Theme', 'Domain', 'Team', 'Integrations', 'Billing'];
  let menuY = 100;
  menuItems.forEach((item, i) => {
    if (item === 'Domain') {
      drawRoundedRect(ctx, 15, menuY - 25, 250, 40, 6);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.fill();
      ctx.fillStyle = COLORS.primary;
    } else {
      ctx.fillStyle = COLORS.textMuted;
    }
    ctx.font = i === 2 ? 'bold 16px Arial' : '16px Arial';
    ctx.fillText(item, 30, menuY);
    menuY += 50;
  });

  // Main content
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 28px Arial';
  ctx.fillText('Custom Domain', 320, 70);

  // Domain status card
  drawRoundedRect(ctx, 320, 100, 850, 120, 12);
  ctx.fillStyle = COLORS.bgSecondary;
  ctx.fill();
  ctx.strokeStyle = COLORS.success;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = COLORS.success;
  ctx.beginPath();
  ctx.arc(360, 145, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('✓', 355, 150);

  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 20px Arial';
  ctx.fillText('yourcompany.com/changelog', 390, 150);
  ctx.fillStyle = COLORS.success;
  ctx.font = '14px Arial';
  ctx.fillText('● Active', 390, 175);

  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '14px Arial';
  ctx.fillText('Your changelog is live on your custom domain!', 390, 200);

  // DNS Records section
  drawRoundedRect(ctx, 320, 240, 850, 400, 12);
  ctx.fillStyle = COLORS.bgSecondary;
  ctx.fill();

  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 20px Arial';
  ctx.fillText('DNS Records', 350, 280);
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '14px Arial';
  ctx.fillText('Add these records to your DNS provider:', 350, 305);

  // Table header
  ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
  drawRoundedRect(ctx, 350, 330, 790, 40, 6);
  ctx.fill();
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('Type', 370, 355);
  ctx.fillText('Name', 470, 355);
  ctx.fillText('Value', 620, 355);
  ctx.fillText('Status', 1000, 355);

  // Table rows
  const records = [
    { type: 'CNAME', name: 'changelog', value: 'cname.changelog.page', status: 'Active' },
    { type: 'A', name: '@', value: '76.76.21.21', status: 'Active' }
  ];

  let rowY = 390;
  records.forEach(record => {
    // Type badge
    drawRoundedRect(ctx, 360, rowY - 15, 70, 28, 4);
    ctx.fillStyle = record.type === 'CNAME' ? COLORS.primary : COLORS.accent;
    ctx.fill();
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 12px Arial';
    ctx.fillText(record.type, 375, rowY + 3);

    ctx.fillStyle = COLORS.text;
    ctx.font = '14px Arial';
    ctx.fillText(record.name, 470, rowY + 3);
    ctx.fillText(record.value, 620, rowY + 3);
    
    ctx.fillStyle = COLORS.success;
    ctx.fillText('● ' + record.status, 1000, rowY + 3);

    rowY += 45;
  });

  // Help text
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '14px Arial';
  ctx.fillText('Need help? Check our', 350, 510);
  ctx.fillStyle = COLORS.primary;
  ctx.fillText('DNS setup guide', 520, 510);
  ctx.fillStyle = COLORS.textMuted;
  ctx.fillText('or contact support.', 670, 510);

  // SSL Certificate section
  drawRoundedRect(ctx, 320, 560, 850, 120, 12);
  ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
  ctx.fill();
  ctx.strokeStyle = COLORS.success;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = COLORS.success;
  ctx.font = 'bold 18px Arial';
  ctx.fillText('🔒 SSL Certificate', 350, 600);
  ctx.fillStyle = COLORS.text;
  ctx.font = '14px Arial';
  ctx.fillText('Your domain is secured with a free SSL certificate from Let\'s Encrypt.', 350, 630);
  ctx.fillText('Auto-renews every 90 days.', 350, 655);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, '04-custom-domain.png'), buffer);
  console.log('✅ Generated: 04-custom-domain.png');
}

// Screenshot 5: Mobile Responsive
function generateMobileResponsive() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Title
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 32px Arial';
  ctx.fillText('Beautiful on Every Device', 380, 60);

  // Desktop preview (background)
  drawRoundedRect(ctx, 100, 100, 600, 400, 8);
  ctx.fillStyle = COLORS.bgSecondary;
  ctx.fill();
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Desktop browser chrome
  ctx.fillStyle = '#334155';
  ctx.fillRect(100, 100, 600, 30);
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.arc(125, 115, 6, 0, Math.PI * 2);
  ctx.arc(145, 115, 6, 0, Math.PI * 2);
  ctx.arc(165, 115, 6, 0, Math.PI * 2);
  ctx.fill();

  // Desktop content
  ctx.fillStyle = COLORS.primary;
  ctx.font = 'bold 20px Arial';
  ctx.fillText('Changelog', 130, 160);

  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 16px Arial';
  ctx.fillText('New Team Features', 130, 200);
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '12px Arial';
  ctx.fillText('April 7, 2026', 130, 220);

  ctx.fillStyle = COLORS.text;
  ctx.font = '12px Arial';
  ctx.fillText('Today we\'re excited to announce...', 130, 250);

  // Mobile phone preview (foreground)
  drawRoundedRect(ctx, 550, 200, 180, 350, 20);
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Phone notch
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(600, 200, 80, 25, [0, 0, 10, 10]);
  ctx.fill();

  // Phone screen
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(560, 230, 160, 290);

  // Mobile content
  ctx.fillStyle = COLORS.primary;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('Changelog', 575, 260);

  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 12px Arial';
  ctx.fillText('Team Features', 575, 295);
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '10px Arial';
  ctx.fillText('Apr 7, 2026', 575, 312);

  ctx.fillStyle = COLORS.text;
  ctx.font = '11px Arial';
  ctx.fillText('Today we\'re', 575, 340);
  ctx.fillText('excited to', 575, 355);
  ctx.fillText('announce team', 575, 370);
  ctx.fillText('collaboration...', 575, 385);

  // Tablet preview
  drawRoundedRect(ctx, 750, 120, 380, 280, 12);
  ctx.fillStyle = COLORS.bgSecondary;
  ctx.fill();
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Tablet content
  ctx.fillStyle = COLORS.primary;
  ctx.font = 'bold 18px Arial';
  ctx.fillText('Changelog', 780, 170);

  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('New Team Features', 780, 210);
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '11px Arial';
  ctx.fillText('April 7, 2026', 780, 230);

  ctx.fillStyle = COLORS.text;
  ctx.font = '12px Arial';
  ctx.fillText('Today we\'re excited to announce team', 780, 265);
  ctx.fillText('collaboration features...', 780, 285);

  // Feature list below
  const features = [
    { icon: '📱', title: 'Mobile-First', desc: 'Optimized for all screen sizes' },
    { icon: '⚡', title: 'Fast Loading', desc: 'Sub-second load times' },
    { icon: '🔍', title: 'SEO Ready', desc: 'Meta tags, Open Graph, sitemap' },
    { icon: '♿', title: 'Accessible', desc: 'WCAG 2.1 AA compliant' }
  ];

  let featX = 100;
  features.forEach(feat => {
    drawRoundedRect(ctx, featX, 550, 250, 120, 8);
    ctx.fillStyle = COLORS.bgSecondary;
    ctx.fill();

    ctx.fillStyle = COLORS.text;
    ctx.font = '24px Arial';
    ctx.fillText(feat.icon, featX + 20, 590);

    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 16px Arial';
    ctx.fillText(feat.title, featX + 60, 590);

    ctx.fillStyle = COLORS.textMuted;
    ctx.font = '14px Arial';
    ctx.fillText(feat.desc, featX + 20, 630);

    featX += 280;
  });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, '05-mobile-responsive.png'), buffer);
  console.log('✅ Generated: 05-mobile-responsive.png');
}

// Main execution
console.log('🎨 Generating Product Hunt screenshot assets...\n');

try {
  generateHeroDashboard();
  generateThemesComparison();
  generateMarkdownEditor();
  generateCustomDomain();
  generateMobileResponsive();

  console.log('\n✅ All screenshots generated!');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log('\nFiles created:');
  fs.readdirSync(OUTPUT_DIR).forEach(file => {
    console.log(`  - ${file}`);
  });
} catch (error) {
  console.error('❌ Error generating screenshots:', error.message);
  process.exit(1);
}
