# MCP Servers Monorepo

This repository contains **seven** **MCP (Model Context Protocol) servers**, each exposing the official API of a platform as tools for MCP-compatible clients (e.g. Claude Desktop, Cursor):

| Server | Directory | API | Image (Docker Hub) |
|--------|-----------|-----|--------------------|
| **Notion** | [MCP_Server_Notion](MCP_Server_Notion) | [Notion API](https://developers.notion.com/reference) | `DOCKERHUB_USER/mcp-server-notion` |
| **Outlook** | [MCP_Server_Outlook](MCP_Server_Outlook) | [Microsoft Graph](https://learn.microsoft.com/en-us/graph/api/overview) (mail, calendar, contacts) | `DOCKERHUB_USER/mcp-server-outlook` |
| **Raindrop** | [MCP_Server_Raindrop](MCP_Server_Raindrop) | [Raindrop.io API](https://developer.raindrop.io/) | `DOCKERHUB_USER/mcp-server-raindrop` |
| **ClickUp** | [MCP_Server_ClickUp](MCP_Server_ClickUp) | [ClickUp API v2](https://developer.clickup.com/) | `DOCKERHUB_USER/mcp-server-clickup` |
| **Gamma AI** | [MCP_Server_GammaAI](MCP_Server_GammaAI) | [Gamma API](https://developers.gamma.app/) | `DOCKERHUB_USER/mcp-server-gammaai` |
| **1Password** | [MCP_Server_1Password](MCP_Server_1Password) | [1Password Connect API](https://developer.1password.com/docs/connect/api-reference/) | `DOCKERHUB_USER/mcp-server-1password` |
| **GitHub** | [MCP_Server_GitHub](MCP_Server_GitHub) | [GitHub REST API](https://docs.github.com/en/rest) | `DOCKERHUB_USER/mcp-server-github` |

Each server is built from the same lightweight template (Postman-runtime–based) and can be run locally or deployed by **image tag** from Docker Hub or GitHub Container Registry.

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

After pushing the repo to GitHub and configuring secrets, the **Docker build and push (monorepo)** workflow builds and publishes **seven** images to **Docker Hub**:

- `DOCKERHUB_USERNAME/mcp-server-notion:latest` (and `:1.0.0`, `:sha-<sha>`)
- `DOCKERHUB_USERNAME/mcp-server-outlook:latest`
- `DOCKERHUB_USERNAME/mcp-server-raindrop:latest`
- `DOCKERHUB_USERNAME/mcp-server-clickup:latest`
- `DOCKERHUB_USERNAME/mcp-server-gammaai:latest`
- `DOCKERHUB_USERNAME/mcp-server-1password:latest`
- `DOCKERHUB_USERNAME/mcp-server-github:latest`

On a cloud server:

1. Create a directory and add the server’s `docker-compose.deploy.yml` (from the server folder or monorepo).
2. Create `.env` with `IMAGE`, `DOCS_USER`, `DOCS_PASS`, and the API token for that server.
3. Run:

   ```bash
   export IMAGE=DOCKERHUB_USERNAME/mcp-server-notion:latest   # or outlook, raindrop, clickup, gammaai, 1password, github
   docker compose -f docker-compose.deploy.yml pull
   docker compose -f docker-compose.deploy.yml up -d
   ```

**Required secrets (GitHub repo):**

- `DOCKERHUB_USERNAME` – Docker Hub username
- `DOCKERHUB_TOKEN` – Docker Hub access token (Settings → Security → Access tokens)

**GitHub Container Registry (GHCR):**  
For one image per server on GHCR, use one GitHub repository per server (e.g. `mcp-server-notion`) and copy the per-server `.github/workflows/docker-publish.yml` from the template into each repo. This monorepo workflow only pushes to Docker Hub.

## Repository layout

- `MCP_Server_Notion/` – Notion API (users, pages, databases, blocks, comments, search)
- `MCP_Server_Outlook/` – Microsoft Graph (mail, calendar, contacts)
- `MCP_Server_Raindrop/` – Raindrop.io (collections, raindrops, tags, user, backups)
- `MCP_Server_ClickUp/` – ClickUp API v2 (teams, spaces, folders, lists, tasks, goals, time tracking, webhooks)
- `MCP_Server_GammaAI/` – Gamma API (generations, themes, folders)
- `MCP_Server_1Password/` – 1Password Connect (vaults, items, files, activity)
- `MCP_Server_GitHub/` – GitHub REST API (repos, issues, pulls, search, commits, contents)
- `MCP_Server_Template_Lightweight_AirtableExample/` – Template (Airtable) used as base
- `.github/workflows/docker-publish-mono.yml` – CI: build and push all seven images to Docker Hub

Each server has its own `README.md` and `DEPLOY.md` for setup and deployment details.
