import type { ResourceDefinition } from "./types.js";

export interface ResourcesRegistry {
  listResources(): ResourceDefinition[];
  getResource(uri: string): ResourceDefinition | undefined;
}

export class InMemoryResourcesRegistry implements ResourcesRegistry {
  private readonly resources: ResourceDefinition[];

  constructor(resources: ResourceDefinition[]) {
    this.resources = resources;
  }

  listResources(): ResourceDefinition[] {
    return [...this.resources];
  }

  getResource(uri: string): ResourceDefinition | undefined {
    return this.resources.find((r) => matchesPattern(r.uriPattern, uri));
  }
}

function matchesPattern(pattern: string, uri: string): boolean {
  if (pattern === uri) return true;
  // very small glob-style matcher for {id} segments
  const regex = new RegExp(
    "^" +
      pattern
        .replace(/\./g, "\\.")
        .replace(/\//g, "\\/")
        .replace(/\{[^/]+}/g, "[^/]+") +
      "$",
  );
  return regex.test(uri);
}

