import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createServer } from "../src/server.js";
import { loadConfig } from "../src/config/loader.js";
import { createLogger } from "../src/observability/logger.js";

let baseUrl: string;

describe("MCP and OpenAI routes", () => {
  beforeAll(async () => {
    const config = await loadConfig();
    const logger = createLogger();
    const app = await createServer({ config, logger });
    const address = await app.listen({ port: 0 });
    baseUrl = typeof address === "string" ? address : `http://localhost:${address.port}`;
  });

  afterAll(async () => {
    // Fastify instance will exit with process; rely on test runner cleanup.
  });

  it("exposes /health", async () => {
    const res = await fetch(new URL("/health", baseUrl));
    expect(res.status).toBe(200);
  });

  it("lists tools via /mcp", async () => {
    const res = await fetch(new URL("/mcp", baseUrl), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-mcp-key": "replace-me",
      },
      body: JSON.stringify({
        id: "1",
        type: "tools/list",
      }),
    });

    expect(res.status).toBe(200);
  });

  it("lists tools via /openai/tools", async () => {
    const res = await fetch(new URL("/openai/tools", baseUrl), {
      headers: {
        "x-mcp-key": "replace-me",
      },
    });
    expect(res.status).toBe(200);
  });
});

