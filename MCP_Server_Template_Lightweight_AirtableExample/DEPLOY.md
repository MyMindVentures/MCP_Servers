# Deploy MCP Server with Docker and GitHub

This guide covers running the MCP server as a **registered container** (Docker image on GitHub Container Registry) and deploying it on cloud servers.

## Overview

- **Docker image**: Built from the repo and optionally published to [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) (ghcr.io).
- **GitHub Actions**: On push to `main`/`master` (and on release), the workflow builds and pushes the image to `ghcr.io/<owner>/<repo>:latest` and version tags.
- **Cloud deploy**: Pull the image and run it with `docker compose` using env vars for config.

---

## 1. Register the container on GitHub

### Push the repo to GitHub

If the project is not yet in a GitHub repo:

```bash
git init
git add .
git commit -m "Initial commit: MCP server with Airtable tools"
git remote add origin https://github.com/<owner>/<repo>.git
git branch -M main
git push -u origin main
```

Replace `<owner>` and `<repo>` with your GitHub username/org and repository name.

### Enable workflow permissions

1. In the repo: **Settings** → **Actions** → **General**.
2. Under **Workflow permissions**, choose **Read and write permissions**.
3. Save.

### Trigger the first build

- Pushing to `main` (or `master`) runs the **Docker build and push to GHCR** workflow.
- After it completes, the image is at:  
  `ghcr.io/<owner>/<repo>:latest`  
  and also `ghcr.io/<owner>/<repo>:<version>` (from `package.json`).

### Make the image public (optional)

By default, GHCR packages are private. To allow unauthenticated pull on cloud servers:

1. Open the repo on GitHub.
2. Go to **Packages** (right sidebar).
3. Open the package (same name as the repo).
4. **Package settings** → **Danger Zone** → **Change visibility** → **Public**.

---

## 2. Run locally with Docker (build from source)

From the project root:

```bash
# Build and run (no IMAGE set → builds from Dockerfile)
docker compose up -d --build

# Docs UI: http://localhost:3002 (or HOST_PORT from .env)
# MCP endpoint: http://localhost:3002/mcp
```

Ensure `.env` has at least `DOCS_USER`, `DOCS_PASS`, and any Airtable/API keys the tools need.

---

## 3. Deploy on a cloud server (use published image)

Use the published image so the server doesn’t need the source code, only Docker and a `.env` file.

### One-time setup on the server

1. Install Docker and Docker Compose (v2):
   - [Docker Engine](https://docs.docker.com/engine/install/)
   - [Docker Compose](https://docs.docker.com/compose/install/)

2. Create a directory and add the deploy compose file:

   ```bash
   mkdir -p ~/mcp-server && cd ~/mcp-server
   curl -sO https://raw.githubusercontent.com/<owner>/<repo>/main/docker-compose.deploy.yml
   ```

   Or clone the repo and use `docker-compose.deploy.yml` from it.

3. Create `.env` with your config (see below). Do **not** commit `.env`.

### Run using the published image

Set `IMAGE` to your GHCR image (and optional tag), then start the stack:

```bash
export IMAGE=ghcr.io/<owner>/<repo>:latest
# Or a specific version: export IMAGE=ghcr.io/<owner>/<repo>:1.0.0

docker compose -f docker-compose.deploy.yml pull
docker compose -f docker-compose.deploy.yml up -d
```

Or put `IMAGE=ghcr.io/<owner>/<repo>:latest` in `.env` and run:

```bash
docker compose -f docker-compose.deploy.yml pull
docker compose -f docker-compose.deploy.yml up -d
```

### Required and optional env vars (`.env`)

Create `.env` in the same directory as `docker-compose.deploy.yml`:

```env
# Required: Docs UI login (always enforced)
DOCS_USER=admin
DOCS_PASS=your-secure-password

# Optional: host port for UI and MCP (default 3002)
HOST_PORT=3002

# Optional: public URL shown in the Manual (for MCP clients)
# Use your server’s public URL, e.g. https://mcp.example.com
MCP_PUBLIC_URL=https://your-server.example.com/mcp

# Add any env vars your tools need (e.g. Airtable)
# pan_mcp_personal_access_token=...
# pan_mcp_base_url=https://api.airtable.com
```

Then:

```bash
docker compose -f docker-compose.deploy.yml up -d
```

### Useful commands

```bash
# Logs
docker compose -f docker-compose.deploy.yml logs -f

# Stop
docker compose -f docker-compose.deploy.yml down

# Update to latest image and restart
docker compose -f docker-compose.deploy.yml pull
docker compose -f docker-compose.deploy.yml up -d
```

---

## 4. Image tags

After the workflow runs:

| Tag        | When used |
|-----------|-----------|
| `latest`  | Push to default branch (e.g. `main`) |
| `<version>` | From `package.json` (e.g. `1.0.0`) |
| `sha-<sha>` | Git commit SHA for traceability |

Use `latest` for “always current” or pin to a version/commit for stability.

---

## 5. Manual build and push (without GitHub Actions)

To build and push the image yourself (e.g. to Docker Hub or another registry):

```bash
# Build
docker build -t ghcr.io/<owner>/<repo>:latest .

# Push to GHCR (requires personal access token with write:packages)
echo $GITHUB_TOKEN | docker login ghcr.io -u <owner> --password-stdin
docker push ghcr.io/<owner>/<repo>:latest
```

For Docker Hub:

```bash
docker tag ghcr.io/<owner>/<repo>:latest <dockerhub-user>/mcp-server-airtable:latest
docker push <dockerhub-user>/mcp-server-airtable:latest
```

Then set `IMAGE=<dockerhub-user>/mcp-server-airtable:latest` when using `docker-compose.deploy.yml`.

---

## Troubleshooting

### EACCES on `/app/data/auth-data.json`

The image creates `/app/data` and gives ownership to the app user. If you see **permission denied** on that path (e.g. after updating from an older image that didn’t create `/app/data`), fix the volume once:

```bash
docker compose -f docker-compose.deploy.yml run --user root --entrypoint "" mcp chown -R 1001:1001 /app/data
```

Then start again with `docker compose -f docker-compose.deploy.yml up -d`. Alternatively, remove the volume and start fresh (this deletes auth and tool settings):

```bash
docker compose -f docker-compose.deploy.yml down -v
docker compose -f docker-compose.deploy.yml up -d
```

---

## 6. Persisted data

- **Tool settings** (enable/disable tools) are stored in a Docker volume `tool-settings-data` at `/app/data/tool-settings.json` inside the container. They persist across restarts and image updates.
- To reset tool settings, remove the volume:  
  `docker compose -f docker-compose.deploy.yml down -v`
