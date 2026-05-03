/**
 * Pre-publish script for schemalens-engine
 * Copies the latest lib/engine.js into this package so the published
 * tarball is self-contained.
 */
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'lib', 'engine.js');
const dest = path.join(__dirname, 'engine.js');

if (!fs.existsSync(src)) {
  console.error('Error: Source engine not found at', src);
  process.exit(1);
}

fs.copyFileSync(src, dest);
console.log('Copied', src, '->', dest);
