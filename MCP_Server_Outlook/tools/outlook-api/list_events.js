/**
 * List calendar events. GET /me/calendar/events or /me/calendars/{id}/events
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List events',
  request: {
    method: 'GET',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/calendars/:calendar_id/events?$top={{top}}&$skip={{skip}}',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'calendars', ':calendar_id', 'events'],
      query: [
        { key: '$top', value: '{{top}}' },
        { key: '$skip', value: '{{skip}}' },
      ],
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

const executeFunction = async ({ calendar_id, top, skip } = {}) => {
  return executeRequest(
    requestDefinition,
    { calendar_id: calendar_id || 'primary', top: top ?? 50, skip: skip ?? 0 },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_list_events',
      description: 'List events in a calendar. Use calendar_id "primary" for default calendar.',
      parameters: {
        type: 'object',
        properties: {
          calendar_id: { type: 'string', description: 'Calendar ID or "primary"' },
          top: { type: 'number', description: 'Page size' },
          skip: { type: 'number', description: 'Skip for pagination' },
        },
        required: [],
      },
    },
  },
};
