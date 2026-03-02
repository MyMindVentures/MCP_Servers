/**
 * Update a pull request. PATCH /repos/:owner/:repo/pulls/:pull_number
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update pull',
  request: {
    method: 'PATCH',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/pulls/:pull_number', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo', 'pulls', ':pull_number'] },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: { mode: 'raw', raw: '{{body_json}}' },
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, pull_number, body_json }) => executeRequest(requestDefinition, { owner, repo, pull_number, body_json }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_pulls_update',
      description: 'Update a pull request. Body: title, body, state, base, etc.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, pull_number: { type: 'number' }, body_json: { type: 'string' } },
        required: ['owner', 'repo', 'pull_number', 'body_json'],
      },
    },
  },
};
