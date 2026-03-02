# MCP Server — GitHub

MCP server that exposes the **GitHub REST API** for repos, issues, pull requests, search, commits, contents, and users.

## Prerequisites

- Node.js v18+
- A [GitHub personal access token](https://docs.github.com/en/authentication) (classic or fine-grained)

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set `GITHUB_TOKEN=your_token`

## Run

- **Streamable HTTP**: `npm start` → MCP: `http://127.0.0.1:3001/mcp`, Docs: `http://127.0.0.1:3001/` (after `npm run build:ui`)
- **Stdio**: `node mcpServer.js`

## Tools

- **Meta**: API meta, rate limit
- **Users**: authenticated user, get user by username
- **Repos**: list, get, create, update, delete; list branches
- **Issues**: list, get, create, update; list and create comments
- **Pulls**: list, get, create, update; list and create reviews
- **Search**: repos, issues, code
- **Commits**: list, get
- **Contents**: get, create, update, delete file

This server exposes a **core subset** of the GitHub REST API (repos, issues, pulls, search, commits, contents, users). For full endpoint coverage and gaps, see [docs/API_REFERENCE.md](docs/API_REFERENCE.md). Full API: [GitHub REST API](https://docs.github.com/en/rest).

## Docker

See [DEPLOY.md](DEPLOY.md).
