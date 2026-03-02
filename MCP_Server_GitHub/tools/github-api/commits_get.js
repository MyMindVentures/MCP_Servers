/**
 * Get a commit. GET /repos/:owner/:repo/commits/:ref
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get commit',
  request: {
    method: 'GET',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/commits/:ref', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo', 'commits', ':ref'] },
    header: [
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, ref }) => executeRequest(requestDefinition, { owner, repo, ref }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_commits_get',
      description: 'Get a commit by SHA or ref.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, ref: { type: 'string' } },
        required: ['owner', 'repo', 'ref'],
      },
    },
  },
};
