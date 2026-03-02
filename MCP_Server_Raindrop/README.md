# MCP Server — Raindrop

MCP server that exposes the **Raindrop.io API** for collections, bookmarks (raindrops), tags, user, and backups. Use with MCP-compatible clients (e.g. Claude Desktop, Cursor).

## Prerequisites

- Node.js v18+
- Raindrop.io account and [integration](https://app.raindrop.io/settings/integrations) (OAuth2 or test token)

## Setup

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env` and set:

   ```env
   RAINDROP_ACCESS_TOKEN=your_oauth_access_token
   ```

   Obtain a token via [Raindrop OAuth2](https://developer.raindrop.io/v1/authentication) or create a test app at https://app.raindrop.io/settings/integrations.

## Run

- **Streamable HTTP**: `npm start` → MCP at `http://127.0.0.1:3001/mcp`, Docs UI at `http://127.0.0.1:3001/`
- **Stdio**: `node mcpServer.js`

## Tools (Raindrop API)

- **Collections**: list, get, create, update, delete
- **Raindrops**: list, get, create, update, delete (bookmarks)
- **Tags**: get, rename, merge, remove
- **User**: get authenticated user
- **Backups**: get backups list, create new backup

Reference: [developer.raindrop.io](https://developer.raindrop.io/).

## Docker

See [DEPLOY.md](DEPLOY.md).

## List tools

```sh
node index.js tools
```
