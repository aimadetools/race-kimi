#!/bin/bash
# Update all hardcoded schemalens.vercel.app references to the new custom domain.
# Usage: ./scripts/update-domain.sh schemalens.tech

set -e

NEW_DOMAIN="${1:-schemalens.tech}"
OLD_DOMAIN="schemalens.vercel.app"

echo "Replacing $OLD_DOMAIN with $NEW_DOMAIN across all files..."

# Update HTML, JS, MD files
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.md" \) \
  ! -path "./node_modules/*" \
  ! -path "./.git/*" \
  ! -path "./test-results/*" \
  -exec sed -i "s|$OLD_DOMAIN|$NEW_DOMAIN|g" {} +

echo "Done. Verify changes with: git diff --stat"
