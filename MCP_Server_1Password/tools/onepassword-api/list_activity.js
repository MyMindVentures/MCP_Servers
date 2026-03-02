/**
 * List API activity. GET /v1/activity
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List activity',
  request: {
    method: 'GET',
    url: {
      raw: '{{ONEPASSWORD_CONNECT_HOST}}/activity?limit={{limit}}&offset={{offset}}',
      host: ['{{ONEPASSWORD_CONNECT_HOST}}'],
      path: ['activity'],
      query: [
        { key: 'limit', value: '{{limit}}' },
        { key: 'offset', value: '{{offset}}' },
      ],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer {{ONEPASSWORD_CONNECT_TOKEN}}' },
    ],
    body: null,
  },
};

const executeFunction = async ({ limit, offset } = {}) => {
  return executeRequest(
    requestDefinition,
    { limit: limit ?? 100, offset: offset ?? 0 },
    []
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_list_activity',
      description: 'List API activity (requests) on the Connect server.',
      parameters: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Max events to return' },
          offset: { type: 'number', description: 'Offset for pagination' },
        },
        required: [],
      },
    },
  },
};
