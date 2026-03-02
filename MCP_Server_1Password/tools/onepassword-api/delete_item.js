/**
 * Delete an item. DELETE /v1/vaults/:vault_id/items/:item_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Delete item',
  request: {
    method: 'DELETE',
    url: {
      raw: '{{ONEPASSWORD_CONNECT_HOST}}/vaults/:vault_id/items/:item_id',
      host: ['{{ONEPASSWORD_CONNECT_HOST}}'],
      path: ['vaults', ':vault_id', 'items', ':item_id'],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer {{ONEPASSWORD_CONNECT_TOKEN}}' },
    ],
    body: null,
  },
};

const executeFunction = async ({ vault_id, item_id }) => {
  return executeRequest(requestDefinition, { vault_id, item_id }, []);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_delete_item',
      description: 'Delete a 1Password item.',
      parameters: {
        type: 'object',
        properties: {
          vault_id: { type: 'string', description: 'Vault UUID' },
          item_id: { type: 'string', description: 'Item UUID' },
        },
        required: ['vault_id', 'item_id'],
      },
    },
  },
};
