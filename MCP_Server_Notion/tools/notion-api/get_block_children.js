/**
 * Retrieve block children. GET /v1/blocks/:block_id/children
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get block children',
  request: {
    method: 'GET',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/blocks/:block_id/children?page_size={{page_size}}&start_cursor={{start_cursor}}',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'blocks', ':block_id', 'children'],
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

const executeFunction = async ({ block_id, page_size, start_cursor } = {}) => {
  return executeRequest(
    requestDefinition,
    { block_id, page_size: page_size ?? 100, start_cursor: start_cursor ?? '' },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_get_block_children',
      description: 'Retrieve the child blocks of a block (or page). Supports pagination.',
      parameters: {
        type: 'object',
        properties: {
          block_id: { type: 'string', description: 'The block or page UUID' },
          page_size: { type: 'number', description: 'Number of results (default 100)' },
          start_cursor: { type: 'string', description: 'Pagination cursor' },
        },
        required: ['block_id'],
      },
    },
  },
};
