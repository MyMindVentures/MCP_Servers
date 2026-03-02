/**
 * Delete a webhook. DELETE /api/v2/webhook/{webhook_id}
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Delete webhook',
  request: {
    method: 'DELETE',
    url: { raw: '{{CLICKUP_BASE_URL}}/webhook/:webhook_id', host: ['{{CLICKUP_BASE_URL}}'], path: ['webhook', ':webhook_id'] },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ webhook_id }) => {
  return executeRequest(requestDefinition, { webhook_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_delete_webhook',
      description: 'Delete a ClickUp webhook by ID.',
      parameters: {
        type: 'object',
        properties: { webhook_id: { type: 'string', description: 'Webhook ID' } },
        required: ['webhook_id'],
      },
    },
  },
};
