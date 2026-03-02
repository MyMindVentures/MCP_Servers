# Deploy Raindrop MCP Server with Docker

Run the Raindrop MCP server as a container. Set `IMAGE` to your published image (e.g. `ghcr.io/<owner>/mcp-server-raindrop:latest` or `<dockerhub-user>/mcp-server-raindrop:latest`).

**Env vars:** `DOCS_USER`, `DOCS_PASS`, `RAINDROP_ACCESS_TOKEN` (required). Optionally `HOST_PORT`, `MCP_PUBLIC_URL`.

```bash
docker compose -f docker-compose.deploy.yml up -d
```

See the monorepo root DEPLOY/README for CI and image tags.
