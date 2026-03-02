import type { PromptDefinition } from "./types.js";

export interface PromptsRegistry {
  listPrompts(): PromptDefinition[];
  getPrompt(name: string): PromptDefinition | undefined;
}

export class InMemoryPromptsRegistry implements PromptsRegistry {
  private readonly promptsByName: Map<string, PromptDefinition>;

  constructor(prompts: PromptDefinition[]) {
    this.promptsByName = new Map(prompts.map((p) => [p.name, p]));
  }

  listPrompts(): PromptDefinition[] {
    return [...this.promptsByName.values()];
  }

  getPrompt(name: string): PromptDefinition | undefined {
    return this.promptsByName.get(name);
  }
}

