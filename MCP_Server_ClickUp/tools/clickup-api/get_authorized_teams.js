/**
 * Get authorized teams (workspaces). GET /api/v2/team
 * Requires CLICKUP_API_TOKEN. Auth: Authorization header.
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get authorized teams',
  request: {
    method: 'GET',
    url: { raw: '{{CLICKUP_BASE_URL}}/team', host: ['{{CLICKUP_BASE_URL}}'], path: ['team'] },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [
  { key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' },
];

const executeFunction = async () => {
  return executeRequest(requestDefinition, {}, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_authorized_teams',
      description: 'Get teams (workspaces) the authenticated user has access to.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
