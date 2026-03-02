/**
 * Lists all webhooks for a base. GET /v0/bases/:baseId/webhooks.
 * Requires personal_access_token (Webhooks API).
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List webhooks',
  request: {
    method: 'GET',
    url: {
      raw: '{{pan_mcp_base_url}}/v0/bases/:baseId/webhooks',
      host: ['{{pan_mcp_base_url}}'],
      path: ['v0', 'bases', ':baseId', 'webhooks'],
      variable: [{ key: 'baseId', value: '<string>', description: 'Base ID' }],
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

const executeFunction = async ({ baseId }) => {
  return executeRequest(requestDefinition, { baseId }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_webhooks',
      description:
        'Lists all webhooks for a base. Use this to find webhook IDs and check notification URLs. Requires personal_access_token (Webhooks API).',
      parameters: {
        type: 'object',
        properties: {
          baseId: { type: 'string', description: 'The base ID' },
        },
        required: ['baseId'],
      },
    },
  },
};
