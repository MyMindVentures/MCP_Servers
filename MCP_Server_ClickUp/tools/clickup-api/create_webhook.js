/**
 * Create a webhook. POST /api/v2/team/{team_id}/webhook
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create webhook',
  request: {
    method: 'POST',
    url: { raw: '{{CLICKUP_BASE_URL}}/team/:team_id/webhook', host: ['{{CLICKUP_BASE_URL}}'], path: ['team', ':team_id', 'webhook'] },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: '{{CLICKUP_API_TOKEN}}' },
    ],
    body: {
      mode: 'raw',
      raw: '{{body_json}}',
    },
  },
};

const collectionVariables = [{ key: 'CLICKUP_BASE_URL', value: 'https://api.clickup.com/api/v2' }];

const executeFunction = async ({ team_id, endpoint, events } = {}) => {
  const body = { endpoint };
  if (events != null) body.events = Array.isArray(events) ? events : [events];
  const body_json = JSON.stringify(body);
  return executeRequest(requestDefinition, { team_id, body_json }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'clickup_create_webhook',
      description: 'Create a webhook for a ClickUp team. Provide endpoint URL and event types.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'Team ID' },
          endpoint: { type: 'string', description: 'Webhook URL' },
          events: { type: 'array', items: { type: 'string' }, description: 'Event types (e.g. taskCreated)' },
        },
        required: ['team_id', 'endpoint'],
      },
    },
  },
};
