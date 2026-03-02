/**
 * Get file details. GET /v1/vaults/:vault_id/items/:item_id/files/:file_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get file',
  request: {
    method: 'GET',
    url: {
      raw: '{{ONEPASSWORD_CONNECT_HOST}}/vaults/:vault_id/items/:item_id/files/:file_id?inline_content={{inline_content}}',
      host: ['{{ONEPASSWORD_CONNECT_HOST}}'],
      path: ['vaults', ':vault_id', 'items', ':item_id', 'files', ':file_id'],
      query: [{ key: 'inline_content', value: '{{inline_content}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer {{ONEPASSWORD_CONNECT_TOKEN}}' },
    ],
    body: null,
  },
};

const executeFunction = async ({ vault_id, item_id, file_id, inline_content } = {}) => {
  return executeRequest(
    requestDefinition,
    { vault_id, item_id, file_id, inline_content: inline_content ?? false },
    []
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_get_file',
      description: 'Get 1Password file details by vault, item, and file UUID.',
      parameters: {
        type: 'object',
        properties: {
          vault_id: { type: 'string', description: 'Vault UUID' },
          item_id: { type: 'string', description: 'Item UUID' },
          file_id: { type: 'string', description: 'File UUID' },
          inline_content: { type: 'boolean', description: 'Return Base64 content' },
        },
        required: ['vault_id', 'item_id', 'file_id'],
      },
    },
  },
};
