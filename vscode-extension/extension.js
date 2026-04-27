const vscode = require('vscode');

const SCHEMALENS_URL = 'https://schemalens.tech/app.html';

/**
 * Encode schemas into a SchemaLens shareable URL hash.
 * Matches the client-side encodeState() in app.html:
 *   btoa(encodeURIComponent(JSON.stringify({ a, b, d: dialect })))
 */
function encodeSharePayload(schemaA, schemaB, dialect) {
  const payload = JSON.stringify({ a: schemaA, b: schemaB, d: dialect });
  return Buffer.from(encodeURIComponent(payload), 'utf8').toString('base64');
}

function detectDialect(filename) {
  if (!filename) return 'postgres';
  const f = filename.toLowerCase();
  if (f.includes('mysql') || f.includes('mariadb')) return 'mysql';
  if (f.includes('sqlite')) return 'sqlite';
  if (f.includes('mssql') || f.includes('sqlserver')) return 'mssql';
  if (f.includes('oracle')) return 'oracle';
  return 'postgres';
}

function openExternal(url) {
  vscode.env.openExternal(vscode.Uri.parse(url));
}

function getActiveSqlEditors() {
  return vscode.window.visibleTextEditors.filter(
    (e) => e.document.languageId === 'sql' || e.document.fileName.endsWith('.sql')
  );
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const openApp = vscode.commands.registerCommand('schemalens.openApp', () => {
    openExternal(SCHEMALENS_URL);
  });

  const diffFiles = vscode.commands.registerCommand('schemalens.diffFiles', async () => {
    const editors = getActiveSqlEditors();

    if (editors.length === 0) {
      vscode.window.showWarningMessage(
        'No SQL files are open. Open two SQL files and try again.'
      );
      return;
    }

    let schemaA = '';
    let schemaB = '';
    let dialect = 'postgres';

    if (editors.length === 1) {
      // Only one SQL file open — use it as Schema A, prompt for Schema B
      schemaA = editors[0].document.getText();
      dialect = detectDialect(editors[0].document.fileName);
      const input = await vscode.window.showInputBox({
        prompt: 'Paste Schema B SQL (or leave empty)',
        placeHolder: 'CREATE TABLE ...',
      });
      schemaB = input || '';
    } else if (editors.length === 2) {
      schemaA = editors[0].document.getText();
      schemaB = editors[1].document.getText();
      dialect = detectDialect(editors[0].document.fileName);
    } else {
      // More than 2 — let user pick
      const items = editors.map((e, i) => ({
        label: `$(file) ${vscode.workspace.asRelativePath(e.document.fileName)}`,
        description: `Editor ${i + 1}`,
        index: i,
      }));
      const pickA = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select Schema A (old schema)',
      });
      if (!pickA) return;
      const pickB = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select Schema B (new schema)',
      });
      if (!pickB) return;
      schemaA = editors[pickA.index].document.getText();
      schemaB = editors[pickB.index].document.getText();
      dialect = detectDialect(editors[pickA.index].document.fileName);
    }

    const hash = encodeSharePayload(schemaA, schemaB, dialect);
    const url = `${SCHEMALENS_URL}#diff=${hash}`;

    // VS Code URLs can be long; warn if extremely long
    if (url.length > 8000) {
      const action = await vscode.window.showWarningMessage(
        'The combined schemas are very large. The generated URL may not work in all browsers.',
        'Open Anyway',
        'Cancel'
      );
      if (action !== 'Open Anyway') return;
    }

    openExternal(url);
  });

  context.subscriptions.push(openApp, diffFiles);
}

function deactivate() {}

module.exports = { activate, deactivate };
