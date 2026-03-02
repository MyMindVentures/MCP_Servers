import type { FastifyRequest, FastifyReply } from "fastify";

export function createOpenAiChatHandler() {
  return async function openAiChatHandler(
    _request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    await reply.code(501).send({
      error: {
        code: "not_implemented",
        message: "Server-side chat loop is not implemented yet.",
      },
    });
  };
}

