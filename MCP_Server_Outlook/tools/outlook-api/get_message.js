/**
 * Get a message by ID. GET /me/messages/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get message',
  request: {
    method: 'GET',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/messages/:message_id',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'messages', ':message_id'],
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

const executeFunction = async ({ message_id }) => {
  return executeRequest(requestDefinition, { message_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_get_message',
      description: 'Get a single message by ID.',
      parameters: {
        type: 'object',
        properties: {
          message_id: { type: 'string', description: 'The message ID' },
        },
        required: ['message_id'],
      },
    },
  },
};
