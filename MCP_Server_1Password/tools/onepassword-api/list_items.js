/**
 * List items in a vault. GET /v1/vaults/:vault_id/items
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List items',
  request: {
    method: 'GET',
    url: {
      raw: '{{ONEPASSWORD_CONNECT_HOST}}/vaults/:vault_id/items?filter={{filter}}',
      host: ['{{ONEPASSWORD_CONNECT_HOST}}'],
      path: ['vaults', ':vault_id', 'items'],
      query: [{ key: 'filter', value: '{{filter}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer {{ONEPASSWORD_CONNECT_TOKEN}}' },
    ],
    body: null,
  },
};

const executeFunction = async ({ vault_id, filter } = {}) => {
  return executeRequest(requestDefinition, { vault_id, filter: filter ?? '' }, []);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_list_items',
      description: 'List items in a 1Password vault. Optional SCIM filter by title or tag.',
      parameters: {
        type: 'object',
        properties: {
          vault_id: { type: 'string', description: 'Vault UUID' },
          filter: { type: 'string', description: 'e.g. title eq "Example" or tag eq "banking"' },
        },
        required: ['vault_id'],
      },
    },
  },
};
