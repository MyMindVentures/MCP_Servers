/**
 * Returns the current authenticated user ID and, for OAuth, the granted scopes.
 * GET /v0/meta/whoami. Requires personal_access_token.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Who am I',
  request: {
    method: 'GET',
    url: {
      raw: '{{pan_mcp_base_url}}/v0/meta/whoami',
      host: ['{{pan_mcp_base_url}}'],
      path: ['v0', 'meta', 'whoami'],
    },
    header: [{ key: 'Accept', value: 'application/json' }],
    body: null,
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{pan_mcp_personal_access_token}}', type: 'string' }],
    },
  },
};

const collectionVariables = [
  { key: 'baseUrl', value: 'https://api.airtable.com' },
  { key: 'PersonalAccessToken', value: '' },
];

const executeFunction = async () => {
  return executeRequest(requestDefinition, {}, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'meta_whoami',
      description:
        'Returns the current authenticated user (ID and, for OAuth, granted scopes). Use this to verify your token and see which scopes you have. Requires personal_access_token.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
};
