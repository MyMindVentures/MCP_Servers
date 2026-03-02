/**
 * Retrieve a page by ID. GET /v1/pages/:page_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Retrieve page',
  request: {
    method: 'GET',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/pages/:page_id',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'pages', ':page_id'],
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

const executeFunction = async ({ page_id }) => {
  return executeRequest(requestDefinition, { page_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_retrieve_page',
      description: 'Retrieve a Notion page by its ID. Returns page properties and metadata.',
      parameters: {
        type: 'object',
        properties: {
          page_id: { type: 'string', description: 'The page UUID (with or without dashes)' },
        },
        required: ['page_id'],
      },
    },
  },
};
