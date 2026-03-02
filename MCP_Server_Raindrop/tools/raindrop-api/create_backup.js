/**
 * Trigger new backup. GET /rest/v1/backup
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create backup',
  request: {
    method: 'GET',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/backup',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['backup'],
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
      name: 'raindrop_create_backup',
      description: 'Generate a new Raindrop backup. Email will be sent when ready. New backup appears in get_backups list.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
