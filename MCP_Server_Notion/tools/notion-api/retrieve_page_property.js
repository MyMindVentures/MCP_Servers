/**
 * Retrieve a page property item. GET /v1/pages/:page_id/properties/:property_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Retrieve page property',
  request: {
    method: 'GET',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/pages/:page_id/properties/:property_id',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'pages', ':page_id', 'properties', ':property_id'],
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

const executeFunction = async ({ page_id, property_id }) => {
  return executeRequest(requestDefinition, { page_id, property_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_retrieve_page_property',
      description: 'Retrieve a single property value of a Notion page by property ID.',
      parameters: {
        type: 'object',
        properties: {
          page_id: { type: 'string', description: 'The page UUID' },
          property_id: { type: 'string', description: 'The property ID (column ID in database view)' },
        },
        required: ['page_id', 'property_id'],
      },
    },
  },
};
