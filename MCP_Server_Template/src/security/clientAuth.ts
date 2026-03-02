import type { FastifyRequest, FastifyReply } from "fastify";
import type { AppConfig } from "../config/types.js";

export function createClientAuthHook(config: AppConfig) {
  return async function clientAuthHook(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    if (config.security.authMode === "none") {
      return;
    }

    if (config.security.authMode === "api_key") {
      const headerKey = request.headers["x-mcp-key"];
      const provided =
        typeof headerKey === "string" ? headerKey : Array.isArray(headerKey) ? headerKey[0] : undefined;

      if (!config.security.mcpApiKey || provided !== config.security.mcpApiKey) {
        await reply.code(401).send({ error: { code: "unauthorized", message: "Invalid MCP API key" } });
        return;
      }

      return;
    }

    if (config.security.authMode === "jwt") {
      // Placeholder: JWT validation can be added here (e.g. via OIDC).
      return;
    }
  };
}

