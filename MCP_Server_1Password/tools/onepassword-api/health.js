/**
 * Server health. GET /health
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Health',
  request: {
    method: 'GET',
    url: { raw: '{{ONEPASSWORD_CONNECT_ROOT}}/health', host: ['{{ONEPASSWORD_CONNECT_ROOT}}'], path: ['health'] },
    header: [{ key: 'Accept', value: 'application/json' }],
    body: null,
  },
};

const executeFunction = async () => {
  return executeRequest(requestDefinition, {}, []);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_health',
      description: 'Get 1Password Connect server health and dependencies. Set ONEPASSWORD_CONNECT_ROOT to server root URL (e.g. http://host:8080).',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
