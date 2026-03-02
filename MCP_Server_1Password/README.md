# MCP Server — 1Password Connect

MCP server that exposes the **1Password Connect API** for vaults, items, files, and API activity. Requires a running 1Password Connect server and an access token.

## Prerequisites

- Node.js v18+
- A [1Password Connect server](https://developer.1password.com/docs/connect/) and access token

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set:
   - `ONEPASSWORD_CONNECT_HOST` – API base including `/v1` (e.g. `http://localhost:8080/v1`)
   - `ONEPASSWORD_CONNECT_ROOT` – Server root for heartbeat/health (e.g. `http://localhost:8080`)
   - `ONEPASSWORD_CONNECT_TOKEN` – Bearer token

## Run

- **Streamable HTTP**: `npm start` → MCP: `http://127.0.0.1:3001/mcp`, Docs: `http://127.0.0.1:3001/` (after `npm run build:ui`)
- **Stdio**: `node mcpServer.js`

## Tools

- **Vaults**: list vaults, get vault
- **Items**: list, get, create, replace, update, delete
- **Files**: list files, get file details, get file content
- **Activity**: list API activity, heartbeat, health

Reference: [1Password Connect API](https://developer.1password.com/docs/connect/api-reference/).

## Docker

See [DEPLOY.md](DEPLOY.md).
