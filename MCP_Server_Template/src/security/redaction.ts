interface RedactionOptions {
  headers?: string[];
  tokens?: string[];
}

const DEFAULT_SENSITIVE_HEADERS = ["authorization", "x-api-key", "x-mcp-key"];

export function redactHeaders(
  headers: Record<string, unknown>,
  options: RedactionOptions = {},
): Record<string, unknown> {
  const sensitive = new Set<string>([
    ...DEFAULT_SENSITIVE_HEADERS,
    ...(options.headers ?? []).map((h) => h.toLowerCase()),
  ]);

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (sensitive.has(key.toLowerCase())) {
      out[key] = "[redacted]";
    } else {
      out[key] = value;
    }
  }
  return out;
}

export function redactText(text: string, options: RedactionOptions = {}): string {
  let out = text;
  for (const token of options.tokens ?? []) {
    if (!token) continue;
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp(escaped, "g"), "[redacted]");
  }
  return out;
}

