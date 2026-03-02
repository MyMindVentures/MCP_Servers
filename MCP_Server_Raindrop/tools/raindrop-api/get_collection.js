/**
 * Get a collection by ID. GET /rest/v1/collection/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get collection',
  request: {
    method: 'GET',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/collection/:collection_id',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['collection', ':collection_id'],
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

const executeFunction = async ({ collection_id }) => {
  return executeRequest(requestDefinition, { collection_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'raindrop_get_collection',
      description: 'Get a Raindrop collection by ID.',
      parameters: {
        type: 'object',
        properties: {
          collection_id: { type: 'number', description: 'Collection ID' },
        },
        required: ['collection_id'],
      },
    },
  },
};
