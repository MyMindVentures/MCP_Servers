/**
 * Create an issue. POST /repos/:owner/:repo/issues
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create issue',
  request: {
    method: 'POST',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/issues', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo', 'issues'] },
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
      name: 'github_issues_create',
      description: 'Create an issue. Body: title, body, assignees, labels, etc.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, body_json: { type: 'string' } },
        required: ['owner', 'repo', 'body_json'],
      },
    },
  },
};
