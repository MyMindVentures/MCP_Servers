/**
 * List themes. GET /v1.0/themes
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List themes',
  request: {
    method: 'GET',
    url: {
      raw: '{{GAMMA_BASE_URL}}/themes?limit={{limit}}&after={{after}}&query={{query}}',
      host: ['{{GAMMA_BASE_URL}}'],
      path: ['themes'],
      query: [
        { key: 'limit', value: '{{limit}}' },
        { key: 'after', value: '{{after}}' },
        { key: 'query', value: '{{query}}' },
      ],
    },
    header: [{ key: 'X-API-KEY', value: '{{GAMMA_API_KEY}}' }],
    body: null,
  },
};

const collectionVariables = [
  { key: 'GAMMA_BASE_URL', value: 'https://public-api.gamma.app/v1.0' },
];

const executeFunction = async ({ limit, after, query } = {}) => {
  return executeRequest(
    requestDefinition,
    { limit: limit ?? 50, after: after ?? '', query: query ?? '' },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'gamma_list_themes',
      description: 'List available Gamma themes. Supports pagination (limit, after) and query.',
      parameters: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Max results (default 50)' },
          after: { type: 'string', description: 'Cursor for pagination' },
          query: { type: 'string', description: 'Search by name' },
        },
        required: [],
      },
    },
  },
};
