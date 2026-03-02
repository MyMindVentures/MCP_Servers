/**
 * List calendars. GET /me/calendars
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List calendars',
  request: {
    method: 'GET',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/calendars',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'calendars'],
    },
    header: [{ key: 'Accept', value: 'application/json' }],
    body: null,
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{MICROSOFT_ACCESS_TOKEN}}', type: 'string' }],
    },
  },
};

const collectionVariables = [
  { key: 'GRAPH_BASE_URL', value: 'https://graph.microsoft.com/v1.0' },
];

const executeFunction = async () => {
  return executeRequest(requestDefinition, {}, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_list_calendars',
      description: 'List the signed-in user\'s calendars.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
