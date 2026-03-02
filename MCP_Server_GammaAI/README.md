# MCP Server — Gamma AI

MCP server that exposes the **Gamma API** as tools for MCP-compatible clients. Create generations (presentations, documents, webpages), list themes and folders.

## Prerequisites

- Node.js v18+
- A [Gamma API key](https://developers.gamma.app/)

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set `GAMMA_API_KEY=your_key`

## Run

- **Streamable HTTP**: `npm start` → MCP: `http://127.0.0.1:3001/mcp`, Docs UI: `http://127.0.0.1:3001/` (after `npm run build:ui`)
- **Stdio**: `node mcpServer.js`

## Tools

- **Generations**: create generation (POST /generations), get generation (GET /generations/:id)
- **Themes**: list themes (GET /themes)
- **Folders**: list folders (GET /folders)

Reference: [Gamma API](https://developers.gamma.app/).

## Docker

See [DEPLOY.md](DEPLOY.md).
