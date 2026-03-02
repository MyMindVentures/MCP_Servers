/**
 * Tool groups and labels for the 1Password Connect MCP server.
 */
export const TOOL_GROUP_ORDER = ['vaults', 'items', 'files', 'activity', 'other'];

export const TOOL_GROUP_LABELS = {
  vaults: { title: 'Vaults', description: 'List and get vault details.' },
  items: { title: 'Items', description: 'List, get, create, replace, update, delete items.' },
  files: { title: 'Files', description: 'List files, get file details and content.' },
  activity: { title: 'Activity', description: 'List API activity, heartbeat, health.' },
  other: { title: 'Other', description: 'Other tools.' },
};

export const TOOL_LABELS = {
  onepassword_list_vaults: { group: 'vaults', title: 'List vaults', shortDescription: 'List vaults (optional filter).' },
  onepassword_get_vault: { group: 'vaults', title: 'Get vault', shortDescription: 'Get vault by UUID.' },
  onepassword_list_items: { group: 'items', title: 'List items', shortDescription: 'List items in a vault.' },
  onepassword_get_item: { group: 'items', title: 'Get item', shortDescription: 'Get item details.' },
  onepassword_create_item: { group: 'items', title: 'Create item', shortDescription: 'Add an item to a vault.' },
  onepassword_replace_item: { group: 'items', title: 'Replace item', shortDescription: 'Replace item with full body.' },
  onepassword_update_item: { group: 'items', title: 'Update item', shortDescription: 'JSON Patch update.' },
  onepassword_delete_item: { group: 'items', title: 'Delete item', shortDescription: 'Delete an item.' },
  onepassword_list_files: { group: 'files', title: 'List files', shortDescription: 'List files in an item.' },
  onepassword_get_file: { group: 'files', title: 'Get file', shortDescription: 'Get file details.' },
  onepassword_get_file_content: { group: 'files', title: 'Get file content', shortDescription: 'Get raw file content.' },
  onepassword_list_activity: { group: 'activity', title: 'List activity', shortDescription: 'List API requests.' },
  onepassword_heartbeat: { group: 'activity', title: 'Heartbeat', shortDescription: 'Ping Connect server.' },
  onepassword_health: { group: 'activity', title: 'Health', shortDescription: 'Server health and dependencies.' },
};

export function getToolLabel(toolId) {
  const def = TOOL_LABELS[toolId];
  if (def) return { ...def };
  return { group: 'other', title: toolId, shortDescription: 'No description available.' };
}
