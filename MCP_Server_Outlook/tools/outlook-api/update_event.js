/**
 * Update a calendar event. PATCH /me/events/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update event',
  request: {
    method: 'PATCH',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/events/:event_id',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'events', ':event_id'],
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

const executeFunction = async ({ event_id, body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { event_id, body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_update_event',
      description: 'Update a calendar event by ID.',
      parameters: {
        type: 'object',
        properties: {
          event_id: { type: 'string', description: 'The event ID' },
          body: { type: 'object', description: 'JSON fields to update' },
        },
        required: ['event_id', 'body'],
      },
    },
  },
};
