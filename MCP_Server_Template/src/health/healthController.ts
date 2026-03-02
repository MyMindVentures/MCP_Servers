import type { FastifyRequest, FastifyReply } from "fastify";

export function createHealthHandler() {
  return async function healthHandler(
    _request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    await reply.send({ status: "ok" });
  };
}

