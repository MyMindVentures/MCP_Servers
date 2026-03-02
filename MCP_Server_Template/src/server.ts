import Fastify, { FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { registerRoutes } from "./transport/routes.js";
import type { AppConfig } from "./config/types.js";
import type { AppLogger } from "./observability/logger.js";
import { loadToolsRegistry } from "./capabilities/toolsRegistry.js";
import { InMemoryResourcesRegistry } from "./capabilities/resourcesRegistry.js";
import { InMemoryPromptsRegistry } from "./capabilities/promptsRegistry.js";
import { NoopSamplingBridge } from "./capabilities/samplingBridge.js";
import { ExecutionEngine } from "./execution/executor.js";

export interface ServerDeps {
  config: AppConfig;
  logger: AppLogger;
}

export async function createServer(deps: ServerDeps): Promise<FastifyInstance> {
  const app = Fastify({
    logger: deps.logger,
  });

  await app.register(helmet);
  await app.register(sensible);

  const toolsRegistry = await loadToolsRegistry(deps.config);
  const resourcesRegistry = new InMemoryResourcesRegistry([]);
  const promptsRegistry = new InMemoryPromptsRegistry([]);
  const samplingBridge = new NoopSamplingBridge();
  const executionEngine = new ExecutionEngine(deps.config);

  await registerRoutes(app, {
    config: deps.config,
    logger: deps.logger,
    toolsRegistry,
    resourcesRegistry,
    promptsRegistry,
    samplingBridge,
    executionEngine,
  });

  return app;
}

