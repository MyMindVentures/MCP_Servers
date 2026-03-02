/**
 * Create a calendar event. POST /me/events
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create event',
  request: {
    method: 'POST',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/events',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'events'],
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
      name: 'outlook_create_event',
      description: 'Create a calendar event. Body: subject, start { dateTime, timeZone }, end { dateTime, timeZone }, body, attendees, etc.',
      parameters: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            description: 'JSON: subject, start, end (dateTime + timeZone), body, attendees',
          },
        },
        required: ['body'],
      },
    },
  },
};
