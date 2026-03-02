/**
 * Get spaces in a team. GET /api/v2/team/{team_id}/space
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get spaces',
  request: {
    method: 'GET',
    url: {
      raw: '{{CLICKUP_BASE_URL}}/team/:team_id/space?archived={{archived}}',
      host: ['{{CLICKUP_BASE_URL}}'],
      path: ['team', ':team_id', 'space'],
      query: [{ key: 'archived', value: '{{archived}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ team_id, archived } = {}) => {
  return executeRequest(
    requestDefinition,
    { team_id, archived: archived === undefined ? false : archived },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_spaces',
      description: 'Get spaces in a ClickUp team. Optionally include archived spaces.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'Team ID' },
          archived: { type: 'boolean', description: 'Include archived spaces' },
        },
        required: ['team_id'],
      },
    },
  },
};
