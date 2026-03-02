/**
 * Get authenticated user. GET /user
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get user',
  request: {
    method: 'GET',
    url: { raw: '{{GITHUB_BASE_URL}}/user', host: ['{{GITHUB_BASE_URL}}'], path: ['user'] },
    header: [
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async () => executeRequest(requestDefinition, {}, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_user',
      description: 'Get the authenticated user.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
