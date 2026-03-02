/**
 * Retrieve a database by ID. GET /v1/databases/:database_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Retrieve database',
  request: {
    method: 'GET',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/databases/:database_id',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'databases', ':database_id'],
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

const executeFunction = async ({ database_id }) => {
  return executeRequest(requestDefinition, { database_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_retrieve_database',
      description: 'Retrieve a Notion database by its ID. Returns title, description, and property schema.',
      parameters: {
        type: 'object',
        properties: {
          database_id: { type: 'string', description: 'The database UUID' },
        },
        required: ['database_id'],
      },
    },
  },
};
