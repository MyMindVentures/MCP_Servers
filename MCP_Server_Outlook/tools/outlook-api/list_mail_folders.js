/**
 * List mail folders. GET /me/mailFolders
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List mail folders',
  request: {
    method: 'GET',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/mailFolders',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'mailFolders'],
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

const executeFunction = async () => {
  return executeRequest(requestDefinition, {}, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_list_mail_folders',
      description: 'List the signed-in user\'s mail folders (Inbox, Sent, etc.).',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
