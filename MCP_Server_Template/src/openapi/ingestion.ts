import SwaggerParser from "@apidevtools/swagger-parser";
import { resolve } from "node:path";
import type { OpenAPIV3 } from "openapi-types";
import type { ToolDefinition } from "../capabilities/types.js";
import type { AppConfig } from "../config/types.js";
import { mapOpenApiToTools, type OpenApiToolGenOptions } from "./mappers.js";

export interface OpenApiIngestionConfig extends OpenApiToolGenOptions {}

export async function generateToolsFromOpenApi(
  appConfig: AppConfig,
  options: OpenApiIngestionConfig = {},
): Promise<ToolDefinition[]> {
  if (!appConfig.openapiPath) {
    throw new Error("openapiPath must be configured to use OpenAPI tool generation");
  }

  const path = resolve(process.cwd(), appConfig.openapiPath);
  const api = (await SwaggerParser.parse(path)) as OpenAPIV3.Document;

  const tools = mapOpenApiToTools(api, {
    renamePrefix: appConfig.appName.replace(/[^\w]+/g, "_").toLowerCase(),
    ...options,
  });

  return tools;
}

