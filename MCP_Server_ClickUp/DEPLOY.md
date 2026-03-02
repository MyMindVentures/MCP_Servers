# Deploy ClickUp MCP Server with Docker

## Quick start

**Local (build from source):**

```bash
docker compose up -d --build
# Docs UI: http://localhost:3002  |  MCP: http://localhost:3002/mcp
```

**Cloud (published image):**

Set `IMAGE` to your image (e.g. `ghcr.io/<owner>/mcp-server-clickup:latest` or `<dockerhub-user>/mcp-server-clickup:latest`), then:

```bash
docker compose -f docker-compose.deploy.yml pull
docker compose -f docker-compose.deploy.yml up -d
```

## Env vars for ClickUp

In `.env` (or container env):

```env
DOCS_USER=admin
DOCS_PASS=your-secure-password
CLICKUP_API_TOKEN=pk_xxxx   # Required: from ClickUp Settings → Apps → API Token
HOST_PORT=3002
MCP_PUBLIC_URL=https://your-server.example.com/mcp
```

## Image tags

When using the monorepo CI: `latest`, `<version>` from package.json, `sha-<sha>`.

Deploy by tag example: `IMAGE=<registry>/mcp-server-clickup:1.0.0`
