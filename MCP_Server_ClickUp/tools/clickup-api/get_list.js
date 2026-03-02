/**
 * Get a list by ID. GET /api/v2/list/{list_id}
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get list',
  request: {
    method: 'GET',
    url: { raw: '{{CLICKUP_BASE_URL}}/list/:list_id', host: ['{{CLICKUP_BASE_URL}}'], path: ['list', ':list_id'] },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ list_id }) => {
  return executeRequest(requestDefinition, { list_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_list',
      description: 'Get a ClickUp list by ID.',
      parameters: {
        type: 'object',
        properties: { list_id: { type: 'string', description: 'List ID' } },
        required: ['list_id'],
      },
    },
  },
};
