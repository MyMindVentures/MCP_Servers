import client from "prom-client";

const registry = new client.Registry();

export const toolCallsTotal = new client.Counter({
  name: "mcp_tool_calls_total",
  help: "Total number of tool calls",
  labelNames: ["tool_name", "status"],
});

export const toolLatencySeconds = new client.Histogram({
  name: "mcp_tool_latency_seconds",
  help: "Latency of tool calls",
  labelNames: ["tool_name"],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10],
});

registry.registerMetric(toolCallsTotal);
registry.registerMetric(toolLatencySeconds);

client.collectDefaultMetrics({ register: registry });

export async function getMetrics(): Promise<string> {
  return registry.metrics();
}

