/**
 * Deletes a webhook. DELETE /v0/bases/:baseId/webhooks/:webhookId.
 * Requires personal_access_token (Webhooks API).
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Delete webhook',
  request: {
    method: 'DELETE',
    url: {
      raw: '{{pan_mcp_base_url}}/v0/bases/:baseId/webhooks/:webhookId',
      host: ['{{pan_mcp_base_url}}'],
      path: ['v0', 'bases', ':baseId', 'webhooks', ':webhookId'],
      variable: [
        { key: 'baseId', value: '<string>', description: 'Base ID' },
        { key: 'webhookId', value: '<string>', description: 'Webhook ID' },
      ],
    },
    header: [{ key: 'Accept', value: 'application/json' }],
    body: null,
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{pan_mcp_personal_access_token}}', type: 'string' }],
    },
  },
};

const collectionVariables = [
  { key: 'baseUrl', value: 'https://api.airtable.com' },
  { key: 'PersonalAccessToken', value: '' },
];

const executeFunction = async ({ baseId, webhookId }) => {
  return executeRequest(requestDefinition, { baseId, webhookId }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_webhook',
      description:
        'Deletes a webhook. After deletion, Airtable will no longer send notifications to that URL. Requires personal_access_token (Webhooks API).',
      parameters: {
        type: 'object',
        properties: {
          baseId: { type: 'string', description: 'The base ID' },
          webhookId: { type: 'string', description: 'Webhook ID (from list_webhooks)' },
        },
        required: ['baseId', 'webhookId'],
      },
    },
  },
};
