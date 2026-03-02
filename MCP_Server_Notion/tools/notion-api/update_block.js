/**
 * Update a block. PATCH /v1/blocks/:block_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update block',
  request: {
    method: 'PATCH',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/blocks/:block_id',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'blocks', ':block_id'],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Notion-Version', value: '{{NOTION_VERSION}}' },
    ],
    body: {
      mode: 'raw',
      raw: '{{body}}',
    },
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

const executeFunction = async ({ block_id, body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { block_id, body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_update_block',
      description: 'Update a Notion block. Body contains the block type and new content.',
      parameters: {
        type: 'object',
        properties: {
          block_id: { type: 'string', description: 'The block UUID' },
          body: { type: 'object', description: 'JSON object with block type and content to update' },
        },
        required: ['block_id', 'body'],
      },
    },
  },
};
