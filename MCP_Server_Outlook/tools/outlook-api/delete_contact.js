/**
 * Delete a contact. DELETE /me/contacts/:id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Delete contact',
  request: {
    method: 'DELETE',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/contacts/:contact_id',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'contacts', ':contact_id'],
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

const executeFunction = async ({ contact_id }) => {
  return executeRequest(requestDefinition, { contact_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_delete_contact',
      description: 'Delete a contact by ID.',
      parameters: {
        type: 'object',
        properties: {
          contact_id: { type: 'string', description: 'The contact ID' },
        },
        required: ['contact_id'],
      },
    },
  },
};
