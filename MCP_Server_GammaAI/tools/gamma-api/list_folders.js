/**
 * List folders. GET /v1.0/folders
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List folders',
  request: {
    method: 'GET',
    url: {
      raw: '{{GAMMA_BASE_URL}}/folders?limit={{limit}}&after={{after}}',
      host: ['{{GAMMA_BASE_URL}}'],
      path: ['folders'],
      query: [
        { key: 'limit', value: '{{limit}}' },
        { key: 'after', value: '{{after}}' },
      ],
    },
    header: [{ key: 'X-API-KEY', value: '{{GAMMA_API_KEY}}' }],
    body: null,
  },
};

const collectionVariables = [
  { key: 'GAMMA_BASE_URL', value: 'https://public-api.gamma.app/v1.0' },
];

const executeFunction = async ({ limit, after } = {}) => {
  return executeRequest(
    requestDefinition,
    { limit: limit ?? 50, after: after ?? '' },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'gamma_list_folders',
      description: 'List Gamma workspace folders. Supports pagination (limit, after).',
      parameters: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Max results (default 50)' },
          after: { type: 'string', description: 'Cursor for pagination' },
        },
        required: [],
      },
    },
  },
};
