/**
 * Get a team by ID. GET /api/v2/team/{team_id}
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get team',
  request: {
    method: 'GET',
    url: { raw: '{{CLICKUP_BASE_URL}}/team/:team_id', host: ['{{CLICKUP_BASE_URL}}'], path: ['team', ':team_id'] },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ team_id }) => {
  return executeRequest(requestDefinition, { team_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_team',
      description: 'Get a ClickUp team (workspace) by ID.',
      parameters: {
        type: 'object',
        properties: { team_id: { type: 'string', description: 'Team ID' } },
        required: ['team_id'],
      },
    },
  },
};
