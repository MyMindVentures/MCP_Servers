/**
 * Get authenticated user. GET /rest/v1/user
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get user',
  request: {
    method: 'GET',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/user',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['user'],
    },
    header: [{ key: 'Accept', value: 'application/json' }],
    body: null,
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{RAINDROP_ACCESS_TOKEN}}', type: 'string' }],
    },
  },
};

const collectionVariables = [
  { key: 'RAINDROP_BASE_URL', value: 'https://api.raindrop.io/rest/v1' },
];

const executeFunction = async () => {
  return executeRequest(requestDefinition, {}, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'raindrop_get_user',
      description: 'Get the authenticated Raindrop user profile.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
