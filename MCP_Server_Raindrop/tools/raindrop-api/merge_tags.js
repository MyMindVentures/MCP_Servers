/**
 * Merge tags. PUT /rest/v1/tags/:collectionId with replace + tags
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Merge tags',
  request: {
    method: 'PUT',
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
      name: 'raindrop_merge_tags',
      description: 'Merge multiple tags into one. Body: replace (new name), tags (array of tag names to merge).',
      parameters: {
        type: 'object',
        properties: {
          collection_id: { type: 'number', description: 'Optional collection ID (0 = all)' },
          body: { type: 'object', description: 'JSON: replace (string), tags (array of names)' },
        },
        required: ['body'],
      },
    },
  },
};
