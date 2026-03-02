/**
 * Get folders in a space. GET /api/v2/space/{space_id}/folder
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get folders',
  request: {
    method: 'GET',
    url: {
      raw: '{{CLICKUP_BASE_URL}}/space/:space_id/folder?archived={{archived}}',
      host: ['{{CLICKUP_BASE_URL}}'],
      path: ['space', ':space_id', 'folder'],
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

const executeFunction = async ({ space_id, archived } = {}) => {
  return executeRequest(
    requestDefinition,
    { space_id, archived: archived === undefined ? false : archived },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_get_folders',
      description: 'Get folders in a ClickUp space. Optionally include archived folders.',
      parameters: {
        type: 'object',
        properties: {
          space_id: { type: 'string', description: 'Space ID' },
          archived: { type: 'boolean', description: 'Include archived folders' },
        },
        required: ['space_id'],
      },
    },
  },
};
