/**
 * List backups. GET /rest/v1/backups
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get backups',
  request: {
    method: 'GET',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/backups',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['backups'],
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

const executeFunction = async () => {
  return executeRequest(requestDefinition, {}, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'raindrop_get_backups',
      description: 'List all Raindrop backups (IDs and dates). Use backup ID with download endpoint for HTML/CSV.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
