#!/usr/bin/env node
/**
 * SchemaLens npm package publish helper.
 *
 * The highest-priority P0 blocker is the npm access token in
 * /home/race/.npmrc, which currently returns 401 Unauthorized. Once the
 * human replaces that token with a valid one, run this script to publish
 * the two unpublished SchemaLens packages:
 *
 *   - schemalens-diff-cli (packages/schemalens/)
 *   - schema-diff          (packages/schema-diff/)
 *
 * Usage:
 *   node scripts/publish-npm-packages.js --dry-run   # verify token + packages
 *   node scripts/publish-npm-packages.js --confirm   # publish for real
 */

const { spawnSync } = require('child_process');
const path = require('path');

const PACKAGES = [
  {
    name: 'schemalens-diff-cli',
    dir: path.join(__dirname, '..', 'packages', 'schemalens'),
  },
  {
    name: 'schema-diff',
    dir: path.join(__dirname, '..', 'packages', 'schema-diff'),
  },
];

function run(cmd, args, cwd) {
  const result = spawnSync(cmd, args, {
    cwd,
    stdio: 'pipe',
    encoding: 'utf8',
  });
  return {
    ok: result.status === 0,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
}

function checkNpmToken() {
  const result = run('npm', ['whoami']);
  if (!result.ok) {
    return {
      ok: false,
      message:
        'npm token is invalid or missing.\n' +
        '  Reason: ' + result.stderr.trim() + '\n\n' +
        'To unblock publishing:\n' +
        '  1. Log in to https://www.npmjs.com/ → Access Tokens → Generate New Token (Classic).\n' +
        '  2. Replace the token in /home/race/.npmrc, e.g.:\n' +
        '     //registry.npmjs.org/:_authToken=YOUR_NEW_TOKEN\n' +
        '  3. Re-run: node scripts/publish-npm-packages.js --confirm',
    };
  }
  return { ok: true, user: result.stdout.trim() };
}

function main() {
  const dryRun = process.argv.includes('--dry-run');
  const confirm = process.argv.includes('--confirm');

  if (!dryRun && !confirm) {
    console.log(
      'SchemaLens npm publish helper\n\n' +
      'This script publishes the two unpublished SchemaLens CLI packages.\n' +
      'Run with --dry-run to verify without publishing, or --confirm to publish.\n'
    );
    console.log('Packages to publish:');
    for (const pkg of PACKAGES) {
      console.log(`  - ${pkg.name} (${pkg.dir})`);
    }
    console.log('\nNext step: node scripts/publish-npm-packages.js --dry-run');
    process.exit(0);
  }

  const tokenCheck = checkNpmToken();
  if (!tokenCheck.ok) {
    console.error(tokenCheck.message);
    process.exit(1);
  }

  console.log(`✅ npm token valid (logged in as ${tokenCheck.user})`);

  let failed = false;
  for (const pkg of PACKAGES) {
    const pkgJsonPath = path.join(pkg.dir, 'package.json');
    const pkgData = require(pkgJsonPath);
    console.log(`\n📦 ${pkgData.name}@${pkgData.version} (${pkg.dir})`);

    const packResult = run('npm', ['pack', '--dry-run'], pkg.dir);
    if (!packResult.ok) {
      console.error(`   ❌ npm pack --dry-run failed:\n${packResult.stderr}`);
      failed = true;
      continue;
    }
    console.log('   ✅ npm pack --dry-run passed');

    if (dryRun) {
      console.log('   ⏭️  --dry-run: skipping npm publish');
      continue;
    }

    const publishResult = run('npm', ['publish', '--access', 'public'], pkg.dir);
    if (!publishResult.ok) {
      console.error(`   ❌ npm publish failed:\n${publishResult.stderr}`);
      failed = true;
      continue;
    }
    console.log(`   ✅ Published ${pkgData.name}@${pkgData.version}`);
  }

  if (failed) {
    console.error('\n❌ One or more packages failed to publish.');
    process.exit(1);
  }

  console.log(
    dryRun
      ? '\n✅ Dry run complete. Re-run with --confirm to publish.'
      : '\n🎉 All packages published successfully.'
  );
}

main();
