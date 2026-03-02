/**
 * Delete a task. DELETE /api/v2/task/{task_id}
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Delete task',
  request: {
    method: 'DELETE',
    url: { raw: '{{CLICKUP_BASE_URL}}/task/:task_id', host: ['{{CLICKUP_BASE_URL}}'], path: ['task', ':task_id'] },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ task_id }) => {
  return executeRequest(requestDefinition, { task_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_delete_task',
      description: 'Delete a ClickUp task.',
      parameters: {
        type: 'object',
        properties: { task_id: { type: 'string', description: 'Task ID' } },
        required: ['task_id'],
      },
    },
  },
};
