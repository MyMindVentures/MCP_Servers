/**
 * Creates a webhook on a base. Airtable will POST to your notificationUrl when data changes.
 * POST /v0/bases/:baseId/webhooks. Requires personal_access_token. Webhooks API (API Auth).
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create webhook',
  request: {
    method: 'POST',
    url: {
      raw: '{{pan_mcp_base_url}}/v0/bases/:baseId/webhooks',
      host: ['{{pan_mcp_base_url}}'],
      path: ['v0', 'bases', ':baseId', 'webhooks'],
      variable: [
        { key: 'baseId', value: '<string>', description: 'Base ID' },
      ],
    },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' },
    ],
    body: {
      mode: 'raw',
      raw: '{{create_webhook_body}}',
      options: { raw: { language: 'json' } },
    },
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{pan_mcp_personal_access_token}}', type: 'string' }],
    },
  },
};

const defaultBody = JSON.stringify({
  notificationUrl: 'https://example.com/webhook',
  specification: {
    options: {
      filters: {
        dataTypes: ['tableData'],
      },
    },
  },
});

const collectionVariables = [
  { key: 'baseUrl', value: 'https://api.airtable.com' },
  { key: 'PersonalAccessToken', value: '' },
];

const executeFunction = async ({ baseId, notificationUrl, specification, body }) => {
  let bodyStr = defaultBody;
  if (notificationUrl != null && specification != null) {
    bodyStr = JSON.stringify({ notificationUrl, specification });
  } else if (body != null) {
    bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
  }
  return executeRequest(
    requestDefinition,
    { baseId, create_webhook_body: bodyStr },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_webhook',
      description:
        'Creates a webhook on a base. Airtable will POST to your notificationUrl when data or metadata changes. Save the returned mac_secret_base64 to validate incoming requests. Requires personal_access_token (Webhooks API).',
      parameters: {
        type: 'object',
        properties: {
          baseId: { type: 'string', description: 'The base ID' },
          notificationUrl: { type: 'string', description: 'URL where Airtable will POST notifications' },
          specification: {
            type: 'object',
            description: 'Webhook spec: e.g. { options: { filters: { dataTypes: ["tableData"] } } }',
          },
          body: {
            type: 'object',
            description: 'Full request body (notificationUrl + specification) instead of separate params',
          },
        },
        required: ['baseId'],
      },
    },
  },
};
