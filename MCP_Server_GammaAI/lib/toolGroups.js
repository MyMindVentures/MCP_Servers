/**
 * Tool groups and labels for the Gamma AI MCP server.
 */
export const TOOL_GROUP_ORDER = ['generations', 'themes', 'folders', 'other'];

export const TOOL_GROUP_LABELS = {
  generations: { title: 'Generations', description: 'Create and get Gamma generations (presentations, documents, webpages).' },
  themes: { title: 'Themes', description: 'List available themes for styling.' },
  folders: { title: 'Folders', description: 'List workspace folders.' },
  other: { title: 'Other', description: 'Other tools.' },
};

export const TOOL_LABELS = {
  gamma_create_generation: { group: 'generations', title: 'Create generation', shortDescription: 'Create a presentation, document, or webpage from text.' },
  gamma_get_generation: { group: 'generations', title: 'Get generation', shortDescription: 'Get a generation by ID.' },
  gamma_list_themes: { group: 'themes', title: 'List themes', shortDescription: 'List available themes.' },
  gamma_list_folders: { group: 'folders', title: 'List folders', shortDescription: 'List workspace folders.' },
};

export function getToolLabel(toolId) {
  const def = TOOL_LABELS[toolId];
  if (def) return { ...def };
  return { group: 'other', title: toolId, shortDescription: 'No description available.' };
}
