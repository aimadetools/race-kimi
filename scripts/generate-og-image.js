#!/usr/bin/env node
/**
 * Generate Open Graph image for Changelog.page
 * Standard OG size: 1200x630
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;

// Colors from the design system
const COLORS = {
  bg: '#0f172a',
  bgSecondary: '#1e293b',
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
};

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// Background with gradient
const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
gradient.addColorStop(0, COLORS.bg);
gradient.addColorStop(1, '#1a1f35');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Add subtle pattern
ctx.fillStyle = 'rgba(99, 102, 241, 0.03)';
for (let i = 0; i < WIDTH; i += 40) {
  ctx.fillRect(i, 0, 1, HEIGHT);
}
for (let i = 0; i < HEIGHT; i += 40) {
  ctx.fillRect(0, i, WIDTH, 1);
}

// Logo icon (document with lines)
const logoX = 120;
const logoY = 100;
const logoSize = 80;

// Logo background
ctx.fillStyle = COLORS.primary;
ctx.beginPath();
ctx.roundRect(logoX, logoY, logoSize, logoSize, 16);
ctx.fill();

// Logo inner lines (representing a document)
ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
ctx.beginPath();
ctx.roundRect(logoX + 20, logoY + 22, 40, 6, 3);
ctx.fill();
ctx.beginPath();
ctx.roundRect(logoX + 20, logoY + 36, 30, 6, 3);
ctx.fill();
ctx.beginPath();
ctx.roundRect(logoX + 20, logoY + 50, 35, 6, 3);
ctx.fill();

// Title
ctx.fillStyle = COLORS.text;
ctx.font = 'bold 72px Arial, sans-serif';
ctx.textAlign = 'left';
ctx.fillText('Changelog.page', 120, 280);

// Tagline
ctx.fillStyle = COLORS.textSecondary;
ctx.font = '36px Arial, sans-serif';
ctx.fillText('Beautiful changelogs for SaaS products', 120, 350);

// Feature pills
const pills = ['Markdown Powered', '3 Themes', 'RSS Feeds', 'Free to Start'];
let pillX = 120;
const pillY = 420;

ctx.font = '20px Arial, sans-serif';
pills.forEach((pill, index) => {
  const textWidth = ctx.measureText(pill).width;
  const pillWidth = textWidth + 32;
  const pillHeight = 44;
  
  // Pill background
  ctx.fillStyle = index === 0 ? COLORS.primary : COLORS.bgSecondary;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 22);
  ctx.fill();
  
  // Pill text
  ctx.fillStyle = COLORS.text;
  ctx.textAlign = 'left';
  ctx.fillText(pill, pillX + 16, pillY + 30);
  
  pillX += pillWidth + 16;
});

// Bottom accent line
ctx.strokeStyle = COLORS.primary;
ctx.lineWidth = 4;
ctx.beginPath();
ctx.moveTo(120, 520);
ctx.lineTo(320, 520);
ctx.stroke();

// Website URL
ctx.fillStyle = COLORS.textSecondary;
ctx.font = '24px Arial, sans-serif';
ctx.fillText('changelog.page', 120, 560);

// Save the image
const outputPath = path.join(__dirname, '..', 'og-image.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outputPath, buffer);

console.log(`✅ OG image generated: ${outputPath}`);
console.log(`   Dimensions: ${WIDTH}x${HEIGHT}`);
