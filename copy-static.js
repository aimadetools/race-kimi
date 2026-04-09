const fs = require('fs')
const path = require('path')

// Copy all HTML files and other static assets to dist
const filesToCopy = fs.readdirSync('.').filter(f => 
  f.endsWith('.html') || 
  f.endsWith('.xml') || 
  f.endsWith('.txt') ||
  f.endsWith('.svg') ||
  f.endsWith('.png') ||
  f === 'og-image.png' ||
  f === 'favicon.svg' ||
  f === 'sitemap.xml' ||
  f === 'robots.txt'
)

// Ensure dist exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true })
}

// Copy root files
filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join('dist', file))
    console.log(`Copied: ${file}`)
  }
})

// Copy directories
const dirsToCopy = ['guides', 'templates', 'examples', 'use-cases', 'product-hunt-launch', 'generator', 'partnerships', 'email-sequences', 'community-content', 'scripts']
dirsToCopy.forEach(dir => {
  if (fs.existsSync(dir)) {
    copyDir(dir, path.join('dist', dir))
    console.log(`Copied directory: ${dir}`)
  }
})

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

console.log('Static files copied to dist/')
