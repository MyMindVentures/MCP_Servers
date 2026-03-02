/**
 * Updates a webhook (e.g. notificationUrl or specification). PATCH /v0/bases/:baseId/webhooks/:webhookId.
 * Requires personal_access_token (Webhooks API).
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update webhook',
  request: {
    method: 'PATCH',
    url: {
      raw: '{{pan_mcp_base_url}}/v0/bases/:baseId/webhooks/:webhookId',
      host: ['{{pan_mcp_base_url}}'],
      path: ['v0', 'bases', ':baseId', 'webhooks', ':webhookId'],
      variable: [
        { key: 'baseId', value: '<string>', description: 'Base ID' },
        { key: 'webhookId', value: '<string>', description: 'Webhook ID' },
      ],
    },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' },
    ],
    body: {
      mode: 'raw',
      raw: '{{update_webhook_body}}',
      options: { raw: { language: 'json' } },
    },
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

const executeFunction = async ({ baseId, webhookId, notificationUrl, specification, body }) => {
  let bodyStr = '{}';
  if (notificationUrl != null || specification != null) {
    const obj = {};
    if (notificationUrl != null) obj.notificationUrl = notificationUrl;
    if (specification != null) obj.specification = specification;
    bodyStr = JSON.stringify(obj);
  } else if (body != null) {
    bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
  }
  return executeRequest(
    requestDefinition,
    { baseId, webhookId, update_webhook_body: bodyStr },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_webhook',
      description:
        'Updates an existing webhook (e.g. change notificationUrl or specification). Requires personal_access_token (Webhooks API).',
      parameters: {
        type: 'object',
        properties: {
          baseId: { type: 'string', description: 'The base ID' },
          webhookId: { type: 'string', description: 'Webhook ID' },
          notificationUrl: { type: 'string', description: 'New URL for notifications' },
          specification: { type: 'object', description: 'New webhook specification' },
          body: { type: 'object', description: 'Full PATCH body instead of separate params' },
        },
        required: ['baseId', 'webhookId'],
      },
    },
  },
};
