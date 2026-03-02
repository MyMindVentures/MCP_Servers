/**
 * Get a task by ID. GET /api/v2/task/{task_id}
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get task',
  request: {
    method: 'GET',
    url: {
      raw: '{{CLICKUP_BASE_URL}}/task/:task_id?include_subtasks={{include_subtasks}}',
      host: ['{{CLICKUP_BASE_URL}}'],
      path: ['task', ':task_id'],
      query: [{ key: 'include_subtasks', value: '{{include_subtasks}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ task_id, include_subtasks } = {}) => {
  return executeRequest(
    requestDefinition,
    { task_id, include_subtasks: include_subtasks ?? false },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_task',
      description: 'Get a ClickUp task by ID. Optionally include subtasks.',
      parameters: {
        type: 'object',
        properties: {
          task_id: { type: 'string', description: 'Task ID' },
          include_subtasks: { type: 'boolean', description: 'Include subtasks' },
        },
        required: ['task_id'],
      },
    },
  },
};
