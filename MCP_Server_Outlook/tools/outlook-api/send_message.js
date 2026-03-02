/**
 * Send a message. POST /me/messages/:id/send
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Send message',
  request: {
    method: 'POST',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/messages/:message_id/send',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'messages', ':message_id', 'send'],
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
      name: 'outlook_send_message',
      description: 'Send an existing draft message by ID.',
      parameters: {
        type: 'object',
        properties: {
          message_id: { type: 'string', description: 'The draft message ID' },
        },
        required: ['message_id'],
      },
    },
  },
};
