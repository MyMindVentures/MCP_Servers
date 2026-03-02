/**
 * Create a collection. POST /rest/v1/collection
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create collection',
  request: {
    method: 'POST',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/collection',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['collection'],
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

const executeFunction = async ({ body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'raindrop_create_collection',
      description: 'Create a Raindrop collection. Body: title, optional view, sort, public, parent.$id, cover.',
      parameters: {
        type: 'object',
        properties: {
          body: { type: 'object', description: 'JSON: title (required), view, sort, public, parent.$id, cover' },
        },
        required: ['body'],
      },
    },
  },
};
