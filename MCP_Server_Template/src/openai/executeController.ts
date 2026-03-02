import type { FastifyRequest, FastifyReply } from "fastify";
import type { ToolsRegistry } from "../capabilities/toolsRegistry.js";
import type { ExecutionEngine } from "../execution/executor.js";

export interface OpenAiExecuteContext {
  toolsRegistry: ToolsRegistry;
  executionEngine: ExecutionEngine;
}

interface ExecuteBody {
  name: string;
  arguments?: unknown;
}

export function createOpenAiExecuteHandler(ctx: OpenAiExecuteContext) {
  return async function openAiExecuteHandler(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const body = request.body as ExecuteBody;
    const name = body.name;
    let args: Record<string, unknown> = {};

    if (typeof body.arguments === "string") {
      try {
        args = JSON.parse(body.arguments) as Record<string, unknown>;
      } catch {
        await reply.code(400).send({
          ok: false,
          error: { code: "invalid_arguments", message: "arguments must be valid JSON" },
        });
        return;
      }
    } else if (body.arguments && typeof body.arguments === "object") {
      args = body.arguments as Record<string, unknown>;
    }

    const tool = ctx.toolsRegistry.getTool(name);
    if (!tool) {
      await reply.code(404).send({
        ok: false,
        error: { code: "tool_not_found", message: `Tool not found: ${name}` },
      });
      return;
    }

    const result = await ctx.executionEngine.executeTool(tool, args);
    await reply.send({ ok: result.ok, tool_result: result });
  };
}

