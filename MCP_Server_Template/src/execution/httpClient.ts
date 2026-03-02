import { request } from "undici";
import type { AppConfig } from "../config/types.js";
import { assertAllowedUpstream } from "../security/upstreamGuard.js";

export interface HttpRequestOptions {
  method: string;
  path: string;
  headers?: Record<string, string>;
  query?: URLSearchParams;
  body?: unknown;
  timeoutMs?: number;
}

export interface HttpResponse<T = unknown> {
  status: number;
  headers: Record<string, string>;
  body: T;
}

export class HttpClient {
  constructor(private readonly config: AppConfig) {}

  async send<T = unknown>(options: HttpRequestOptions): Promise<HttpResponse<T>> {
    const url = new URL(options.path, this.config.baseUrl);
    assertAllowedUpstream(url, this.config);
    if (options.query) {
      url.search = options.query.toString();
    }

    const timeout = options.timeoutMs ?? this.config.timeouts.defaultMs;

    const res = await request(url, {
      method: options.method,
      headers: options.headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      bodyTimeout: timeout,
      headersTimeout: timeout,
    });

    const contentType = res.headers["content-type"] ?? "";
    let parsed: any;
    if (typeof contentType === "string" && contentType.includes("application/json")) {
      parsed = await res.body.json();
    } else {
      parsed = await res.body.text();
    }

    const headers: Record<string, string> = {};
    for (const [k, v] of Object.entries(res.headers)) {
      if (Array.isArray(v)) {
        headers[k] = v.join(", ");
      } else if (v != null) {
        headers[k] = String(v);
      }
    }

    return {
      status: res.statusCode,
      headers,
      body: parsed as T,
    };
  }
}

