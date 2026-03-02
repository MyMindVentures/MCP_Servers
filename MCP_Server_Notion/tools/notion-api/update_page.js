/**
 * Update page properties. PATCH /v1/pages/:page_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update page',
  request: {
    method: 'PATCH',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/pages/:page_id',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'pages', ':page_id'],
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

const executeFunction = async ({ page_id, body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { page_id, body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_update_page',
      description: 'Update a Notion page. Pass a JSON object with properties, icon, cover, etc. See Notion API PATCH page.',
      parameters: {
        type: 'object',
        properties: {
          page_id: { type: 'string', description: 'The page UUID' },
          body: {
            type: 'object',
            description: 'JSON object with properties to update (e.g. properties, icon, cover, archived)',
          },
        },
        required: ['page_id', 'body'],
      },
    },
  },
};
