/**
 * Get file content. GET /v1/vaults/:vault_id/items/:item_id/files/:file_id/content
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get file content',
  request: {
    method: 'GET',
    url: {
      raw: '{{ONEPASSWORD_CONNECT_HOST}}/vaults/:vault_id/items/:item_id/files/:file_id/content',
      host: ['{{ONEPASSWORD_CONNECT_HOST}}'],
      path: ['vaults', ':vault_id', 'items', ':item_id', 'files', ':file_id', 'content'],
    },
    header: [
      { key: 'Authorization', value: 'Bearer {{ONEPASSWORD_CONNECT_TOKEN}}' },
    ],
    body: null,
  },
};

const executeFunction = async ({ vault_id, item_id, file_id }) => {
  return executeRequest(requestDefinition, { vault_id, item_id, file_id }, []);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_get_file_content',
      description: 'Get raw content of a 1Password file.',
      parameters: {
        type: 'object',
        properties: {
          vault_id: { type: 'string', description: 'Vault UUID' },
          item_id: { type: 'string', description: 'Item UUID' },
          file_id: { type: 'string', description: 'File UUID' },
        },
        required: ['vault_id', 'item_id', 'file_id'],
      },
    },
  },
};
