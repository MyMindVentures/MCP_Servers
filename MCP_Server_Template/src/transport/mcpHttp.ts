import type { FastifyRequest, FastifyReply } from "fastify";
import type { ToolsRegistry } from "../capabilities/toolsRegistry.js";
import type { ResourcesRegistry } from "../capabilities/resourcesRegistry.js";
import type { PromptsRegistry } from "../capabilities/promptsRegistry.js";
import type { ExecutionEngine } from "../execution/executor.js";
import type { McpRequest, McpResponse } from "../types/mcp.js";

export interface McpHttpContext {
  toolsRegistry: ToolsRegistry;
  resourcesRegistry: ResourcesRegistry;
  promptsRegistry: PromptsRegistry;
  executionEngine: ExecutionEngine;
}

export function createMcpHttpHandler(ctx: McpHttpContext) {
  return async function mcpHttpHandler(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const body = request.body as McpRequest | McpRequest[];
    const requests = Array.isArray(body) ? body : [body];

    const responses: McpResponse[] = [];

    for (const req of requests) {
      responses.push(await handleSingle(req, ctx));
    }

    await reply.send(Array.isArray(body) ? responses : responses[0]);
  };
}

async function handleSingle(req: McpRequest, ctx: McpHttpContext): Promise<McpResponse> {
  try {
    switch (req.type) {
      case "tools/list": {
        const tools = ctx.toolsRegistry.listTools().map((t) => ({
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema,
        }));
        return { id: req.id, ok: true, result: tools };
      }
      case "tools/call": {
        const name = String(req.params?.name ?? "");
        const args = (req.params?.arguments as Record<string, unknown>) ?? {};
        const tool = ctx.toolsRegistry.getTool(name);
        if (!tool) {
          return {
            id: req.id,
            ok: false,
            error: { code: "tool_not_found", message: `Tool not found: ${name}` },
          };
        }
        const result = await ctx.executionEngine.executeTool(tool, args);
        return { id: req.id, ...result };
      }
      case "resources/list": {
        const resources = ctx.resourcesRegistry.listResources();
        return { id: req.id, ok: true, result: resources };
      }
      case "resources/read": {
        const uri = String(req.params?.uri ?? "");
        const resource = ctx.resourcesRegistry.getResource(uri);
        if (!resource) {
          return {
            id: req.id,
            ok: false,
            error: { code: "resource_not_found", message: `Resource not found for uri: ${uri}` },
          };
        }
        const result = await ctx.executionEngine.executeResource(resource, uri);
        return { id: req.id, ...result };
      }
      case "prompts/list": {
        const prompts = ctx.promptsRegistry.listPrompts();
        return { id: req.id, ok: true, result: prompts };
      }
      case "prompts/get": {
        const name = String(req.params?.name ?? "");
        const prompt = ctx.promptsRegistry.getPrompt(name);
        if (!prompt) {
          return {
            id: req.id,
            ok: false,
            error: { code: "prompt_not_found", message: `Prompt not found: ${name}` },
          };
        }
        return { id: req.id, ok: true, result: prompt };
      }
      default:
        return {
          id: req.id,
          ok: false,
          error: { code: "unsupported_request_type", message: `Unsupported type: ${req.type}` },
        };
    }
  } catch (err: any) {
    return {
      id: req.id,
      ok: false,
      error: {
        code: "internal_error",
        message: err?.message ?? "Internal error",
        details: err,
      },
    };
  }
}

