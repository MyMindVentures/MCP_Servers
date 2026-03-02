/**
 * Get a user by username. GET /users/:username
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get user by username',
  request: {
    method: 'GET',
    url: { raw: '{{GITHUB_BASE_URL}}/users/:username', host: ['{{GITHUB_BASE_URL}}'], path: ['users', ':username'] },
    header: [
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ username }) => executeRequest(requestDefinition, { username }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_user_get',
      description: 'Get a user by username.',
      parameters: {
        type: 'object',
        properties: { username: { type: 'string', description: 'GitHub username' } },
        required: ['username'],
      },
    },
  },
};
