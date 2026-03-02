/**
 * Create a new page. POST /v1/pages
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create page',
  request: {
    method: 'POST',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/pages',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'pages'],
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

const executeFunction = async ({ body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_create_page',
      description: 'Create a new Notion page. Body must include parent (page_id or database_id) and optionally properties, icon, cover, children.',
      parameters: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            description: 'JSON body: parent (object with page_id or database_id), properties, optional icon, cover, children',
          },
        },
        required: ['body'],
      },
    },
  },
};
