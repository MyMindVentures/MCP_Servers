/**
 * Get a goal by ID. GET /api/v2/goal/{goal_id}
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get goal',
  request: {
    method: 'GET',
    url: { raw: '{{CLICKUP_BASE_URL}}/goal/:goal_id', host: ['{{CLICKUP_BASE_URL}}'], path: ['goal', ':goal_id'] },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ goal_id }) => {
  return executeRequest(requestDefinition, { goal_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_goal',
      description: 'Get a ClickUp goal by ID.',
      parameters: {
        type: 'object',
        properties: { goal_id: { type: 'string', description: 'Goal ID' } },
        required: ['goal_id'],
      },
    },
  },
};
