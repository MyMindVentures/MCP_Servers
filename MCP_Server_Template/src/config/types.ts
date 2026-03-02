export type ToolSource = "curated" | "openapi";

export type AuthMode = "api_key" | "jwt" | "none";

export type UpstreamAuthType = "bearer" | "api_key" | "oauth2" | "service_account";

export interface UpstreamAuthConfig {
  type: UpstreamAuthType;
  tokenEnv?: string;
  apiKeyHeaderName?: string;
}

export interface TimeoutsConfig {
  defaultMs: number;
  perTool?: Record<string, number>;
}

export interface RetryConfig {
  maxRetries: number;
  backoffMs: number;
  retryOnPost?: boolean;
}

export interface CircuitBreakerConfig {
  errorThreshold: number;
  resetMs: number;
}

export interface ConcurrencyConfig {
  globalMaxConcurrent: number;
  perToolMaxConcurrent?: Record<string, number>;
}

export interface SecurityConfig {
  authMode: AuthMode;
  mcpApiKey?: string;
  allowedUpstreamHosts: string[];
}

export interface ObservabilityConfig {
  logLevel: "trace" | "debug" | "info" | "warn" | "error";
}

export interface AppConfig {
  appName: string;
  baseUrl: string;
  toolSource: ToolSource;
  toolsConfigPath?: string;
  openapiPath?: string;
  upstreamAuth: UpstreamAuthConfig;
  timeouts: TimeoutsConfig;
  retries: RetryConfig;
  circuitBreaker: CircuitBreakerConfig;
  concurrency: ConcurrencyConfig;
  security: SecurityConfig;
  observability: ObservabilityConfig;
}

