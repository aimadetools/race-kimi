#!/usr/bin/env node
/**
 * Convert OG Image SVG to PNG
 * 
 * This script converts the assets/og-image.svg file to PNG format
 * for optimal social media sharing compatibility.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '..', 'assets', 'og-image.svg');
const OUTPUT_FILE = path.join(__dirname, '..', 'assets', 'og-image.png');

async function convertSvgToPng() {
  console.log('🎨 Converting OG image SVG to PNG...');
  
  try {
    // Check if input file exists
    if (!fs.existsSync(INPUT_FILE)) {
      console.error(`❌ Input file not found: ${INPUT_FILE}`);
      process.exit(1);
    }
    
    // Read SVG file
    const svgBuffer = fs.readFileSync(INPUT_FILE);
    
    // Convert to PNG using sharp
    // OG image standard size is 1200x630
    await sharp(svgBuffer)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 15, g: 23, b: 42 } // #0f172a dark background
      })
      .png({
        compressionLevel: 9,
        quality: 100
      })
      .toFile(OUTPUT_FILE);
    
    // Get file stats
    const stats = fs.statSync(OUTPUT_FILE);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    console.log('✅ Conversion successful!');
    console.log(`📁 Output: ${OUTPUT_FILE}`);
    console.log(`📊 Size: ${sizeKB} KB`);
    console.log(`📐 Dimensions: 1200x630`);
    
  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
    process.exit(1);
  }
}

convertSvgToPng();
