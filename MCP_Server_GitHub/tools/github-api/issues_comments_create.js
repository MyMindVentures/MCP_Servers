/**
 * Create issue comment. POST /repos/:owner/:repo/issues/:issue_number/comments
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create issue comment',
  request: {
    method: 'POST',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/issues/:issue_number/comments', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo', 'issues', ':issue_number', 'comments'] },
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
      name: 'github_issues_comments_create',
      description: 'Create a comment on an issue. Body: { body: "comment text" }.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, issue_number: { type: 'number' }, body_json: { type: 'string' } },
        required: ['owner', 'repo', 'issue_number', 'body_json'],
      },
    },
  },
};
