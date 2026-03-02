import { createServer } from "./server.js";
import { loadConfig } from "./config/loader.js";
import { createLogger } from "./observability/logger.js";

async function main() {
  const logger = createLogger();

  try {
    const config = await loadConfig();
    const server = await createServer({ config, logger });

    const port = Number(process.env.PORT ?? 3000);
    await server.listen({ port, host: "0.0.0.0" });

    logger.info({ port }, "MCP Server Template listening");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start MCP Server Template", error);
    process.exit(1);
  }
}

void main();

