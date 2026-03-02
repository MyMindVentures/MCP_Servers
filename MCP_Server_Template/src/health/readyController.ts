import type { FastifyRequest, FastifyReply } from "fastify";

export function createReadyHandler() {
  return async function readyHandler(
    _request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    // For now, assume readiness once the server is running and config loaded.
    await reply.send({ status: "ready" });
  };
}

