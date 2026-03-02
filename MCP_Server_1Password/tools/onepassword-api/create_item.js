/**
 * Add an item to a vault. POST /v1/vaults/:vault_id/items
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create item',
  request: {
    method: 'POST',
    url: {
      raw: '{{ONEPASSWORD_CONNECT_HOST}}/vaults/:vault_id/items',
      host: ['{{ONEPASSWORD_CONNECT_HOST}}'],
      path: ['vaults', ':vault_id', 'items'],
    },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer {{ONEPASSWORD_CONNECT_TOKEN}}' },
    ],
    body: { mode: 'raw', raw: '{{body_json}}' },
  },
};

const executeFunction = async ({ vault_id, body_json }) => {
  return executeRequest(requestDefinition, { vault_id, body_json }, []);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_create_item',
      description: 'Add an item to a 1Password vault. Body must be a FullItem (title, vault.id, category, optional urls, tags, fields, sections).',
      parameters: {
        type: 'object',
        properties: {
          vault_id: { type: 'string', description: 'Vault UUID' },
          body_json: { type: 'string', description: 'JSON FullItem object' },
        },
        required: ['vault_id', 'body_json'],
      },
    },
  },
};
