#!/usr/bin/env node

import dotenv from "dotenv";
import express from "express";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { discoverTools } from "./lib/tools.js";
import { getServerMetadata } from "./lib/serverMetadata.js";
import * as toolSettings from "./lib/toolSettings.js";
import * as authStore from "./lib/authStore.js";
import * as auth from "./lib/auth.js";
import { jwtAuthMiddleware, registerAuthRoutes } from "./lib/authRoutes.js";

import path from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

// Redirect console.log to stderr to prevent stdout pollution
// MCP protocol uses stdio transport where stdout must only contain JSON-RPC messages
// postman-runtime (loaded via dynamic import in discoverTools) may have internal logging
// This redirect must happen BEFORE discoverTools() is called
const originalConsoleLog = console.log;
console.log = (...args) => {
  process.stderr.write(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n');
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const UI_DIST = path.join(__dirname, "ui", "dist");

const SERVER_NAME = "generated-mcp-server";

async function transformTools(tools, enabledNames) {
  return tools
    .map((tool) => {
      const definitionFunction = tool.definition?.function;
      if (!definitionFunction) return;
      const name = definitionFunction.name;
      if (enabledNames && !enabledNames.has(name)) return;
      return {
        name,
        description: definitionFunction.description,
        inputSchema: definitionFunction.parameters,
      };
    })
    .filter(Boolean);
}

async function setupServerHandlers(server, tools) {
  const allNames = (tools || []).map((t) => t.definition?.function?.name).filter(Boolean);
  const enabled = toolSettings.getEnabledToolNames(allNames);

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: await transformTools(tools, enabled),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    if (!enabled.has(toolName)) {
      throw new McpError(ErrorCode.MethodNotFound, `Tool is disabled: ${toolName}`);
    }
    const tool = tools.find((t) => t.definition.function.name === toolName);
    if (!tool) {
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${toolName}`);
    }
    const args = request.params.arguments;
    const requiredParameters =
      tool.definition?.function?.parameters?.required || [];
    for (const requiredParameter of requiredParameters) {
      if (!(requiredParameter in args)) {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Missing required parameter: ${requiredParameter}`
        );
      }
    }
    try {
      const result = await tool.function(args);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error("[Error] Failed to fetch data:", error);
      throw new McpError(
        ErrorCode.InternalError,
        `API error: ${error.message}`
      );
    }
  });
}

async function setupStreamableHttp(toolsRef) {
  const app = express();
  app.use(express.json());

  app.post("/mcp", async (req, res) => {
    try {
      const tools = toolsRef.current;
      const server = new Server(
        {
          name: SERVER_NAME,
          version: "0.1.0",
        },
        {
          capabilities: {
            tools: {},
          },
        }
      );
      server.onerror = (error) => console.error("[Error]", error);
      await setupServerHandlers(server, tools);

      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });

      res.on("close", async () => {
        await transport.close();
        await server.close();
      });

      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: {
            code: -32603,
            message: "Internal server error",
          },
          id: null,
        });
      }
    }
  });

  registerAuthRoutes(app);
  app.use(jwtAuthMiddleware);

  const getAllToolNames = () => toolsRef.current.map((t) => t.definition?.function?.name).filter(Boolean);
  const getEnabledSet = () => toolSettings.getEnabledToolNames(getAllToolNames());

  app.get("/meta", (_req, res) => {
    res.json(getServerMetadata(toolsRef.current, undefined, getEnabledSet()));
  });

  app.get("/api/settings/tools", (_req, res) => {
    res.json(getServerMetadata(toolsRef.current, undefined, getEnabledSet()));
  });

  app.patch("/api/settings/tools", (req, res) => {
    const allToolNames = getAllToolNames();
    const enabled = req.body?.enabled;
    if (!Array.isArray(enabled)) {
      return res.status(400).json({ error: "Body must include 'enabled' array of tool names." });
    }
    const valid = enabled.filter((name) => typeof name === "string" && allToolNames.includes(name));
    const invalid = enabled.filter((name) => typeof name !== "string" || !allToolNames.includes(name));
    if (invalid.length > 0) {
      return res.status(400).json({ error: "Invalid or unknown tool names.", invalid });
    }
    toolSettings.setEnabledToolNames(valid);
    return res.json(getServerMetadata(toolsRef.current, undefined, getEnabledSet()));
  });

  app.post("/api/settings/tools/refresh", async (_req, res) => {
    try {
      toolsRef.current = await discoverTools();
      return res.json(getServerMetadata(toolsRef.current, undefined, getEnabledSet()));
    } catch (err) {
      console.error("[tools/refresh]", err);
      return res.status(500).json({ error: err.message || "Failed to refresh tools" });
    }
  });

  if (existsSync(UI_DIST)) {
    app.use(express.static(UI_DIST));
    app.get("/*path", (_req, res) => {
      res.sendFile(path.join(UI_DIST, "index.html"));
    });
  }

  const port = process.env.PORT || 3001;
  const host = "0.0.0.0";
  app.listen(port, host, () => {
    console.log(
      `[Streamable HTTP Server] running at http://127.0.0.1:${port}/mcp`
    );
    if (existsSync(UI_DIST)) {
      console.log(`[Docs UI] http://127.0.0.1:${port}/ (sign up or use seeded admin from DOCS_USER/DOCS_PASS)`);
    }
  });
}

