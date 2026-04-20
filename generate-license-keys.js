#!/usr/bin/env node
/**
 * SchemaLens License Key Generator
 * 
 * Usage:
 *   node generate-license-keys.js [count]
 * 
 * Generates valid SchemaLens Pro license keys.
 * Keys follow format: SL-XXXX-XXXX-XXXX-XXXX
 * The last segment is a checksum of the first three segments + salt.
 */

const SALT = 'SchemaLensPro2026';
const COUNT = parseInt(process.argv[2], 10) || 10;

function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let payload = '';
  for (let i = 0; i < 12; i++) {
    payload += chars[Math.floor(Math.random() * chars.length)];
  }

  let hash = 0;
  const data = payload + SALT;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash) % 46656;
  const check = hash.toString(36).toUpperCase().padStart(4, '0');

  const parts = payload.match(/.{4}/g);
  return 'SL-' + parts.join('-') + '-' + check;
}

function validateKey(key) {
  if (!/^SL-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key)) return false;
  const parts = key.replace(/^SL-/, '').split('-');
  const payload = parts.slice(0, 3).join('');
  const check = parts[3];
  let hash = 0;
  const data = payload + SALT;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash) % 46656;
  const expected = hash.toString(36).toUpperCase().padStart(4, '0');
  return check === expected;
}

console.log('SchemaLens License Key Generator');
console.log('================================\n');

for (let i = 0; i < COUNT; i++) {
  const key = generateKey();
  const valid = validateKey(key);
  console.log(`${i + 1}. ${key} ${valid ? '✓' : '✗'}`);
}

console.log('\nStore these in your Gumroad product settings or password manager.');
console.log('Do NOT commit this file or the keys to public repositories.');
