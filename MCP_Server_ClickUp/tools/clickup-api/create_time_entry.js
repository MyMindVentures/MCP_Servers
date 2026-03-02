/**
 * Create a time entry. POST /api/v2/team/{team_id}/time_entries
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create time entry',
  request: {
    method: 'POST',
    url: { raw: '{{CLICKUP_BASE_URL}}/team/:team_id/time_entries', host: ['{{CLICKUP_BASE_URL}}'], path: ['team', ':team_id', 'time_entries'] },
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

const executeFunction = async ({ team_id, task_id, start, end, duration, description, tags } = {}) => {
  const body = {};
  if (task_id != null) body.task_id = task_id;
  if (start != null) body.start = start;
  if (end != null) body.end = end;
  if (duration != null) body.duration = duration;
  if (description != null) body.description = description;
  if (tags != null) body.tags = Array.isArray(tags) ? tags : [tags];
  const body_json = Object.keys(body).length ? JSON.stringify(body) : '{}';
  return executeRequest(requestDefinition, { team_id, body_json }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_create_time_entry',
      description: 'Create a time entry for a ClickUp team. Provide duration (ms) or start/end.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'Team ID' },
          task_id: { type: 'string', description: 'Task ID' },
          start: { type: 'number', description: 'Start time (Unix ms)' },
          end: { type: 'number', description: 'End time (Unix ms)' },
          duration: { type: 'number', description: 'Duration in milliseconds' },
          description: { type: 'string', description: 'Time entry description' },
          tags: { type: 'array', items: { type: 'string' }, description: 'Tag names' },
        },
        required: ['team_id'],
      },
    },
  },
};
