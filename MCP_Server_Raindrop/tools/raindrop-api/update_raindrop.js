/**
 * Update a raindrop. PUT /rest/v1/raindrop/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update raindrop',
  request: {
    method: 'PUT',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/raindrop/:raindrop_id',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['raindrop', ':raindrop_id'],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Content-Type', value: 'application/json' },
    ],
    body: { mode: 'raw', raw: '{{body}}' },
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{RAINDROP_ACCESS_TOKEN}}', type: 'string' }],
    },
  },
};

const collectionVariables = [
  { key: 'RAINDROP_BASE_URL', value: 'https://api.raindrop.io/rest/v1' },
];

const executeFunction = async ({ raindrop_id, body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { raindrop_id, body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'raindrop_update_raindrop',
      description: 'Update a Raindrop by ID. Body: title, excerpt, tags, link, etc.',
      parameters: {
        type: 'object',
        properties: {
          raindrop_id: { type: 'number', description: 'Raindrop ID' },
          body: { type: 'object', description: 'JSON fields to update' },
        },
        required: ['raindrop_id', 'body'],
      },
    },
  },
};
