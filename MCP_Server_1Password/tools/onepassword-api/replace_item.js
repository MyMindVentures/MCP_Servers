/**
 * Replace an item. PUT /v1/vaults/:vault_id/items/:item_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Replace item',
  request: {
    method: 'PUT',
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
      name: 'onepassword_replace_item',
      description: 'Replace a 1Password item with a full FullItem body.',
      parameters: {
        type: 'object',
        properties: {
          vault_id: { type: 'string', description: 'Vault UUID' },
          item_id: { type: 'string', description: 'Item UUID' },
          body_json: { type: 'string', description: 'JSON FullItem object' },
        },
        required: ['vault_id', 'item_id', 'body_json'],
      },
    },
  },
};
