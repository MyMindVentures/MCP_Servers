# MCP Server Airtable

MCP Server Airtable is an MCP-compatible server that exposes Airtable Web API tools. It provides:

- ✅ An MCP-compatible server (`mcpServer.js`)
- ✅ JavaScript tools for Airtable (bases, records, views, fields, webhooks, etc.)
- ✅ Full authentication support (Bearer, Basic, API Key, OAuth2, and more)
- ✅ Powered by Postman Runtime

Let's set things up!

## 🚦 Getting Started

### ⚙️ Prerequisites

Before starting, please ensure you have:

- [Node.js (v18+ required, v20+ recommended)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (included with Node)

This MCP server uses [postman-runtime](https://www.npmjs.com/package/postman-runtime) to execute requests, ensuring full compatibility with all Postman features including complex authentication types.

### 📥 Installation & Setup

**1. Install dependencies**

Run from your project's root directory:

```sh
npm install
```

### 🔐 Set tool environment variables

In the `.env` file, you'll see environment variable placeholders, one for each workspace that the selected tools are from. For example, if you selected requests from 2 workspaces, e.g. Acme and Widgets, you'll see two placeholders:

```
ACME_API_KEY=
WIDGETS_API_KEY=
```

Update the values with actual API keys for each API. These environment variables are used inside of the generated tools to set the API key for each request. You can inspect a file in the `tools` directory to see how it works.

```javascript
// environment variables are used inside of each tool file
const apiKey = process.env.ACME_API_KEY;
```

**Caveat:** This may not be correct for every API. The generation logic is relatively simple - for each workspace, we create an environment variable with the same name as the workspace slug, and then use that environment variable in each tool file that belongs to that workspace. If this isn't the right behavior for your chosen API, no problem! You can manually update anything in the `.env` file or tool files to accurately reflect the API's method of authentication.

## 📚 Airtable API reference & staying up to date

To keep this MCP server aligned with the latest Airtable Web API, use the **official Airtable JavaScript SDK** and docs as the source of truth:

- **[Airtable/airtable.js](https://github.com/Airtable/airtable.js)** — Official Airtable JavaScript client. The SDK implements the same endpoints this MCP server exposes (records, bases, meta, etc.). When Airtable adds or changes API behavior, it is reflected here first. Use it to:
  - See which endpoints and parameters are supported (e.g. `base.ts`, `table.ts`, `query.ts`, `run_action.ts`).
  - Check the [README](https://github.com/Airtable/airtable.js#readme) for configuration and links to interactive docs.
- **[Airtable Web API docs](https://airtable.com/developers/web/api)** — Non-interactive reference for all Web API endpoints and scopes.
- **[airtable.com/api](https://airtable.com/api)** — Interactive API docs (per-base; also available via the Help button in a base). Includes a "JavaScript" tab with Airtable.js snippets.

When you add or change tools in `tools/pan-mcp/airtable-web-api/`, cross-check the request method and path with the SDK or the developer docs above so the MCP server stays in sync with the official API.

See [docs/API_REFERENCE.md](docs/API_REFERENCE.md) for a short checklist and endpoint overview.

## E2E tests

The project includes end-to-end tests with [Playwright](https://playwright.dev/). They start the server (with a temporary auth data dir), run API tests (auth, `/meta`, `/api/settings/tools`, refresh, PATCH), and UI tests (login, Manual page tool groups, Settings page and “Tools bijwerken” button).

**Run all e2e tests:**

```sh
npm run test:e2e
```

**Run with UI (interactive):**

```sh
npm run test:e2e:ui
```

**Run only API or only UI:**

```sh
npx playwright test --project=api
npx playwright test --project=ui
```

The first run will build the UI and start the server on port 3765 (or `E2E_PORT`). Use a `CI` environment variable to avoid reusing an existing server.

## 🌐 Test the MCP Server with Postman

The MCP Server (`mcpServer.js`) exposes your automated API tools to MCP-compatible clients, such as Claude Desktop or the Postman Desktop Application. We recommend that you test the server with Postman first and then move on to using it with an LLM.

The Postman Desktop Application is the easiest way to run and test MCP servers. Testing the downloaded server first is optional but recommended.

**Step 1**: Download the latest Postman Desktop Application from [https://www.postman.com/downloads/](https://www.postman.com/downloads/).

**Step 2**: Read out the documentation article [here](https://learning.postman.com/docs/postman-ai-agent-builder/mcp-requests/create/) and see how to create an MCP request inside the Postman app.

**Step 3**: Set the type of the MCP request to `STDIO` and set the command to `node </absolute/path/to/mcpServer.js>`. If you have issues with using only `node` (e.g. an old version is used), supply an absolute path instead to a node version 18+. You can get the full path to node by running:

```sh
which node
```

To check the node version, run:

```sh
node --version
```

To get the absolute path to `mcpServer.js`, run:

```sh
realpath mcpServer.js
```

Use the node command followed by the full path to `mcpServer.js` as the command for your new Postman MCP Request. Then click the **Connect** button. You should see a list of tools that you selected before generating the server. You can test that each tool works here before connecting the MCP server to an LLM.

## 👩‍💻 Connect the MCP Server to Claude

You can connect your MCP server to any MCP client. Here we provide instructions for connecting it to Claude Desktop.

**Step 1**: Note the full path to node and the `mcpServer.js` from the previous step.

**Step 2**. Open Claude Desktop → **Settings** → **Developers** → **Edit Config** and add a new MCP server:

```json
{
  "mcpServers": {
    "<server_name>": {
      "command": "</absolute/path/to/node>",
      "args": ["</absolute/path/to/mcpServer.js>"]
    }
  }
}
```

Restart Claude Desktop to activate this change. Make sure the new MCP is turned on and has a green circle next to it. If so, you're ready to begin a chat session that can use the tools you've connected.

**Warning**: If you don't supply an absolute path to a `node` version that is v18+, Claude (and other MCP clients) may fall back to another `node` version on the system. Make sure to use Node.js v18 or higher for best compatibility.

### Additional Options

#### 🐳 Docker Deployment (Production)

For production deployments, you can use Docker:

**1. Build Docker image**

From the project root (where `Dockerfile` lives):

```sh
docker build -t airtable-mcp-server .
```

This uses the provided `Dockerfile`, installs dependencies, copies the project, and sets `ENTRYPOINT ["node", "mcpServer.js"]`.

**2. Configure environment variables**

This MCP server expects (at minimum) the following variables for Airtable:

- `pan_mcp_personal_access_token`: Your Airtable personal access token.
- `pan_mcp_base_url`: Typically `https://api.airtable.com`.

When running in Docker, the easiest option is to keep these in a local `.env` file and pass it to Docker:

```sh
pan_mcp_personal_access_token=patXXXXX
pan_mcp_base_url=https://api.airtable.com
```

Run containers with:

```sh
docker run --env-file=.env ...
```

Docker injects these values into `process.env`, which is what the server and Postman Runtime use. The `.env` file inside the image is not required for container runs.

**3. Stdio mode via Docker (Claude Desktop, other MCP stdio clients)**

In stdio mode, the server reads and writes JSON-RPC messages over stdin/stdout. The Docker image is configured for stdio by default.

- Local test:

  ```sh
  docker run -i --rm --env-file=.env airtable-mcp-server
  ```

- Claude Desktop integration (Settings → Developers → Edit Config):

  ```json
  {
    "mcpServers": {
      "airtable-mcp-server": {
        "command": "docker",
        "args": ["run", "-i", "--rm", "--env-file=.env", "airtable-mcp-server"]
      }
    }
  }
  ```

This leaves the container `ENTRYPOINT` (`node mcpServer.js`) unchanged and makes the container behave like a normal stdio MCP server.

**4. HTTP (streamable-http) mode via Docker / cloud**

To expose the server over HTTP, use the `--streamable-http` flag. The server listens on `process.env.PORT || 3001`.

- Single server, default port:

  ```sh
  docker run --rm --env-file=.env -p 3001:3001 airtable-mcp-server --streamable-http
  ```

  The MCP HTTP endpoint will be available at:

  ```text
  http://localhost:3001/mcp
  ```

- Multiple servers, custom ports using `PORT`:

  ```sh
  # Server A
  docker run --rm --env-file=.env -e PORT=8080 -p 8080:8080 airtable-mcp-server --streamable-http

  # Server B
  docker run --rm --env-file=.env -e PORT=8081 -p 8081:8081 airtable-mcp-server --streamable-http
  ```

In a generic cloud environment (Kubernetes, ECS, etc.), set `PORT` via the platform’s env configuration, publish that port, and route traffic to `http(s)://<host>:PORT/mcp`.

**5. Example HTTP-based MCP client configuration**

An HTTP-capable MCP client or gateway should send JSON-RPC over HTTP POST to `/mcp`. A typical configuration will look like:

```text
Base URL: http://your-hostname:PORT/mcp
Method: POST
Body: JSON-RPC 2.0 payload
```

Make sure the client and container agree on the same `PORT` value.

**6. SSE mode (optional)**

The same image can also serve Server-Sent Events:

```sh
docker run --rm --env-file=.env -e PORT=8090 -p 8090:8090 airtable-mcp-server --sse
```

Endpoints:

- SSE stream: `http://localhost:8090/sse`
- Message input: `http://localhost:8090/messages`

You can run multiple SSE-enabled servers the same way as HTTP, by varying `PORT` and port mappings.

#### 🌐 Streamable HTTP

To run the server with Streamable HTTP support, use the `--streamable-http` flag. This launches the server with the `/mcp` endpoint enabled:

```sh
node mcpServer.js --streamable-http
```

#### 🌐 Server-Sent Events (SSE)

To run the server with Server-Sent Events (SSE) support, use the `--sse` flag. This launches the server with the `/sse` and `/messages` endpoints enabled:

```sh
node mcpServer.js --sse
```

#### 🖥️ Stdio (Standard Input/Output)

To run the server using standard input/output (stdio), simply run the script without any flags. This mode is ideal for CLI tools or programmatic integration via stdin and stdout.

```sh
node mcpServer.js
```

#### 📄 Documentation UI (Streamable HTTP / SSE)

When running with `--streamable-http` or `--sse`, the server can serve a documentation UI:

1. **Build the UI** (once, or after UI changes):

   ```sh
   npm run build:ui
   ```

2. **Start the server** (e.g. Streamable HTTP):

   ```sh
   npm start
   ```
   or `node mcpServer.js --streamable-http`

3. **Open in a browser**: `http://127.0.0.1:3001/` (or your `PORT`). Use **Sign in** or **Sign up**; authentication is always required.

4. **Environment variables** (optional, in `.env`):
   - `DOCS_USER` / `DOCS_PASS` – On first run, if no users exist, an admin account is created with these (defaults: `admin` / `changeme`). Use it to sign in or create more users via Sign up.
   - `AUTH_JWT_SECRET` – Secret for JWT signing (set in production).
   - `AUTH_DATA_PATH` – Directory for `auth-data.json` (default: `./data`).
   - `MCP_PUBLIC_URL` – URL shown on the manual page for MCP clients (default: `http://127.0.0.1:3001/mcp`).

   The docs UI supports **Sign up**, **Sign in**, **Forgot password** (reset link; optional email via `SMTP_*` or `RESET_PASSWORD_EMAIL_FROM`), and **Change password** (when signed in). After logging in, open **Manual & Info** and **Settings** (including tool toggles). *Invented by Parallax Studio.*

## 🐳 Docker & cloud deploy

This server is set up as a **registered container** so you can run and deploy it from Docker and GitHub:

- **Local (build from source):** `docker compose up -d --build` — builds the image and runs the server.
- **GitHub:** Push the repo to GitHub; the **Docker build and push to GHCR** workflow builds and publishes the image to [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) (`ghcr.io/<owner>/<repo>`).
- **Cloud deploy:** On any server with Docker, pull the published image and run it with a single compose file and a `.env` for config.

See **[DEPLOY.md](DEPLOY.md)** for:

- Registering the container on GitHub and making the image public
- Deploying on a cloud server (env vars, `docker-compose.deploy.yml`)
- Image tags (`latest`, version, `sha-*`) and manual build/push

## 🛠️ Additional CLI commands

#### List tools

List descriptions and parameters from all generated tools with:

```sh
node index.js tools
```

Example:

```
Available Tools:

Workspace: acme-workspace
  Collection: useful-api
    list_all_customers
      Description: Retrieve a list of useful things.
      Parameters:
        - magic: The required magic power
        - limit: Number of results returned
        [...additional parameters...]
```

## ➕ Adding New Tools

Extend your MCP server with more tools easily:

1. You can use [Postman MCP Generator](https://postman.com/explore/mcp-generator) to generate additional tools.
2. Pick new API request(s), generate a new MCP server, and download it.
3. Copy new generated tool(s) into your existing project's `tools/` folder.
4. Update your `tools/paths.js` file to include new tool references.

## 💬 Questions & Support

For updates and support, see this repo or the [Postman MCP Generator](https://postman.com/explore/mcp-generator) page.

Join the `#mcp-lab` channel in the [Postman Discord](https://discord.gg/PQAWcPkprM) to share what you've built and get help.
