/**
 * List messages in mailbox or folder. GET /me/messages or /me/mailFolders/{id}/messages
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List messages',
  request: {
    method: 'GET',
    url: {
      raw: '{{GRAPH_BASE_URL}}/me/mailFolders/:folder_id/messages?$top={{top}}&$skip={{skip}}',
      host: ['{{GRAPH_BASE_URL}}'],
      path: ['me', 'mailFolders', ':folder_id', 'messages'],
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

const executeFunction = async ({ folder_id, top, skip } = {}) => {
  return executeRequest(
    requestDefinition,
    { folder_id: folder_id || 'inbox', top: top ?? 50, skip: skip ?? 0 },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'outlook_list_messages',
      description: 'List messages in a mail folder. Use folder_id (e.g. inbox, sentitems) or get IDs from list_mail_folders.',
      parameters: {
        type: 'object',
        properties: {
          folder_id: { type: 'string', description: 'Folder ID or well-known name (inbox, sentitems, drafts)' },
          top: { type: 'number', description: 'Page size (default 50)' },
          skip: { type: 'number', description: 'Skip count for pagination' },
        },
        required: [],
      },
    },
  },
};
