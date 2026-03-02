/**
 * List all users in the Notion workspace. GET /v1/users
 * Requires NOTION_API_KEY. Pagination: start_cursor, page_size.
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List all users',
  request: {
    method: 'GET',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/users?page_size={{page_size}}&start_cursor={{start_cursor}}',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'users'],
      query: [
        { key: 'page_size', value: '{{page_size}}' },
        { key: 'start_cursor', value: '{{start_cursor}}' },
      ],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Notion-Version', value: '{{NOTION_VERSION}}' },
    ],
    body: null,
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{NOTION_API_KEY}}', type: 'string' }],
    },
  },
};

const collectionVariables = [
  { key: 'NOTION_BASE_URL', value: 'https://api.notion.com' },
  { key: 'NOTION_VERSION', value: '2022-06-28' },
];

const executeFunction = async ({ page_size, start_cursor } = {}) => {
  return executeRequest(
    requestDefinition,
    { page_size: page_size ?? 100, start_cursor: start_cursor ?? '' },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_list_users',
      description: 'List all users in the Notion workspace. Supports pagination with page_size (max 100) and start_cursor.',
      parameters: {
        type: 'object',
        properties: {
          page_size: { type: 'number', description: 'Number of results to return (default 100, max 100)' },
          start_cursor: { type: 'string', description: 'Cursor for pagination from previous response next_cursor' },
        },
        required: [],
      },
    },
  },
};
