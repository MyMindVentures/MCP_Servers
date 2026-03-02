import type { FastifyInstance } from "fastify";
import type { AppConfig } from "../config/types.js";
import type { AppLogger } from "../observability/logger.js";
import type { ToolsRegistry } from "../capabilities/toolsRegistry.js";
import type { ResourcesRegistry } from "../capabilities/resourcesRegistry.js";
import type { PromptsRegistry } from "../capabilities/promptsRegistry.js";
import type { SamplingBridge } from "../capabilities/samplingBridge.js";
import { createClientAuthHook } from "../security/clientAuth.js";
import { createMcpHttpHandler } from "./mcpHttp.js";
import { createMcpSseHandler } from "./mcpSse.js";
import type { ExecutionEngine } from "../execution/executor.js";
import { createOpenAiToolsHandler } from "../openai/toolsController.js";
import { createOpenAiExecuteHandler } from "../openai/executeController.js";
import { createOpenAiChatHandler } from "../openai/chatController.js";
import { createHealthHandler } from "../health/healthController.js";
import { createReadyHandler } from "../health/readyController.js";
import { createMetricsHandler } from "../health/metricsController.js";

export interface RouteDeps {
  config: AppConfig;
  logger: AppLogger;
  toolsRegistry: ToolsRegistry;
  resourcesRegistry: ResourcesRegistry;
  promptsRegistry: PromptsRegistry;
  samplingBridge: SamplingBridge;
  executionEngine: ExecutionEngine;
}

export async function registerRoutes(app: FastifyInstance, deps: RouteDeps): Promise<void> {
  const clientAuth = createClientAuthHook(deps.config);

  app.post(
    "/mcp",
    {
      preHandler: clientAuth,
    },
    createMcpHttpHandler({
      toolsRegistry: deps.toolsRegistry,
      resourcesRegistry: deps.resourcesRegistry,
      promptsRegistry: deps.promptsRegistry,
      executionEngine: deps.executionEngine,
    }),
  );

  app.get(
    "/sse",
    {
      preHandler: clientAuth,
    },
    createMcpSseHandler(),
  );

  app.get(
    "/openai/tools",
    {
      preHandler: clientAuth,
    },
    createOpenAiToolsHandler({ toolsRegistry: deps.toolsRegistry }),
  );

  app.post(
    "/openai/execute",
    {
      preHandler: clientAuth,
    },
    createOpenAiExecuteHandler({
      toolsRegistry: deps.toolsRegistry,
      executionEngine: deps.executionEngine,
    }),
  );

  app.post(
    "/openai/chat",
    {
      preHandler: clientAuth,
    },
    createOpenAiChatHandler(),
  );

  app.get("/health", createHealthHandler());
  app.get("/ready", createReadyHandler());
  app.get("/metrics", createMetricsHandler());
}

