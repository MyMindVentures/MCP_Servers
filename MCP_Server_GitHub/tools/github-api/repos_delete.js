/**
 * Delete a repository. DELETE /repos/:owner/:repo
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Delete repo',
  request: {
    method: 'DELETE',
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
      name: 'github_repos_delete',
      description: 'Delete a repository. Requires admin rights.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' } },
        required: ['owner', 'repo'],
      },
    },
  },
};