async function setupSSE(toolsRef) {
  const app = express();
  app.use(express.json());
  const transports = {};
  const servers = {};

  app.get("/sse", async (_req, res) => {
    const tools = toolsRef.current;
    const server = new Server(
      {
        name: SERVER_NAME,
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
    server.onerror = (error) => console.error("[Error]", error);
    await setupServerHandlers(server, tools);

    const transport = new SSEServerTransport("/messages", res);
    transports[transport.sessionId] = transport;
    servers[transport.sessionId] = server;

    res.on("close", async () => {
      delete transports[transport.sessionId];
      await server.close();
      delete servers[transport.sessionId];
    });

    await server.connect(transport);
  });

  app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = transports[sessionId];
    const server = servers[sessionId];

    if (transport && server) {
      await transport.handlePostMessage(req, res);
    } else {
      res.status(400).send("No transport/server found for sessionId");
    }
  });

  registerAuthRoutes(app);
  app.use(jwtAuthMiddleware);
  const getAllToolNamesSSE = () => toolsRef.current.map((t) => t.definition?.function?.name).filter(Boolean);
  const getEnabledSetSSE = () => toolSettings.getEnabledToolNames(getAllToolNamesSSE());

  app.get("/meta", (_req, res) => {
    res.json(getServerMetadata(toolsRef.current, undefined, getEnabledSetSSE()));
  });

  app.get("/api/settings/tools", (_req, res) => {
    res.json(getServerMetadata(toolsRef.current, undefined, getEnabledSetSSE()));
  });

  app.patch("/api/settings/tools", (req, res) => {
    const allToolNamesSSE = getAllToolNamesSSE();
    const enabled = req.body?.enabled;
    if (!Array.isArray(enabled)) {
      return res.status(400).json({ error: "Body must include 'enabled' array of tool names." });
    }
    const valid = enabled.filter((name) => typeof name === "string" && allToolNamesSSE.includes(name));
    const invalid = enabled.filter((name) => typeof name !== "string" || !allToolNamesSSE.includes(name));
    if (invalid.length > 0) {
      return res.status(400).json({ error: "Invalid or unknown tool names.", invalid });
    }
    toolSettings.setEnabledToolNames(valid);
    return res.json(getServerMetadata(toolsRef.current, undefined, getEnabledSetSSE()));
  });

  app.post("/api/settings/tools/refresh", async (_req, res) => {
    try {
      toolsRef.current = await discoverTools();
      return res.json(getServerMetadata(toolsRef.current, undefined, getEnabledSetSSE()));
    } catch (err) {
      console.error("[tools/refresh]", err);
      return res.status(500).json({ error: err.message || "Failed to refresh tools" });
    }
  });

  if (existsSync(UI_DIST)) {
    app.use(express.static(UI_DIST));
    app.get("/*path", (_req, res) => {
      res.sendFile(path.join(UI_DIST, "index.html"));
    });
  }

  const port = process.env.PORT || 3001;
  const host = "0.0.0.0";
  app.listen(port, host, () => {
    console.log(`[SSE Server] is running:`);
    console.log(`  SSE stream:    http://127.0.0.1:${port}/sse`);
    console.log(`  Message input: http://127.0.0.1:${port}/messages`);
    if (existsSync(UI_DIST)) {
      console.log(`  Docs UI:       http://127.0.0.1:${port}/ (sign up or use seeded admin)`);
    }
  });
}

async function setupStdio(tools) {
  // stdio mode: single server instance
  const server = new Server(
    {
      name: SERVER_NAME,
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );
  server.onerror = (error) => console.error("[Error]", error);
  await setupServerHandlers(server, tools);

  process.on("SIGINT", async () => {
    await server.close();
    process.exit(0);
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

async function run() {
  const args = process.argv.slice(2);
  const isStreamableHttp = args.includes("--streamable-http");
  const isSSE = args.includes("--sse");

  let tools;
  try {
    tools = await discoverTools();
  } catch (error) {
    throw error;
  }

  authStore.seedInitialAdminIfEmpty(auth.hashPassword(process.env.DOCS_PASS || "changeme"));

  if (isStreamableHttp && isSSE) {
    console.error("Error: Cannot specify both --streamable-http and --sse");
    process.exit(1);
  }

  const toolsRef = { current: tools };

  if (isStreamableHttp) {
    await setupStreamableHttp(toolsRef);
  } else if (isSSE) {
    await setupSSE(toolsRef);
  } else {
    await setupStdio(tools);
  }
}

run().catch(console.error);

