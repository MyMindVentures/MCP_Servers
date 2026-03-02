# Deploy Outlook MCP Server with Docker

Run the Outlook MCP server as a container. Set `IMAGE` to your published image (e.g. `ghcr.io/<owner>/mcp-server-outlook:latest` or `<dockerhub-user>/mcp-server-outlook:latest`).

**Env vars:** `DOCS_USER`, `DOCS_PASS`, `MICROSOFT_ACCESS_TOKEN` (required for Graph API). Optionally `HOST_PORT`, `MCP_PUBLIC_URL`.

```bash
docker compose -f docker-compose.deploy.yml up -d
```

See the monorepo DEPLOY.md for full details (GHCR, Docker Hub, tags).
