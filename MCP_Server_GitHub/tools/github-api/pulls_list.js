/**
 * List pull requests. GET /repos/:owner/:repo/pulls
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List pulls',
  request: {
    method: 'GET',
    url: {
      raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/pulls?state={{state}}&sort={{sort}}&direction={{direction}}&per_page={{per_page}}&page={{page}}',
      host: ['{{GITHUB_BASE_URL}}'],
      path: ['repos', ':owner', ':repo', 'pulls'],
      query: [
        { key: 'state', value: '{{state}}' },
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

const executeFunction = async ({ owner, repo, state, sort, direction, per_page, page } = {}) => {
  return executeRequest(
    requestDefinition,
    { owner, repo, state: state ?? 'open', sort: sort ?? 'created', direction: direction ?? 'desc', per_page: per_page ?? 30, page: page ?? 1 },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_pulls_list',
      description: 'List pull requests.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, state: { type: 'string' }, sort: { type: 'string' }, direction: { type: 'string' }, per_page: { type: 'number' }, page: { type: 'number' } },
        required: ['owner', 'repo'],
      },
    },
  },
};
