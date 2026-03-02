/**
 * Tool groups and labels for the Notion MCP server Manual and Settings UI.
 */
export const TOOL_GROUP_ORDER = [
  'users',
  'pages',
  'databases',
  'blocks',
  'comments',
  'search',
  'other',
];

export const TOOL_GROUP_LABELS = {
  users: {
    title: 'Users',
    description: 'List and retrieve workspace users and the bot user.',
  },
  pages: {
    title: 'Pages',
    description: 'Create, retrieve, update, and archive Notion pages.',
  },
  databases: {
    title: 'Databases',
    description: 'Create, retrieve, update, and query Notion databases.',
  },
  blocks: {
    title: 'Blocks',
    description: 'Retrieve, append, update, and delete block content.',
  },
  comments: {
    title: 'Comments',
    description: 'List, create, and retrieve comments on pages and blocks.',
  },
  search: {
    title: 'Search',
    description: 'Search across pages and databases.',
  },
  other: {
    title: 'Other',
    description: 'Page properties and other tools.',
  },
};

export const TOOL_LABELS = {
  notion_list_users: { group: 'users', title: 'List users', shortDescription: 'List all users in the workspace.' },
  notion_retrieve_user: { group: 'users', title: 'Retrieve user', shortDescription: 'Get a user by ID.' },
  notion_retrieve_bot: { group: 'users', title: 'Retrieve bot', shortDescription: 'Get the token\'s bot user.' },
  notion_retrieve_page: { group: 'pages', title: 'Retrieve page', shortDescription: 'Get a page by ID.' },
  notion_update_page: { group: 'pages', title: 'Update page', shortDescription: 'Update page properties.' },
  notion_create_page: { group: 'pages', title: 'Create page', shortDescription: 'Create a new page.' },
  notion_archive_page: { group: 'pages', title: 'Archive page', shortDescription: 'Archive (trash) a page.' },
  notion_retrieve_database: { group: 'databases', title: 'Retrieve database', shortDescription: 'Get a database by ID.' },
  notion_update_database: { group: 'databases', title: 'Update database', shortDescription: 'Update database metadata.' },
  notion_create_database: { group: 'databases', title: 'Create database', shortDescription: 'Create a new database.' },
  notion_query_database: { group: 'databases', title: 'Query database', shortDescription: 'Query database with filter/sort.' },
  notion_retrieve_block: { group: 'blocks', title: 'Retrieve block', shortDescription: 'Get a block by ID.' },
  notion_get_block_children: { group: 'blocks', title: 'Get block children', shortDescription: 'List child blocks.' },
  notion_append_block_children: { group: 'blocks', title: 'Append block children', shortDescription: 'Add blocks to a page/block.' },
  notion_update_block: { group: 'blocks', title: 'Update block', shortDescription: 'Update block content.' },
  notion_delete_block: { group: 'blocks', title: 'Delete block', shortDescription: 'Delete a block.' },
  notion_list_comments: { group: 'comments', title: 'List comments', shortDescription: 'List comments on a page/block.' },
  notion_create_comment: { group: 'comments', title: 'Create comment', shortDescription: 'Add a comment.' },
  notion_retrieve_comment: { group: 'comments', title: 'Retrieve comment', shortDescription: 'Get a comment by ID.' },
  notion_search: { group: 'search', title: 'Search', shortDescription: 'Search pages and databases.' },
  notion_retrieve_page_property: { group: 'other', title: 'Retrieve page property', shortDescription: 'Get a single page property value.' },
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
