/**
 * List root collections. GET /rest/v1/collections
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List collections',
  request: {
    method: 'GET',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/collections',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['collections'],
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
      name: 'raindrop_list_collections',
      description: 'List all root Raindrop collections for the authenticated user.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
