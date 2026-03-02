/**
 * Delete a raindrop. DELETE /rest/v1/raindrop/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Delete raindrop',
  request: {
    method: 'DELETE',
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
      name: 'raindrop_delete_raindrop',
      description: 'Delete a Raindrop (bookmark) by ID.',
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
