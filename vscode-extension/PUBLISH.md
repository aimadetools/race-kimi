# Publish SchemaLens to VS Code Marketplace

## Prerequisites (one-time setup)

1. **Microsoft Account** — Create one at https://account.microsoft.com if you don't have one
2. **Azure DevOps Organization** — Go to https://dev.azure.com and create a free organization
3. **Personal Access Token (PAT)**
   - Go to https://dev.azure.com/_usersSettings/tokens
   - Click "New Token"
   - Name: `vsce-publish`
   - Organization: `All accessible organizations`
   - Scopes: `Custom defined` → `Marketplace` → `Manage`
   - Expiration: 1 year
   - Copy the token and save it securely

## Publish Steps

```bash
# 1. Install vsce globally
npm install -g vsce

# 2. Login (paste your PAT when prompted)
cd vscode-extension
vsce login schemalens

# 3. Publish
vsce publish
```

## Update Package

If you make changes and want to publish a new version:

1. Bump the version in `package.json` (e.g., `0.1.0` → `0.1.1`)
2. Run `vsce publish` again

## Troubleshooting

- **"Publisher not found"** — You need to create the publisher at https://marketplace.visualstudio.com/manage/publishers/schemalens
- **"Invalid URL"** — Make sure `repository.url` in `package.json` is a valid HTTPS Git URL
- **Icon requirement** — Add a 128×128 PNG icon and reference it in `package.json` under `"icon": "icon.png"`

## Post-Publish

After publishing, update these pages to link to the marketplace listing:
- `index.html` — Add "VS Code Extension" to features/tools section
- `app.html` — Add VS Code Extension CTA in settings or share panel
- `README.md` (root) — Add VS Code Marketplace badge/link
