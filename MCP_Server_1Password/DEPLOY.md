# Deploy 1Password Connect MCP Server with Docker

**Local:** `docker compose up -d --build`

**Cloud:** Set `IMAGE`, then `docker compose -f docker-compose.deploy.yml pull && docker compose -f docker-compose.deploy.yml up -d`

**Env:** `ONEPASSWORD_CONNECT_HOST`, `ONEPASSWORD_CONNECT_ROOT`, `ONEPASSWORD_CONNECT_TOKEN`, `DOCS_USER`, `DOCS_PASS`, `HOST_PORT`, `MCP_PUBLIC_URL`
