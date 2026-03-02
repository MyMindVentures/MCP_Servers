/**
 * Get lists in a folder. GET /api/v2/folder/{folder_id}/list
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get lists',
  request: {
    method: 'GET',
    url: {
      raw: '{{CLICKUP_BASE_URL}}/folder/:folder_id/list?archived={{archived}}',
      host: ['{{CLICKUP_BASE_URL}}'],
      path: ['folder', ':folder_id', 'list'],
      query: [{ key: 'archived', value: '{{archived}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ folder_id, archived } = {}) => {
  return executeRequest(
    requestDefinition,
    { folder_id, archived: archived === undefined ? false : archived },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_lists',
      description: 'Get lists in a ClickUp folder. Optionally include archived lists.',
      parameters: {
        type: 'object',
        properties: {
          folder_id: { type: 'string', description: 'Folder ID' },
          archived: { type: 'boolean', description: 'Include archived lists' },
        },
        required: ['folder_id'],
      },
    },
  },
};
