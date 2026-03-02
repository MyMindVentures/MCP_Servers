/**
 * Create a pull request. POST /repos/:owner/:repo/pulls
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create pull',
  request: {
    method: 'POST',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/pulls', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo', 'pulls'] },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: { mode: 'raw', raw: '{{body_json}}' },
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, body_json }) => executeRequest(requestDefinition, { owner, repo, body_json }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_pulls_create',
      description: 'Create a pull request. Body: title, head, base, body, etc.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, body_json: { type: 'string' } },
        required: ['owner', 'repo', 'body_json'],
      },
    },
  },
};
