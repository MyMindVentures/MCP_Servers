/**
 * Update a task. PUT /api/v2/task/{task_id}
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update task',
  request: {
    method: 'PUT',
    url: { raw: '{{CLICKUP_BASE_URL}}/task/:task_id', host: ['{{CLICKUP_BASE_URL}}'], path: ['task', ':task_id'] },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: {
      mode: 'raw',
      raw: '{{body_json}}',
    },
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({
  task_id,
  name,
  description,
  status_id,
  priority,
  due_date,
  assignees,
  tags,
  custom_fields,
} = {}) => {
  const body = {};
  if (name != null) body.name = name;
  if (description != null) body.description = description;
  if (status_id != null) body.status_id = status_id;
  if (priority != null) body.priority = priority;
  if (due_date != null) body.due_date = due_date;
  if (assignees != null) body.assignees = Array.isArray(assignees) ? assignees : [assignees];
  if (tags != null) body.tags = Array.isArray(tags) ? tags : [tags];
  if (custom_fields != null) body.custom_fields = custom_fields;
  const body_json = Object.keys(body).length ? JSON.stringify(body) : '{}';
  return executeRequest(requestDefinition, { task_id, body_json }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_update_task',
      description: 'Update an existing ClickUp task.',
      parameters: {
        type: 'object',
        properties: {
          task_id: { type: 'string', description: 'Task ID' },
          name: { type: 'string', description: 'Task name' },
          description: { type: 'string', description: 'Task description' },
          status_id: { type: 'string', description: 'Status ID' },
          priority: { type: 'number', description: 'Priority (1-4)' },
          due_date: { type: 'string', description: 'Due date (Unix ms)' },
          assignees: { type: 'array', items: { type: 'number' }, description: 'Assignee user IDs' },
          tags: { type: 'array', items: { type: 'string' }, description: 'Tag names' },
          custom_fields: { type: 'array', description: 'Custom field values' },
        },
        required: ['task_id'],
      },
    },
  },
};
