/**
 * Create a raindrop. POST /rest/v1/raindrop
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create raindrop',
  request: {
    method: 'POST',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/raindrop',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['raindrop'],
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
      name: 'raindrop_create_raindrop',
      description: 'Create a Raindrop (bookmark). Body: link (required), collection.$id, title, excerpt, tags, type, etc.',
      parameters: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            description: 'JSON: link, collection.$id, title, excerpt, tags, type (link|article|image|video|document|audio)',
          },
        },
        required: ['body'],
      },
    },
  },
};
