import { trace } from "@opentelemetry/api";

export function getTracer() {
  return trace.getTracer("mcp-server-template");
}

