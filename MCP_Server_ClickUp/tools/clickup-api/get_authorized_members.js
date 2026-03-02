/**
 * Get authorized members (users) in a team. GET /api/v2/team/{team_id}/member
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get authorized members',
  request: {
    method: 'GET',
    url: {
      raw: '{{CLICKUP_BASE_URL}}/team/:team_id/member?page={{page}}',
      host: ['{{CLICKUP_BASE_URL}}'],
      path: ['team', ':team_id', 'member'],
      query: [{ key: 'page', value: '{{page}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ team_id, page } = {}) => {
  return executeRequest(requestDefinition, { team_id, page: page ?? 0 }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_authorized_members',
      description: 'Get authorized members (users) in a ClickUp team. Supports pagination.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'Team ID' },
          page: { type: 'number', description: 'Page number (0-based)' },
        },
        required: ['team_id'],
      },
    },
  },
};
