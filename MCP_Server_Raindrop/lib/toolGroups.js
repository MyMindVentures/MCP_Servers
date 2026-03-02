/**
 * Tool groups and labels for the Raindrop MCP server.
 */
export const TOOL_GROUP_ORDER = [
  'collections',
  'raindrops',
  'tags',
  'user',
  'backups',
  'other',
];

export const TOOL_GROUP_LABELS = {
  collections: {
    title: 'Collections',
    description: 'List, get, create, update, and delete Raindrop collections.',
  },
  raindrops: {
    title: 'Raindrops',
    description: 'Bookmarks: list, get, create, update, delete.',
  },
  tags: {
    title: 'Tags',
    description: 'Get, rename, merge, and remove tags.',
  },
  user: {
    title: 'User',
    description: 'Authenticated user profile.',
  },
  backups: {
    title: 'Backups',
    description: 'List and create backups.',
  },
  other: {
    title: 'Other',
    description: 'Other tools.',
  },
};

export const TOOL_LABELS = {
  raindrop_list_collections: { group: 'collections', title: 'List collections', shortDescription: 'List root collections.' },
  raindrop_get_collection: { group: 'collections', title: 'Get collection', shortDescription: 'Get collection by ID.' },
  raindrop_create_collection: { group: 'collections', title: 'Create collection', shortDescription: 'Create a collection.' },
  raindrop_update_collection: { group: 'collections', title: 'Update collection', shortDescription: 'Update a collection.' },
  raindrop_delete_collection: { group: 'collections', title: 'Delete collection', shortDescription: 'Delete a collection.' },
  raindrop_list_raindrops: { group: 'raindrops', title: 'List raindrops', shortDescription: 'List bookmarks in a collection.' },
  raindrop_get_raindrop: { group: 'raindrops', title: 'Get raindrop', shortDescription: 'Get a bookmark by ID.' },
  raindrop_create_raindrop: { group: 'raindrops', title: 'Create raindrop', shortDescription: 'Create a bookmark.' },
  raindrop_update_raindrop: { group: 'raindrops', title: 'Update raindrop', shortDescription: 'Update a bookmark.' },
  raindrop_delete_raindrop: { group: 'raindrops', title: 'Delete raindrop', shortDescription: 'Delete a bookmark.' },
  raindrop_get_tags: { group: 'tags', title: 'Get tags', shortDescription: 'List all tags.' },
  raindrop_rename_tag: { group: 'tags', title: 'Rename tag', shortDescription: 'Rename a tag.' },
  raindrop_merge_tags: { group: 'tags', title: 'Merge tags', shortDescription: 'Merge tags into one.' },
  raindrop_remove_tags: { group: 'tags', title: 'Remove tags', shortDescription: 'Remove tag(s).' },
  raindrop_get_user: { group: 'user', title: 'Get user', shortDescription: 'Get authenticated user.' },
  raindrop_get_backups: { group: 'backups', title: 'Get backups', shortDescription: 'List backups.' },
  raindrop_create_backup: { group: 'backups', title: 'Create backup', shortDescription: 'Trigger new backup.' },
};

export function getToolLabel(toolId) {
  const def = TOOL_LABELS[toolId];
  if (def) return { ...def };
  return {
    group: 'other',
    title: toolId,
    shortDescription: 'No description available.',
  };
}
