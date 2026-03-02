/**
 * Update a contact. PATCH /me/contacts/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update contact',
  request: {
    method: 'PATCH',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/contacts/:contact_id',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'contacts', ':contact_id'],
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

const executeFunction = async ({ contact_id, body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { contact_id, body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_update_contact',
      description: 'Update a contact by ID.',
      parameters: {
        type: 'object',
        properties: {
          contact_id: { type: 'string', description: 'The contact ID' },
          body: { type: 'object', description: 'JSON fields to update' },
        },
        required: ['contact_id', 'body'],
      },
    },
  },
};
