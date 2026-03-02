/**
 * List contacts. GET /me/contacts or /me/contactFolders/{id}/contacts
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List contacts',
  request: {
    method: 'GET',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/contacts?$top={{top}}&$skip={{skip}}',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'contacts'],
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

const executeFunction = async ({ top, skip } = {}) => {
  return executeRequest(
    requestDefinition,
    { top: top ?? 50, skip: skip ?? 0 },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_list_contacts',
      description: 'List the signed-in user\'s contacts from the default folder.',
      parameters: {
        type: 'object',
        properties: {
          top: { type: 'number', description: 'Page size' },
          skip: { type: 'number', description: 'Skip for pagination' },
        },
        required: [],
      },
    },
  },
};
