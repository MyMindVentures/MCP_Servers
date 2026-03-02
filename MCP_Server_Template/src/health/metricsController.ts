import type { FastifyRequest, FastifyReply } from "fastify";
import { getMetrics } from "../observability/metrics.js";

export function createMetricsHandler() {
  return async function metricsHandler(
    _request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const body = await getMetrics();
    reply.header("Content-Type", "text/plain; version=0.0.4");
    await reply.send(body);
  };
}

