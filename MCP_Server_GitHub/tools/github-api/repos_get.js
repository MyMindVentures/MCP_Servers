/**
 * Get a repository. GET /repos/:owner/:repo
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get repo',
  request: {
    method: 'GET',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo'] },
    header: [
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo }) => executeRequest(requestDefinition, { owner, repo }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_repos_get',
      description: 'Get a repository by owner and repo name.',
      parameters: {
        type: 'object',
        properties: {
          owner: { type: 'string', description: 'Owner (user or org)' },
          repo: { type: 'string', description: 'Repository name' },
        },
        required: ['owner', 'repo'],
      },
    },
  },
};
