export interface JsonSchema {
  // Kept loose on purpose; validated at config/ingestion time
  [key: string]: unknown;
}

export interface ToolPolicyOverrides {
  timeoutMs?: number;
  maxRetries?: number;
  maxConcurrent?: number;
}

export interface ToolDefinition {
  name: string;
  description: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  params?: {
    path?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, string>;
    headers?: Record<string, string>;
  };
  inputSchema: JsonSchema;
  responseHints?: {
    mimeType?: string;
    truncateAtChars?: number;
  };
  policyOverrides?: ToolPolicyOverrides;
}

export interface ResourceDefinition {
  uriPattern: string;
  listHandler?: {
    method: "GET";
    path: string;
    queryMapping?: Record<string, string>;
  };
  readHandler: {
    method: "GET";
    path: string;
    pathMapping?: Record<string, string>;
    queryMapping?: Record<string, string>;
  };
  mimeType?: string;
  isBinary?: boolean;
  truncationChars?: number;
  templates?: string[];
}

export interface PromptDefinition {
  name: string;
  description: string;
  argsSchema: JsonSchema;
  template: string | { role: "system" | "user" | "assistant"; content: string }[];
  version?: string;
}

export interface SamplingPolicy {
  maxTokens: number;
  allowedModelHints?: string[];
  requireHumanApproval?: boolean;
}

export interface SamplingRequest {
  id: string;
  prompt: string;
  policy: SamplingPolicy;
}

