# SchemaLens for VS Code

Open the [SchemaLens](https://schemalens.tech) schema diff tool directly from VS Code.

## Features

- **Open SchemaLens** — Launch the browser-based diff tool in one keystroke.
- **Diff Active SQL Files** — Compare the two open SQL files instantly. SchemaLens auto-detects your SQL dialect and generates a shareable diff URL.

## Usage

### Command Palette

| Command | What it does |
|---------|-------------|
| `SchemaLens: Open SchemaLens` | Opens https://schemalens.tech/app.html in your default browser. |
| `SchemaLens: Diff Active SQL Files` | Reads the two active `.sql` editors, encodes them, and opens SchemaLens with both schemas pre-filled. |

### Right-click a SQL file

Right-click any `.sql` file in the editor tab and choose **"Diff Active SQL Files"**.

## How it works

The extension encodes your SQL using the same base64 format as SchemaLens's native Share button. Everything stays local — your schemas are never uploaded to a server. The generated URL is processed entirely in your browser.

## Requirements

- VS Code 1.74+
- A default web browser

## Dialect detection

The extension guesses the SQL dialect from your file name:

| File name contains | Dialect |
|-------------------|---------|
| `mysql`, `mariadb` | MySQL |
| `sqlite` | SQLite |
| `mssql`, `sqlserver` | SQL Server |
| `oracle` | Oracle |
| anything else | PostgreSQL |

You can always change the dialect inside SchemaLens after the page loads.

## Privacy

Your SQL never leaves VS Code or your browser. The extension generates a local URL hash — there is no network request until you open the URL in your browser, and even then SchemaLens runs entirely client-side.

## License

MIT
