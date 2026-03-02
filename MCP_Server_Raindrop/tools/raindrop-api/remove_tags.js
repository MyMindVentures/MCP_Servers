/**
 * Remove tag(s). DELETE /rest/v1/tags/:collectionId
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Remove tags',
  request: {
    method: 'DELETE',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/tags/:collection_id',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['tags', ':collection_id'],
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
  return executeRequest(requestDefinition, { collection_id: collection_id ?? 0, body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'raindrop_remove_tags',
      description: 'Remove one or more tags. Body: tags (array of tag names).',
      parameters: {
        type: 'object',
        properties: {
          collection_id: { type: 'number', description: 'Optional collection ID (0 = all)' },
          body: { type: 'object', description: 'JSON: tags (array of names)' },
        },
        required: ['body'],
      },
    },
  },
};
