/**
 * Retrieve a user by ID. GET /v1/users/:user_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Retrieve user',
  request: {
    method: 'GET',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/users/:user_id',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'users', ':user_id'],
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

const executeFunction = async ({ user_id }) => {
  return executeRequest(requestDefinition, { user_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_retrieve_user',
      description: 'Retrieve a Notion user by their ID.',
      parameters: {
        type: 'object',
        properties: {
          user_id: { type: 'string', description: 'The user UUID (with or without dashes)' },
        },
        required: ['user_id'],
      },
    },
  },
};
