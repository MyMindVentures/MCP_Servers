/**
 * Update an issue. PATCH /repos/:owner/:repo/issues/:issue_number
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update issue',
  request: {
    method: 'PATCH',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/issues/:issue_number', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo', 'issues', ':issue_number'] },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: { mode: 'raw', raw: '{{body_json}}' },
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, issue_number, body_json }) => executeRequest(requestDefinition, { owner, repo, issue_number, body_json }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_issues_update',
      description: 'Update an issue. Body: title, body, state, assignees, labels, etc.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, issue_number: { type: 'number' }, body_json: { type: 'string' } },
        required: ['owner', 'repo', 'issue_number', 'body_json'],
      },
    },
  },
};
