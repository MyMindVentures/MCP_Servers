/**
 * Update a collection. PUT /rest/v1/collection/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update collection',
  request: {
    method: 'PUT',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/collection/:collection_id',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['collection', ':collection_id'],
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

const executeFunction = async ({ collection_id, body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { collection_id, body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'raindrop_update_collection',
      description: 'Update a Raindrop collection. Body: title, view, sort, public, expanded, parent.$id, cover.',
      parameters: {
        type: 'object',
        properties: {
          collection_id: { type: 'number', description: 'Collection ID' },
          body: { type: 'object', description: 'JSON fields to update' },
        },
        required: ['collection_id', 'body'],
      },
    },
  },
};
