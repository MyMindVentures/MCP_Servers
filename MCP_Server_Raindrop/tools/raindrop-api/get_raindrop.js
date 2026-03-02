/**
 * Get a single raindrop. GET /rest/v1/raindrop/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get raindrop',
  request: {
    method: 'GET',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/raindrop/:raindrop_id',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['raindrop', ':raindrop_id'],
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

const executeFunction = async ({ raindrop_id }) => {
  return executeRequest(requestDefinition, { raindrop_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'raindrop_get_raindrop',
      description: 'Get a single Raindrop (bookmark) by ID.',
      parameters: {
        type: 'object',
        properties: {
          raindrop_id: { type: 'number', description: 'Raindrop ID' },
        },
        required: ['raindrop_id'],
      },
    },
  },
};
