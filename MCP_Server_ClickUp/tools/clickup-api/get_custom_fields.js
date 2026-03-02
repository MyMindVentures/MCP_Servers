/**
 * Get custom fields for a list. GET /api/v2/list/{list_id}/field
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get custom fields',
  request: {
    method: 'GET',
    url: { raw: '{{CLICKUP_BASE_URL}}/list/:list_id/field', host: ['{{CLICKUP_BASE_URL}}'], path: ['list', ':list_id', 'field'] },
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
      name: 'clickup_get_custom_fields',
      description: 'Get custom fields for a ClickUp list.',
      parameters: {
        type: 'object',
        properties: { list_id: { type: 'string', description: 'List ID' } },
        required: ['list_id'],
      },
    },
  },
};
