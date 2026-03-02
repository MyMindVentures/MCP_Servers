import type { OpenAPIV3 } from "openapi-types";
import type { ToolDefinition } from "../capabilities/types.js";

export interface OpenApiToolGenOptions {
  includeTags?: string[];
  excludePaths?: string[];
  maxTools?: number;
  renamePrefix?: string;
}

export function mapOpenApiToTools(
  doc: OpenAPIV3.Document,
  options: OpenApiToolGenOptions = {},
): ToolDefinition[] {
  const tools: ToolDefinition[] = [];
  const includeTags = options.includeTags ?? [];
  const excludePaths = options.excludePaths ?? [];

  for (const [path, item] of Object.entries(doc.paths ?? {})) {
    if (!item) continue;
    if (excludePaths.some((prefix) => path.startsWith(prefix))) continue;

    const methods: { method: string; op?: OpenAPIV3.OperationObject }[] = [
      { method: "get", op: (item as OpenAPIV3.PathItemObject).get },
      { method: "post", op: (item as OpenAPIV3.PathItemObject).post },
      { method: "put", op: (item as OpenAPIV3.PathItemObject).put },
      { method: "patch", op: (item as OpenAPIV3.PathItemObject).patch },
      { method: "delete", op: (item as OpenAPIV3.PathItemObject).delete },
    ];

    for (const { method, op } of methods) {
      if (!op) continue;
      if (includeTags.length > 0 && !op.tags?.some((t) => includeTags.includes(t))) {
        continue;
      }

      const name = buildToolName(options.renamePrefix, op.operationId ?? `${method}_${path}`);

      tools.push({
        name,
        description: op.description ?? op.summary ?? `Call ${method.toUpperCase()} ${path}`,
        method: method.toUpperCase() as ToolDefinition["method"],
        path,
        params: {
          path: {},
          query: {},
        },
        inputSchema: buildInputSchemaFromOperation(op),
      });

      if (options.maxTools && tools.length >= options.maxTools) {
        return tools;
      }
    }
  }

  return tools;
}

function buildToolName(prefix: string | undefined, rawName: string): string {
  const safe = rawName
    .replace(/[^\w]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
  return prefix ? `${prefix}.${safe}` : safe;
}

function buildInputSchemaFromOperation(op: OpenAPIV3.OperationObject) {
  const properties: Record<string, unknown> = {};
  const required: string[] = [];

  for (const param of op.parameters ?? []) {
    const p = param as OpenAPIV3.ParameterObject;
    const key = p.name;
    properties[key] = p.schema ?? { type: "string" };
    if (p.required) {
      required.push(key);
    }
  }

  if (op.requestBody) {
    const rb = op.requestBody as OpenAPIV3.RequestBodyObject;
    const json = rb.content?.["application/json"];
    if (json?.schema) {
      properties["body"] = json.schema;
      if (rb.required) {
        required.push("body");
      }
    }
  }

  return {
    type: "object",
    properties,
    required,
    additionalProperties: false,
  };
}

