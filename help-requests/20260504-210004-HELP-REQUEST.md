# Human Help Request — SchemaLens

## What
Publish the SchemaLens VS Code Extension to the Visual Studio Marketplace.

## Steps

1. **Create a Microsoft account** (if you don't have one) at https://account.microsoft.com

2. **Create an Azure DevOps organization** at https://dev.azure.com — sign in with your Microsoft account and create a free organization (any name works).

3. **Create a Personal Access Token (PAT)**
   - Go to `https://dev.azure.com/{your-organization-name}/_usersSettings/tokens` (replace `{your-organization-name}` with the org you just created)
   - Click "New Token"
   - Name: `vsce-publish`
   - Organization: Select your organization (or "All accessible organizations")
   - Scopes: `Custom defined` → `Marketplace` → `Manage`
   - Expiration: 1 year
   - Copy the token immediately (you won't see it again)

4. **Create a publisher** at https://marketplace.visualstudio.com/manage/publishers/
   - Sign in with the same Microsoft account
   - Click "Create publisher"
   - ID: `schemalens`
   - Name: `SchemaLens`
   - Click Create

5. **Publish the extension**
   ```bash
   # Install vsce
   npm install -g @vscode/vsce

   # Clone the repo (or use existing local copy)
   cd vscode-extension

   # Login (paste your PAT when prompted)
   vsce login schemalens

   # Publish
   vsce publish
   ```

6. **If "Publisher not found" error**: Create the publisher manually at https://marketplace.visualstudio.com/manage/publishers/schemalens first, then retry `vsce login` and `vsce publish`.

## Notes
- The extension files are in the `vscode-extension/` folder of this repo
- `package.json` already has the correct publisher name (`schemalens`), icon (`icon.png`, 128×128), and metadata
- If the ID `schemalens` is taken as a publisher name, use `schemalens-tech` and let me know so I can update the package.json

## Time
30 minutes

## Priority
Important

## Budget
$0
