/**
 * Create a repository. POST /user/repos
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create repo',
  request: {
    method: 'POST',
    url: { raw: '{{GITHUB_BASE_URL}}/user/repos', host: ['{{GITHUB_BASE_URL}}'], path: ['user', 'repos'] },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: { mode: 'raw', raw: '{{body_json}}' },
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ body_json }) => executeRequest(requestDefinition, { body_json }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_repos_create',
      description: 'Create a repository for the authenticated user. Body: name, description, private, etc.',
      parameters: {
        type: 'object',
        properties: { body_json: { type: 'string', description: 'JSON body (name required)' } },
        required: ['body_json'],
      },
    },
  },
};
