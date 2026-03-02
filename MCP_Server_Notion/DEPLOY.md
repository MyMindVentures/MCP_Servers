# Deploy Notion MCP Server with Docker

This guide covers running the Notion MCP server as a container and deploying it on cloud servers. For full details (GHCR, tags, troubleshooting), see the template [DEPLOY.md](https://github.com) in the monorepo.

## Quick start

**Local (build from source):**

```bash
docker compose up -d --build
# Docs UI: http://localhost:3002  |  MCP: http://localhost:3002/mcp
```

**Cloud (published image):**

Set `IMAGE` to your image (e.g. `ghcr.io/<owner>/mcp-server-notion:latest` or `<dockerhub-user>/mcp-server-notion:latest`), then:

```bash
docker compose -f docker-compose.deploy.yml pull
docker compose -f docker-compose.deploy.yml up -d
```

## Env vars for Notion

In `.env` (or container env):

```env
DOCS_USER=admin
DOCS_PASS=your-secure-password
NOTION_API_KEY=secret_xxxx   # Required: from Notion integration settings
HOST_PORT=3002
MCP_PUBLIC_URL=https://your-server.example.com/mcp
```

## Image tags

When using the monorepo CI: `latest`, `<version>` from package.json, `sha-<sha>`.

Deploy by tag example: `IMAGE=<registry>/mcp-server-notion:1.0.0`
