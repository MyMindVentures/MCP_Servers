/**
 * Get a generation by ID. GET /v1.0/generations/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get generation',
  request: {
    method: 'GET',
    url: { raw: '{{GAMMA_BASE_URL}}/generations/:id', host: ['{{GAMMA_BASE_URL}}'], path: ['generations', ':id'] },
    header: [{ key: 'X-API-KEY', value: '{{GAMMA_API_KEY}}' }],
    body: null,
  },
};

const collectionVariables = [
  { key: 'GAMMA_BASE_URL', value: 'https://public-api.gamma.app/v1.0' },
];

const executeFunction = async ({ id }) => {
  return executeRequest(requestDefinition, { id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'gamma_get_generation',
      description: 'Get a Gamma generation by ID (status and result).',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string', description: 'Generation ID' } },
        required: ['id'],
      },
    },
  },
};
