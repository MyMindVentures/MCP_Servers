# Deploy GitHub MCP Server with Docker

**Local:** `docker compose up -d --build`

**Cloud:** Set `IMAGE` (e.g. `dockerhub-user/mcp-server-github:latest`), then:
```bash
docker compose -f docker-compose.deploy.yml pull
docker compose -f docker-compose.deploy.yml up -d
```

**Env:** `GITHUB_TOKEN`, `DOCS_USER`, `DOCS_PASS`, `HOST_PORT`, `MCP_PUBLIC_URL`
