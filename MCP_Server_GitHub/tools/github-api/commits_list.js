/**
 * List commits. GET /repos/:owner/:repo/commits
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List commits',
  request: {
    method: 'GET',
    url: {
      raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/commits?sha={{sha}}&path={{path}}&per_page={{per_page}}&page={{page}}',
      host: ['{{GITHUB_BASE_URL}}'],
      path: ['repos', ':owner', ':repo', 'commits'],
      query: [
        { key: 'sha', value: '{{sha}}' },
        { key: 'path', value: '{{path}}' },
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

const executeFunction = async ({ owner, repo, sha, path, per_page, page } = {}) => {
  return executeRequest(
    requestDefinition,
    { owner, repo, sha: sha ?? '', path: path ?? '', per_page: per_page ?? 30, page: page ?? 1 },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_commits_list',
      description: 'List commits on a repository.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, sha: { type: 'string' }, path: { type: 'string' }, per_page: { type: 'number' }, page: { type: 'number' } },
        required: ['owner', 'repo'],
      },
    },
  },
};
