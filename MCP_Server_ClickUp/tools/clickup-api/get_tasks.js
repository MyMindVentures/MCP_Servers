/**
 * Get tasks in a list. GET /api/v2/list/{list_id}/task
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get tasks',
  request: {
    method: 'GET',
    url: {
      raw: '{{CLICKUP_BASE_URL}}/list/:list_id/task?page={{page}}&order_by={{order_by}}&reverse={{reverse}}&subtasks={{subtasks}}&statuses={{statuses}}&include_closed={{include_closed}}',
      host: ['{{CLICKUP_BASE_URL}}'],
      path: ['list', ':list_id', 'task'],
      query: [
        { key: 'page', value: '{{page}}' },
        { key: 'order_by', value: '{{order_by}}' },
        { key: 'reverse', value: '{{reverse}}' },
        { key: 'subtasks', value: '{{subtasks}}' },
        { key: 'statuses', value: '{{statuses}}' },
        { key: 'include_closed', value: '{{include_closed}}' },
      ],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({
  list_id,
  page,
  order_by,
  reverse,
  subtasks,
  statuses,
  include_closed,
} = {}) => {
  return executeRequest(
    requestDefinition,
    {
      list_id,
      page: page ?? 0,
      order_by: order_by ?? '',
      reverse: reverse ?? false,
      subtasks: subtasks ?? false,
      statuses: statuses ?? '',
      include_closed: include_closed ?? false,
    },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_tasks',
      description: 'Get tasks in a ClickUp list. Supports pagination, ordering, and filters.',
      parameters: {
        type: 'object',
        properties: {
          list_id: { type: 'string', description: 'List ID' },
          page: { type: 'number', description: 'Page number (0-based)' },
          order_by: { type: 'string', description: 'Order by field (e.g. id, created, status)' },
          reverse: { type: 'boolean', description: 'Reverse order' },
          subtasks: { type: 'boolean', description: 'Include subtasks' },
          statuses: { type: 'string', description: 'Comma-separated status IDs' },
          include_closed: { type: 'boolean', description: 'Include closed tasks' },
        },
        required: ['list_id'],
      },
    },
  },
};
