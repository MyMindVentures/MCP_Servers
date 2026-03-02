export type McpRequestType =
  | "tools/list"
  | "tools/call"
  | "resources/list"
  | "resources/read"
  | "prompts/list"
  | "prompts/get";

export interface McpRequest {
  id: string;
  type: McpRequestType;
  params?: Record<string, unknown>;
}

export interface McpError {
  code: string;
  message: string;
  details?: unknown;
}

export interface McpResponse {
  id: string;
  ok: boolean;
  result?: unknown;
  error?: McpError;
}

