import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { z } from "zod";
import type { AppConfig } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

const TimeoutsSchema = z.object({
  defaultMs: z.number().int().positive(),
  perTool: z.record(z.number().int().positive()).optional(),
});

const RetrySchema = z.object({
  maxRetries: z.number().int().nonnegative(),
  backoffMs: z.number().int().nonnegative(),
  retryOnPost: z.boolean().optional(),
});

const CircuitBreakerSchema = z.object({
  errorThreshold: z.number().min(0).max(1),
  resetMs: z.number().int().positive(),
});

const ConcurrencySchema = z.object({
  globalMaxConcurrent: z.number().int().positive(),
  perToolMaxConcurrent: z.record(z.number().int().positive()).optional(),
});

const SecuritySchema = z.object({
  authMode: z.enum(["api_key", "jwt", "none"]),
  mcpApiKey: z.string().optional(),
  allowedUpstreamHosts: z.array(z.string().min(1)),
});

const ObservabilitySchema = z.object({
  logLevel: z.enum(["trace", "debug", "info", "warn", "error"]).default("info"),
});

const AppConfigSchema = z.object({
  appName: z.string().min(1),
  baseUrl: z.string().url(),
  toolSource: z.enum(["curated", "openapi"]),
  toolsConfigPath: z.string().optional(),
  openapiPath: z.string().optional(),
  upstreamAuth: z.object({
    type: z.enum(["bearer", "api_key", "oauth2", "service_account"]),
    tokenEnv: z.string().optional(),
    apiKeyHeaderName: z.string().optional(),
  }),
  timeouts: TimeoutsSchema,
  retries: RetrySchema,
  circuitBreaker: CircuitBreakerSchema,
  concurrency: ConcurrencySchema,
  security: SecuritySchema,
  observability: ObservabilitySchema,
});

export async function loadConfig(): Promise<AppConfig> {
  const defaultPath = resolve(__dirname, "../../config/default.yaml");
  const raw = await readFile(defaultPath, "utf8");
  const parsed = parse(raw) as unknown;

  const merged = applyEnvOverrides(parsed);
  const result = AppConfigSchema.safeParse(merged);

  if (!result.success) {
    throw new Error(`Invalid configuration: ${result.error.toString()}`);
  }

  return result.data;
}

function applyEnvOverrides(config: any): any {
  const copy = structuredClone(config);

  if (process.env.APP_NAME) {
    copy.appName = process.env.APP_NAME;
  }
  if (process.env.BASE_URL) {
    copy.baseUrl = process.env.BASE_URL;
  }
  if (process.env.TOOLS_SOURCE) {
    copy.toolSource = process.env.TOOLS_SOURCE;
  }
  if (process.env.TOOLS_CONFIG_PATH) {
    copy.toolsConfigPath = process.env.TOOLS_CONFIG_PATH;
  }
  if (process.env.OPENAPI_PATH) {
    copy.openapiPath = process.env.OPENAPI_PATH;
  }
  if (process.env.ALLOWED_UPSTREAM_HOSTS) {
    copy.security.allowedUpstreamHosts = process.env.ALLOWED_UPSTREAM_HOSTS.split(",").map((h) =>
      h.trim(),
    );
  }
  if (process.env.AUTH_MODE) {
    copy.security.authMode = process.env.AUTH_MODE;
  }
  if (process.env.MCP_API_KEY) {
    copy.security.mcpApiKey = process.env.MCP_API_KEY;
  }
  if (process.env.UPSTREAM_AUTH_TYPE) {
    copy.upstreamAuth.type = process.env.UPSTREAM_AUTH_TYPE;
  }
  if (process.env.UPSTREAM_TOKEN_ENV) {
    copy.upstreamAuth.tokenEnv = process.env.UPSTREAM_TOKEN_ENV;
  }
  if (process.env.LOG_LEVEL) {
    copy.observability.logLevel = process.env.LOG_LEVEL.toLowerCase();
  }

  return copy;
}

