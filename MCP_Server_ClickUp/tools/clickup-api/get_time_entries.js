/**
 * Get time entries. GET /api/v2/team/{team_id}/time_entries
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get time entries',
  request: {
    method: 'GET',
    url: {
      raw: '{{CLICKUP_BASE_URL}}/team/:team_id/time_entries?start_date={{start_date}}&end_date={{end_date}}&assignee={{assignee}}&include_task_tags={{include_task_tags}}&include_location_names={{include_location_names}}',
      host: ['{{CLICKUP_BASE_URL}}'],
      path: ['team', ':team_id', 'time_entries'],
      query: [
        { key: 'start_date', value: '{{start_date}}' },
        { key: 'end_date', value: '{{end_date}}' },
        { key: 'assignee', value: '{{assignee}}' },
        { key: 'include_task_tags', value: '{{include_task_tags}}' },
        { key: 'include_location_names', value: '{{include_location_names}}' },
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
  team_id,
  start_date,
  end_date,
  assignee,
  include_task_tags,
  include_location_names,
} = {}) => {
  return executeRequest(
    requestDefinition,
    {
      team_id,
      start_date: start_date ?? '',
      end_date: end_date ?? '',
      assignee: assignee ?? '',
      include_task_tags: include_task_tags ?? false,
      include_location_names: include_location_names ?? false,
    },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_time_entries',
      description: 'Get time entries for a ClickUp team. Filter by date range and assignee.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'Team ID' },
          start_date: { type: 'string', description: 'Start date (Unix ms)' },
          end_date: { type: 'string', description: 'End date (Unix ms)' },
          assignee: { type: 'string', description: 'Filter by assignee user ID' },
          include_task_tags: { type: 'boolean', description: 'Include task tags' },
          include_location_names: { type: 'boolean', description: 'Include location names' },
        },
        required: ['team_id'],
      },
    },
  },
};
