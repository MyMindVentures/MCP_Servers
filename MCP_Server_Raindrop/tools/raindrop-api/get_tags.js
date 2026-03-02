/**
 * Get tags. GET /rest/v1/tags/:collectionId (0 = all)
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get tags',
  request: {
    method: 'GET',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/tags/:collection_id',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['tags', ':collection_id'],
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

const executeFunction = async ({ collection_id } = {}) => {
  return executeRequest(
    requestDefinition,
    { collection_id: collection_id ?? 0 },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'raindrop_get_tags',
      description: 'Get all tags. Optional collection_id to restrict to one collection (0 = all).',
      parameters: {
        type: 'object',
        properties: {
          collection_id: { type: 'number', description: 'Collection ID (0 = all tags)' },
        },
        required: [],
      },
    },
  },
};
