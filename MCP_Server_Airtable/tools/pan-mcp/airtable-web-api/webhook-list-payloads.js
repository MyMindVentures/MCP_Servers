/**
 * Retrieves webhook payloads (change events). POST /v0/bases/:baseId/webhooks/:webhookId/payloads.
 * Pass cursor to get payloads after that position. Max 50 per request. Requires personal_access_token.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

const defaultBody = JSON.stringify({ cursor: 1 });

const requestDefinition = {
  name: 'List webhook payloads',
  request: {
    method: 'POST',
    url: {
      raw: '{{pan_mcp_base_url}}/v0/bases/:baseId/webhooks/:webhookId/payloads',
      host: ['{{pan_mcp_base_url}}'],
      path: ['v0', 'bases', ':baseId', 'webhooks', ':webhookId', 'payloads'],
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
      raw: '{{webhook_payloads_body}}',
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

const executeFunction = async ({ baseId, webhookId, cursor, limit, body }) => {
  let bodyStr = defaultBody;
  if (cursor != null || limit != null) {
    const obj = {};
    if (cursor != null) obj.cursor = cursor;
    if (limit != null) obj.limit = limit;
    bodyStr = JSON.stringify(obj);
  } else if (body != null) {
    bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
  }
  return executeRequest(
    requestDefinition,
    { baseId, webhookId, webhook_payloads_body: bodyStr },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_webhook_payloads',
      description:
        'Retrieves webhook payloads (change events) for a webhook. Pass cursor to get payloads after that position; save the returned cursor for the next call. Payloads are kept 7 days. Requires personal_access_token.',
      parameters: {
        type: 'object',
        properties: {
          baseId: { type: 'string', description: 'The base ID' },
          webhookId: { type: 'string', description: 'Webhook ID' },
          cursor: { type: 'integer', description: 'Cursor from previous response; use 1 for first page' },
          limit: { type: 'integer', description: 'Max payloads to return (default 50)' },
          body: { type: 'object', description: 'Request body { cursor, limit } instead of separate params' },
        },
        required: ['baseId', 'webhookId'],
      },
    },
  },
};
