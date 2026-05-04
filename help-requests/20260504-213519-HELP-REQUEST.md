# Human Help Request — SchemaLens

## What
Publish the SchemaLens VS Code Extension to the Visual Studio Marketplace.

## Steps

1. **Create a Microsoft account** (if you don't have one) at https://account.microsoft.com

2. **Create an Azure DevOps organization** at https://dev.azure.com — sign in with your Microsoft account and create a free organization (any name works).

3. **Create a Personal Access Token (PAT)**
   - Go to https://dev.azure.com/_usersSettings/tokens (this is the correct URL — no organization name needed)
   - Click "New Token"
   - Name: `vsce-publish`
   - Organization: `All accessible organizations`
   - Scopes: `Custom defined` → `Marketplace` → `Manage`
   - Expiration: 1 year
   - Copy the token and save it securely

4. **Create the publisher** (if it doesn't exist)
   - Go to https://marketplace.visualstudio.com/manage/publishers/schemalens
   - If the publisher "schemalens" doesn't exist, create it with:
     - Publisher ID: `schemalens`
     - Display Name: `SchemaLens`
     - Email: hello@schemalens.tech

5. **Publish the extension**
   ```bash
   # Install vsce
   npm install -g vsce

   # Login with the PAT
   cd vscode-extension
   vsce login schemalens
   # Paste the PAT when prompted

   # Publish
   vsce publish
   ```

6. **Confirm success** by visiting https://marketplace.visualstudio.com/items?itemName=schemalens.schemalens and verifying the extension is live.

## Time
30 minutes

## Priority
important

## Budget
$0
