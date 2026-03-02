/**
 * List files in an item. GET /v1/vaults/:vault_id/items/:item_id/files
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List files',
  request: {
    method: 'GET',
    url: {
      raw: '{{ONEPASSWORD_CONNECT_HOST}}/vaults/:vault_id/items/:item_id/files?inline_content={{inline_content}}',
      host: ['{{ONEPASSWORD_CONNECT_HOST}}'],
      path: ['vaults', ':vault_id', 'items', ':item_id', 'files'],
      query: [{ key: 'inline_content', value: '{{inline_content}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer {{ONEPASSWORD_CONNECT_TOKEN}}' },
    ],
    body: null,
  },
};

const executeFunction = async ({ vault_id, item_id, inline_content } = {}) => {
  return executeRequest(
    requestDefinition,
    { vault_id, item_id, inline_content: inline_content ?? false },
    []
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_list_files',
      description: 'List files in a 1Password item. Optionally include inline Base64 content (small files).',
      parameters: {
        type: 'object',
        properties: {
          vault_id: { type: 'string', description: 'Vault UUID' },
          item_id: { type: 'string', description: 'Item UUID' },
          inline_content: { type: 'boolean', description: 'Return Base64 file content' },
        },
        required: ['vault_id', 'item_id'],
      },
    },
  },
};
