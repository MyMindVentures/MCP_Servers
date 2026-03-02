/**
 * Delete a calendar event. DELETE /me/events/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Delete event',
  request: {
    method: 'DELETE',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/events/:event_id',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'events', ':event_id'],
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

const executeFunction = async ({ event_id }) => {
  return executeRequest(requestDefinition, { event_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_delete_event',
      description: 'Delete a calendar event by ID.',
      parameters: {
        type: 'object',
        properties: {
          event_id: { type: 'string', description: 'The event ID' },
        },
        required: ['event_id'],
      },
    },
  },
};
