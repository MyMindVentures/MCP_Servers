# Deploy Gamma AI MCP Server with Docker

**Local:** `docker compose up -d --build` → http://localhost:3002 (Docs) | http://localhost:3002/mcp (MCP)

**Cloud:** Set `IMAGE` (e.g. `dockerhub-user/mcp-server-gammaai:latest`), then:
```bash
docker compose -f docker-compose.deploy.yml pull
docker compose -f docker-compose.deploy.yml up -d
```

**Env:** `GAMMA_API_KEY=your_key`, `DOCS_USER`, `DOCS_PASS`, `HOST_PORT`, `MCP_PUBLIC_URL`
