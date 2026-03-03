# MCP Servers Monorepo

This repository contains multiple **MCP (Model Context Protocol) servers**, each exposing the official API of a platform as tools for MCP-compatible clients (e.g. Claude Desktop, Cursor):

| Server | Directory | API | Image (GHCR) |
|--------|-----------|-----|--------------|
| **Notion** | [MCP_Server_Notion](MCP_Server_Notion) | [Notion API](https://developers.notion.com/reference) | `ghcr.io/MyMindVentures/mcp-server-notion` |
| **Outlook** | [MCP_Server_Outlook](MCP_Server_Outlook) | [Microsoft Graph](https://learn.microsoft.com/en-us/graph/api/overview) (mail, calendar, contacts) | `ghcr.io/MyMindVentures/mcp-server-outlook` |
| **Raindrop** | [MCP_Server_Raindrop](MCP_Server_Raindrop) | [Raindrop.io API](https://developer.raindrop.io/) | `ghcr.io/MyMindVentures/mcp-server-raindrop` |
| **ClickUp** | [MCP_Server_ClickUp](MCP_Server_ClickUp) | [ClickUp API v2](https://developer.clickup.com/) | `ghcr.io/MyMindVentures/mcp-server-clickup` |
| **Gamma AI** | [MCP_Server_GammaAI](MCP_Server_GammaAI) | [Gamma API](https://developers.gamma.app/) | `ghcr.io/MyMindVentures/mcp-server-gammaai` |
| **1Password** | [MCP_Server_1Password](MCP_Server_1Password) | [1Password Connect API](https://developer.1password.com/docs/connect/api-reference/) | `ghcr.io/MyMindVentures/mcp-server-1password` |
| **GitHub** | [MCP_Server_GitHub](MCP_Server_GitHub) | [GitHub REST API](https://docs.github.com/en/rest) | `ghcr.io/MyMindVentures/mcp-server-github` |
| **Airtable** | [MCP_Server_Airtable](MCP_Server_Airtable) | Airtable Web API | `ghcr.io/MyMindVentures/mcp-server-airtable` |
| **Airtable (Lite Template)** | [MCP_Server_Template_Lightweight_AirtableExample](MCP_Server_Template_Lightweight_AirtableExample) | Airtable Web API (lightweight template) | `ghcr.io/MyMindVentures/mcp-server-airtable-lite` |
| **Template (TypeScript)** | [MCP_Server_Template](MCP_Server_Template) | Generic TypeScript MCP server template | `ghcr.io/MyMindVentures/mcp-server-template` |
| **Spotify** | [MCP_Server_Spotify](MCP_Server_Spotify) | [Spotify Web API](https://developer.spotify.com/documentation/web-api) | _local only (no image yet)_ |

Each server can be run locally or deployed by **image tag** from GitHub Container Registry.

## Quick start (local)

```bash
# Notion
cd MCP_Server_Notion && npm install && cp .env.example .env  # set NOTION_API_KEY
npm start   # http://127.0.0.1:3001/mcp

# Outlook
cd MCP_Server_Outlook && npm install && cp .env.example .env  # set MICROSOFT_ACCESS_TOKEN
npm start

# Raindrop
cd MCP_Server_Raindrop && npm install && cp .env.example .env  # set RAINDROP_ACCESS_TOKEN
npm start

# ClickUp
cd MCP_Server_ClickUp && npm install && cp .env.example .env  # set CLICKUP_API_TOKEN
npm start

# Gamma AI
cd MCP_Server_GammaAI && npm install && cp .env.example .env  # set GAMMA_API_KEY
npm start

# 1Password Connect
cd MCP_Server_1Password && npm install && cp .env.example .env  # set ONEPASSWORD_CONNECT_HOST, ONEPASSWORD_CONNECT_TOKEN
npm start

# GitHub
cd MCP_Server_GitHub && npm install && cp .env.example .env  # set GITHUB_TOKEN
npm start
```

## Deploy by image tag (cloud)

After pushing the repo to GitHub, the **Docker build and push (monorepo)** workflow builds and publishes images to **GitHub Container Registry (GHCR)**:

- `ghcr.io/MyMindVentures/mcp-server-notion:latest` (and `:<version>`, `:sha-<sha>`)
- `ghcr.io/MyMindVentures/mcp-server-outlook:latest`
- `ghcr.io/MyMindVentures/mcp-server-raindrop:latest`
- `ghcr.io/MyMindVentures/mcp-server-clickup:latest`
- `ghcr.io/MyMindVentures/mcp-server-gammaai:latest`
- `ghcr.io/MyMindVentures/mcp-server-1password:latest`
- `ghcr.io/MyMindVentures/mcp-server-github:latest`
- `ghcr.io/MyMindVentures/mcp-server-airtable:latest`
- `ghcr.io/MyMindVentures/mcp-server-airtable-lite:latest`
- `ghcr.io/MyMindVentures/mcp-server-template:latest`

On a cloud server:

1. Create a directory and add the server’s `docker-compose.deploy.yml` (from the server folder or monorepo).
2. Create `.env` with `IMAGE`, `DOCS_USER`, `DOCS_PASS`, and the API token for that server.
3. Run:

   ```bash
   export IMAGE=ghcr.io/MyMindVentures/mcp-server-notion:latest   # or outlook, raindrop, clickup, gammaai, 1password, github, airtable, airtable-lite, template
   docker compose -f docker-compose.deploy.yml pull
   docker compose -f docker-compose.deploy.yml up -d
   ```

**GitHub Actions & GHCR:**

- This monorepo uses a single workflow at `.github/workflows/docker-publish-mono.yml` that:
  - Runs on pushes to the main branch.
  - Reads each server’s `package.json` `version` field.
  - Builds one image per server with tags `:latest`, `:<version>`, and `:sha-<sha>`.
- The workflow authenticates to GHCR using the built-in `GITHUB_TOKEN`; no extra secrets are required beyond enabling “Read and write permissions” for Actions in the repo settings.

## Repository layout

- `MCP_Server_Notion/` – Notion API (users, pages, databases, blocks, comments, search)
- `MCP_Server_Outlook/` – Microsoft Graph (mail, calendar, contacts)
- `MCP_Server_Raindrop/` – Raindrop.io (collections, raindrops, tags, user, backups)
- `MCP_Server_ClickUp/` – ClickUp API v2 (teams, spaces, folders, lists, tasks, goals, time tracking, webhooks)
- `MCP_Server_GammaAI/` – Gamma API (generations, themes, folders)
- `MCP_Server_1Password/` – 1Password Connect (vaults, items, files, activity)
- `MCP_Server_GitHub/` – GitHub REST API (repos, issues, pulls, search, commits, contents)
- `MCP_Server_Template_Lightweight_AirtableExample/` – Template (Airtable) used as base
 - `MCP_Server_Spotify/` – Spotify Web API (search, playback control, playlists)
- `.github/workflows/docker-publish-mono.yml` – CI: build and push all server images to GitHub Container Registry

Each server has its own `README.md` and `DEPLOY.md` for setup and deployment details.
