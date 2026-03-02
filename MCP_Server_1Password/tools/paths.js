/**
 * Tool definitions for the 1Password Connect MCP server.
 * Base URL from ONEPASSWORD_CONNECT_HOST (e.g. http://host:8080/v1), Bearer ONEPASSWORD_CONNECT_TOKEN.
 * See https://developer.1password.com/docs/connect/api-reference/
 */
export const toolPaths = [
  'onepassword-api/list_vaults.js',
  'onepassword-api/get_vault.js',
  'onepassword-api/list_items.js',
  'onepassword-api/get_item.js',
  'onepassword-api/create_item.js',
  'onepassword-api/replace_item.js',
  'onepassword-api/update_item.js',
  'onepassword-api/delete_item.js',
  'onepassword-api/list_files.js',
  'onepassword-api/get_file.js',
  'onepassword-api/get_file_content.js',
  'onepassword-api/list_activity.js',
  'onepassword-api/heartbeat.js',
  'onepassword-api/health.js',
];
