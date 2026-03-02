/**
 * Append block children. PATCH /v1/blocks/:block_id/children
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Append block children',
  request: {
    method: 'PATCH',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/blocks/:block_id/children',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'blocks', ':block_id', 'children'],
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
      name: 'notion_append_block_children',
      description: 'Append new child blocks to a block or page. Body must include children array of block objects.',
      parameters: {
        type: 'object',
        properties: {
          block_id: { type: 'string', description: 'The parent block or page UUID' },
          body: {
            type: 'object',
            description: 'JSON object with children array of block objects (paragraph, heading_1, etc.)',
          },
        },
        required: ['block_id', 'body'],
      },
    },
  },
};
