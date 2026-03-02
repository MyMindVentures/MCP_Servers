/**
 * Update item (JSON Patch). PATCH /v1/vaults/:vault_id/items/:item_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update item',
  request: {
    method: 'PATCH',
    url: {
      raw: '{{ONEPASSWORD_CONNECT_HOST}}/vaults/:vault_id/items/:item_id',
      host: ['{{ONEPASSWORD_CONNECT_HOST}}'],
      path: ['vaults', ':vault_id', 'items', ':item_id'],
    },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer {{ONEPASSWORD_CONNECT_TOKEN}}' },
    ],
    body: { mode: 'raw', raw: '{{body_json}}' },
  },
};

const executeFunction = async ({ vault_id, item_id, body_json }) => {
  return executeRequest(requestDefinition, { vault_id, item_id, body_json }, []);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_update_item',
      description: 'Update a 1Password item with RFC6902 JSON Patch (add, remove, replace operations).',
      parameters: {
        type: 'object',
        properties: {
          vault_id: { type: 'string', description: 'Vault UUID' },
          item_id: { type: 'string', description: 'Item UUID' },
          body_json: { type: 'string', description: 'JSON Patch array' },
        },
        required: ['vault_id', 'item_id', 'body_json'],
      },
    },
  },
};
