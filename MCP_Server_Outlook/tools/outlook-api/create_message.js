/**
 * Create a draft message. POST /me/messages
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create message',
  request: {
    method: 'POST',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/messages',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'messages'],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Content-Type', value: 'application/json' },
    ],
    body: { mode: 'raw', raw: '{{body}}' },
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{MICROSOFT_ACCESS_TOKEN}}', type: 'string' }],
    },
  },
};

const collectionVariables = [
  { key: 'GRAPH_BASE_URL', value: 'https://graph.microsoft.com/v1.0' },
];

const executeFunction = async ({ body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_create_message',
      description: 'Create a draft message. Body: subject, body (contentType, content), toRecipients, etc.',
      parameters: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            description: 'JSON: subject, body { contentType, content }, toRecipients [{ emailAddress: { address } }]',
          },
        },
        required: ['body'],
      },
    },
  },
};
