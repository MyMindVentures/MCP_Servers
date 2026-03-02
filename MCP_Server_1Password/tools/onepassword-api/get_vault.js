/**
 * Get vault details. GET /v1/vaults/:vault_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get vault',
  request: {
    method: 'GET',
    url: { raw: '{{ONEPASSWORD_CONNECT_HOST}}/vaults/:vault_id', host: ['{{ONEPASSWORD_CONNECT_HOST}}'], path: ['vaults', ':vault_id'] },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer {{ONEPASSWORD_CONNECT_TOKEN}}' },
    ],
    body: null,
  },
};

const executeFunction = async ({ vault_id }) => {
  return executeRequest(requestDefinition, { vault_id }, []);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_get_vault',
      description: 'Get 1Password vault details by UUID.',
      parameters: {
        type: 'object',
        properties: { vault_id: { type: 'string', description: 'Vault UUID' } },
        required: ['vault_id'],
      },
    },
  },
};
