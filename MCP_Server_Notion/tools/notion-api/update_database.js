/**
 * Update a database. PATCH /v1/databases/:database_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update database',
  request: {
    method: 'PATCH',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/databases/:database_id',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'databases', ':database_id'],
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

const executeFunction = async ({ database_id, body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { database_id, body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_update_database',
      description: 'Update a Notion database (title, description, icon, cover, etc.).',
      parameters: {
        type: 'object',
        properties: {
          database_id: { type: 'string', description: 'The database UUID' },
          body: { type: 'object', description: 'JSON object with properties to update' },
        },
        required: ['database_id', 'body'],
      },
    },
  },
};
