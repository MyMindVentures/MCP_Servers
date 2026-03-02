import type { FastifyRequest, FastifyReply } from "fastify";

export function createMcpSseHandler() {
  return async function mcpSseHandler(
    _request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    reply.raw.writeHead(501, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    reply.raw.write(`event: error\ndata: ${JSON.stringify({ message: "SSE transport not implemented yet" })}\n\n`);
    reply.raw.end();
  };
}

