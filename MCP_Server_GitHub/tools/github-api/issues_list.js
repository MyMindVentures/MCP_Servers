/**
 * List issues. GET /repos/:owner/:repo/issues
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List issues',
  request: {
    method: 'GET',
    url: {
      raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/issues?state={{state}}&labels={{labels}}&sort={{sort}}&direction={{direction}}&per_page={{per_page}}&page={{page}}',
      host: ['{{GITHUB_BASE_URL}}'],
      path: ['repos', ':owner', ':repo', 'issues'],
      query: [
        { key: 'state', value: '{{state}}' },
        { key: 'labels', value: '{{labels}}' },
        { key: 'sort', value: '{{sort}}' },
        { key: 'direction', value: '{{direction}}' },
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

const executeFunction = async ({ owner, repo, state, labels, sort, direction, per_page, page } = {}) => {
  return executeRequest(
    requestDefinition,
    { owner, repo, state: state ?? 'open', labels: labels ?? '', sort: sort ?? 'created', direction: direction ?? 'desc', per_page: per_page ?? 30, page: page ?? 1 },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_issues_list',
      description: 'List issues for a repository.',
      parameters: {
        type: 'object',
        properties: {
          owner: { type: 'string' },
          repo: { type: 'string' },
          state: { type: 'string', description: 'open, closed, all' },
          labels: { type: 'string' },
          sort: { type: 'string' },
          direction: { type: 'string' },
          per_page: { type: 'number' },
          page: { type: 'number' },
        },
        required: ['owner', 'repo'],
      },
    },
  },
};
