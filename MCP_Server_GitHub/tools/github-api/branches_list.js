/**
 * List branches. GET /repos/:owner/:repo/branches
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List branches',
  request: {
    method: 'GET',
    url: {
      raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/branches?per_page={{per_page}}&page={{page}}',
      host: ['{{GITHUB_BASE_URL}}'],
      path: ['repos', ':owner', ':repo', 'branches'],
      query: [
        { key: 'per_page', value: '{{per_page}}' },
        { key: 'page', value: '{{page}}' },
      ],
    },
    header: [
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, per_page, page } = {}) => {
  return executeRequest(requestDefinition, { owner, repo, per_page: per_page ?? 30, page: page ?? 1 }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_branches_list',
      description: 'List branches for a repository.',
      parameters: {
        type: 'object',
        properties: {
          owner: { type: 'string' },
          repo: { type: 'string' },
          per_page: { type: 'number' },
          page: { type: 'number' },
        },
        required: ['owner', 'repo'],
      },
    },
  },
};
