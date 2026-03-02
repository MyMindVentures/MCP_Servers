import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { z } from "zod";
import type { ToolDefinition } from "./types.js";
import type { AppConfig } from "../config/types.js";
import { generateToolsFromOpenApi } from "../openapi/ingestion.js";

const ToolDefinitionSchema: z.ZodType<ToolDefinition> = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  path: z.string().min(1),
  params: z
    .object({
      path: z.record(z.string()).optional(),
      query: z.record(z.string()).optional(),
      body: z.record(z.string()).optional(),
      headers: z.record(z.string()).optional(),
    })
    .partial()
    .optional(),
  inputSchema: z.record(z.any()),
  responseHints: z
    .object({
      mimeType: z.string().optional(),
      truncateAtChars: z.number().int().positive().optional(),
    })
    .partial()
    .optional(),
  policyOverrides: z
    .object({
      timeoutMs: z.number().int().positive().optional(),
      maxRetries: z.number().int().nonnegative().optional(),
      maxConcurrent: z.number().int().positive().optional(),
    })
    .partial()
    .optional(),
});

const ToolsConfigSchema = z.object({
  tools: z.array(ToolDefinitionSchema),
});

export interface ToolsRegistry {
  listTools(): ToolDefinition[];
  getTool(name: string): ToolDefinition | undefined;
}

export class InMemoryToolsRegistry implements ToolsRegistry {
  private readonly toolsByName: Map<string, ToolDefinition>;

  constructor(tools: ToolDefinition[]) {
    this.toolsByName = new Map(tools.map((t) => [t.name, t]));
  }

  listTools(): ToolDefinition[] {
    return [...this.toolsByName.values()];
  }

  getTool(name: string): ToolDefinition | undefined {
    return this.toolsByName.get(name);
  }
}

export async function loadToolsRegistry(config: AppConfig): Promise<ToolsRegistry> {
  if (config.toolSource === "curated") {
    if (!config.toolsConfigPath) {
      throw new Error("toolsConfigPath is required when toolSource=curated");
    }
    const path = resolve(process.cwd(), config.toolsConfigPath);
    const raw = await readFile(path, "utf8");
    const json = JSON.parse(raw) as unknown;
    const parsed = ToolsConfigSchema.safeParse(json);
    if (!parsed.success) {
      throw new Error(`Invalid tools configuration: ${parsed.error.toString()}`);
    }
    ensureUniqueToolNames(parsed.data.tools);
    return new InMemoryToolsRegistry(parsed.data.tools);
  }

  // toolSource === "openapi"
  const tools = await generateToolsFromOpenApi(config);
  ensureUniqueToolNames(tools);
  return new InMemoryToolsRegistry(tools);
}

function ensureUniqueToolNames(tools: ToolDefinition[]) {
  const seen = new Set<string>();
  for (const tool of tools) {
    if (seen.has(tool.name)) {
      throw new Error(`Duplicate tool name detected: ${tool.name}`);
    }
    seen.add(tool.name);
  }
}

