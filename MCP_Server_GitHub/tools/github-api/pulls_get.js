/**
 * Get a pull request. GET /repos/:owner/:repo/pulls/:pull_number
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get pull',
  request: {
    method: 'GET',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/pulls/:pull_number', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo', 'pulls', ':pull_number'] },
    header: [
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, pull_number }) => executeRequest(requestDefinition, { owner, repo, pull_number }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_pulls_get',
      description: 'Get a pull request by number.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, pull_number: { type: 'number' } },
        required: ['owner', 'repo', 'pull_number'],
      },
    },
  },
};
