/**
 * List issue comments. GET /repos/:owner/:repo/issues/:issue_number/comments
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List issue comments',
  request: {
    method: 'GET',
    url: {
      raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/issues/:issue_number/comments?per_page={{per_page}}&page={{page}}',
      host: ['{{GITHUB_BASE_URL}}'],
      path: ['repos', ':owner', ':repo', 'issues', ':issue_number', 'comments'],
      query: [{ key: 'per_page', value: '{{per_page}}' }, { key: 'page', value: '{{page}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, issue_number, per_page, page } = {}) => {
  return executeRequest(requestDefinition, { owner, repo, issue_number, per_page: per_page ?? 30, page: page ?? 1 }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_issues_comments_list',
      description: 'List comments on an issue.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, issue_number: { type: 'number' }, per_page: { type: 'number' }, page: { type: 'number' } },
        required: ['owner', 'repo', 'issue_number'],
      },
    },
  },
};
