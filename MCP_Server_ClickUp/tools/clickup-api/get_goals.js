/**
 * Get goals for a team. GET /api/v2/team/{team_id}/goal
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get goals',
  request: {
    method: 'GET',
    url: {
      raw: '{{CLICKUP_BASE_URL}}/team/:team_id/goal?include_completed={{include_completed}}',
      host: ['{{CLICKUP_BASE_URL}}'],
      path: ['team', ':team_id', 'goal'],
      query: [{ key: 'include_completed', value: '{{include_completed}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ team_id, include_completed } = {}) => {
  return executeRequest(
    requestDefinition,
    { team_id, include_completed: include_completed ?? false },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_goals',
      description: 'Get goals for a ClickUp team. Optionally include completed goals.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'Team ID' },
          include_completed: { type: 'boolean', description: 'Include completed goals' },
        },
        required: ['team_id'],
      },
    },
  },
};
