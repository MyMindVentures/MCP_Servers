import type { FastifyRequest, FastifyReply } from "fastify";
import type { ToolsRegistry } from "../capabilities/toolsRegistry.js";

export interface OpenAiToolsContext {
  toolsRegistry: ToolsRegistry;
}

export function createOpenAiToolsHandler(ctx: OpenAiToolsContext) {
  return async function openAiToolsHandler(
    _request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const tools = ctx.toolsRegistry.listTools().map((tool) => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema,
      },
    }));

    await reply.send({
      object: "list",
      data: tools,
    });
  };
}

