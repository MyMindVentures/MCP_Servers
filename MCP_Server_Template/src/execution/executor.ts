import type { ToolDefinition, ResourceDefinition } from "../capabilities/types.js";
import type { AppConfig } from "../config/types.js";
import { HttpClient } from "./httpClient.js";
import { CircuitBreaker } from "./circuitBreaker.js";
import { Semaphore } from "./concurrency.js";

export interface ExecutionMeta {
  truncated?: boolean;
  nextPage?: string;
}

export interface ExecutionOk<T = unknown> {
  ok: true;
  result: T;
  meta?: ExecutionMeta;
}

export interface ExecutionError {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: ExecutionMeta;
}

export type ExecutionResult<T = unknown> = ExecutionOk<T> | ExecutionError;

export class ExecutionEngine {
  private readonly httpClient: HttpClient;
  private readonly breaker: CircuitBreaker;
  private readonly globalSemaphore: Semaphore;
  private readonly perToolSemaphores = new Map<string, Semaphore>();

  constructor(private readonly config: AppConfig) {
    this.httpClient = new HttpClient(config);
    this.breaker = new CircuitBreaker(
      config.circuitBreaker.errorThreshold,
      config.circuitBreaker.resetMs,
    );
    this.globalSemaphore = new Semaphore(config.concurrency.globalMaxConcurrent);
  }

  async executeTool(
    tool: ToolDefinition,
    args: Record<string, unknown>,
  ): Promise<ExecutionResult> {
    return this.executeWithPolicies(tool.name, tool.policyOverrides, async () => {
      const path = this.buildPath(tool.path, args);
      const query = this.buildQuery(args);
      const timeoutMs =
        tool.policyOverrides?.timeoutMs ??
        this.config.timeouts.perTool?.[tool.name] ??
        this.config.timeouts.defaultMs;

      const res = await this.httpClient.send({
        method: tool.method,
        path,
        query,
        body: args.body,
        timeoutMs,
      });

      return this.normalizeResponse(res.body, res.status, tool.responseHints?.truncateAtChars);
    });
  }

  async executeResource(
    resource: ResourceDefinition,
    uri: string,
  ): Promise<ExecutionResult> {
    return this.executeWithPolicies(resource.uriPattern, undefined, async () => {
      const handler = resource.readHandler;
      const path = handler.path;
      const res = await this.httpClient.send({
        method: handler.method,
        path,
      });

      return this.normalizeResponse(res.body, res.status, resource.truncationChars);
    });
  }

  private async executeWithPolicies(
    key: string,
    policy: ToolDefinition["policyOverrides"] | undefined,
    fn: () => Promise<ExecutionResult>,
  ): Promise<ExecutionResult> {
    const semaphore = this.getSemaphoreForKey(key, policy?.maxConcurrent);

    await this.globalSemaphore.acquire();
    await semaphore.acquire();
    try {
      const hostKey = new URL(this.config.baseUrl).host;
      return await this.breaker.execute(hostKey, async () => {
        try {
          const result = await fn();
          if (!result.ok) {
            // still counts as a success for breaker to avoid tripping on 4xx
            return result;
          }
          return result;
        } catch (err: any) {
          return {
            ok: false,
            error: {
              code: "upstream_error",
              message: err?.message ?? "Upstream error",
              details: err,
            },
          };
        }
      });
    } finally {
      semaphore.release();
      this.globalSemaphore.release();
    }
  }

  private getSemaphoreForKey(key: string, overrideMax?: number): Semaphore {
    if (overrideMax != null) {
      return new Semaphore(overrideMax);
    }
    let sem = this.perToolSemaphores.get(key);
    if (!sem) {
      const max = this.config.concurrency.perToolMaxConcurrent?.[key] ?? this.config.concurrency.globalMaxConcurrent;
      sem = new Semaphore(max);
      this.perToolSemaphores.set(key, sem);
    }
    return sem;
  }

  private buildPath(template: string, args: Record<string, unknown>): string {
    return template.replace(/\{([^}]+)}/g, (_, key) => {
      const value = args[key];
      return encodeURIComponent(value == null ? "" : String(value));
    });
  }

  private buildQuery(args: Record<string, unknown>): URLSearchParams {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(args)) {
      if (k === "body") continue;
      if (v == null) continue;
      params.set(k, String(v));
    }
    return params;
  }

  private normalizeResponse(
    body: unknown,
    status: number,
    truncateAtChars?: number,
  ): ExecutionResult {
    let payload: unknown = body;
    const meta: ExecutionMeta = {};

    if (typeof body === "string" && truncateAtChars && body.length > truncateAtChars) {
      payload = body.slice(0, truncateAtChars);
      meta.truncated = true;
    }

    if (status >= 200 && status < 300) {
      return { ok: true, result: payload, meta };
    }

    return {
      ok: false,
      error: {
        code: `upstream_${status}`,
        message: "Upstream request failed",
        details: { status, body },
      },
      meta,
    };
  }
}

