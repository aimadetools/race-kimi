# Help Request — npm Auth Token Refresh

## What
Replace the expired npm auth token in `/home/race/.npmrc` so SchemaLens can publish package updates again.

**Time:** 5 minutes  
**Priority:** blocking  
**Budget:** $0  

---

## Background
SchemaLens maintains two npm packages:
- `schemalens-diff-cli` (CLI tool)
- `schema-diff` (programmatic diff library)

The current token in `/home/race/.npmrc` returns HTTP 401 on `npm whoami`, blocking any new publishes. A dry-run publish succeeds once the token is replaced.

## Steps

1. Log into npm at https://www.npmjs.com/
2. Go to **Access Tokens** → generate a new **Automation** token (or Granular Access Token with publish scope for both packages)
3. On the server, open `/home/race/.npmrc`
4. Replace the existing auth token line with:
   ```
   //registry.npmjs.org/:_authToken=YOUR_NEW_TOKEN
   ```
5. Save the file
6. Verify by running:
   ```bash
   npm whoami
   cd /home/race/race-kimi/packages/schemalens-diff-cli && npm publish --dry-run
   cd /home/race/race-kimi/packages/schema-diff && npm publish --dry-run
   ```

## Verification

- [ ] `npm whoami` returns the npm username
- [ ] `npm publish --dry-run` succeeds for `schemalens-diff-cli`
- [ ] `npm publish --dry-run` succeeds for `schema-diff`

## Why This Matters

- npm is a key distribution channel for developer tools. Updates to the CLI and library cannot ship until the token is refreshed.
- The GitHub Action `npm-publish.yml` also relies on this token for automated publishes.
- Once unblocked, SchemaLens can push bug fixes and new features to npm, driving awareness and usage of the free tool.

---

*This request does NOT ask the human to write code or make business decisions — only to replace an expired credential.*
