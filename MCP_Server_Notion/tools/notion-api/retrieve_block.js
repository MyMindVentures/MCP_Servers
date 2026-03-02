/**
 * Retrieve a block by ID. GET /v1/blocks/:block_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Retrieve block',
  request: {
    method: 'GET',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/blocks/:block_id',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'blocks', ':block_id'],
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

const executeFunction = async ({ block_id }) => {
  return executeRequest(requestDefinition, { block_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_retrieve_block',
      description: 'Retrieve a Notion block by its ID.',
      parameters: {
        type: 'object',
        properties: {
          block_id: { type: 'string', description: 'The block UUID' },
        },
        required: ['block_id'],
      },
    },
  },
};
