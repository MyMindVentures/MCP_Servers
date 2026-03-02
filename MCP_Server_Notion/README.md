# MCP Server — Notion

MCP server that exposes the **official Notion API** as tools for MCP-compatible clients (e.g. Claude Desktop, Cursor). Supports users, pages, databases, blocks, comments, and search.

## Prerequisites

- Node.js v18+
- A [Notion integration](https://www.notion.so/my-integrations) (Internal Integration Secret)

## Setup

1. **Install dependencies**

```sh
npm install
```

2. **Configure environment**

   Copy `.env.example` to `.env` and set:

   ```env
   NOTION_API_KEY=secret_xxxx  # From Notion → Settings & members → Connections → Develop or manage integrations
   ```

   Share the pages/databases you want to access with your integration (click ••• on a page → Add connections → your integration).

## Run

- **Streamable HTTP** (default): `npm start` or `node mcpServer.js --streamable-http`  
  - MCP endpoint: `http://127.0.0.1:3001/mcp`  
  - Docs UI: `http://127.0.0.1:3001/` (after `npm run build:ui`)
- **Stdio**: `node mcpServer.js` (for Claude Desktop, etc.)

## Tools (Notion API coverage)

- **Users**: list users, retrieve user, retrieve bot
- **Pages**: retrieve, update, create, archive
- **Databases**: retrieve, update, create, query
- **Blocks**: retrieve, get children, append children, update, delete
- **Comments**: list, create, retrieve
- **Search**: search pages and databases
- **Page property**: retrieve page property item

Reference: [Notion API](https://developers.notion.com/reference).

## Docker

See [DEPLOY.md](DEPLOY.md) for building and deploying with Docker, and for publishing to GitHub Container Registry or Docker Hub.

## List tools

```sh
node index.js tools
```
