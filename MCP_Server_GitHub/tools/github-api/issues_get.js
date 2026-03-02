/**
 * Get an issue. GET /repos/:owner/:repo/issues/:issue_number
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get issue',
  request: {
    method: 'GET',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/issues/:issue_number', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo', 'issues', ':issue_number'] },
    header: [
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, issue_number }) => executeRequest(requestDefinition, { owner, repo, issue_number }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_issues_get',
      description: 'Get an issue by number.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, issue_number: { type: 'number' } },
        required: ['owner', 'repo', 'issue_number'],
      },
    },
  },
};
