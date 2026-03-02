# MCP Server — ClickUp

MCP server that exposes the **ClickUp API v2** as tools for MCP-compatible clients (e.g. Claude Desktop, Cursor). Supports teams, spaces, folders, lists, tasks, goals, time tracking, views, custom fields, webhooks, and team members.

## Prerequisites

- Node.js v18+
- A [ClickUp API token](https://developer.clickup.com/) (Settings → Apps → API Token)

## Setup

1. **Install dependencies**

```sh
npm install
```

2. **Configure environment**

   Copy `.env.example` to `.env` and set:

   ```env
   CLICKUP_API_TOKEN=pk_xxxx   # From ClickUp → Settings → Apps → API Token
   ```

## Run

- **Streamable HTTP** (default): `npm start` or `node mcpServer.js --streamable-http`  
  - MCP endpoint: `http://127.0.0.1:3001/mcp`  
  - Docs UI: `http://127.0.0.1:3001/` (after `npm run build:ui`)
- **Stdio**: `node mcpServer.js` (for Claude Desktop, etc.)

## Tools (ClickUp API v2 coverage)

- **Teams**: get authorized teams, get team
- **Spaces**: get spaces in a team
- **Folders**: get folders in a space
- **Lists**: get lists in a folder, get list by ID
- **Tasks**: get tasks, get task, create task, update task, delete task
- **Goals**: get goals, get goal
- **Views**: get team views, get list views
- **Custom fields**: get custom fields for a list
- **Time tracking**: get time entries, create time entry
- **Webhooks**: get webhooks, create webhook, delete webhook
- **Users**: get authorized team members

Reference: [ClickUp API](https://developer.clickup.com/).

## Docker

See [DEPLOY.md](DEPLOY.md) for building and deploying with Docker.

## List tools

```sh
node index.js tools
```
