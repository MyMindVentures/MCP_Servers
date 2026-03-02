/**
 * Get repository contents. GET /repos/:owner/:repo/contents/:path
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Get contents',
  request: {
    method: 'GET',
    url: {
      raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/contents/:path?ref={{ref}}',
      host: ['{{GITHUB_BASE_URL}}'],
      path: ['repos', ':owner', ':repo', 'contents', ':path'],
      query: [{ key: 'ref', value: '{{ref}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, path, ref } = {}) => {
  return executeRequest(requestDefinition, { owner, repo, path, ref: ref ?? '' }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_contents_get',
      description: 'Get file or directory contents. path is the file path. Use ref for branch/tag/SHA.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, path: { type: 'string' }, ref: { type: 'string' } },
        required: ['owner', 'repo', 'path'],
      },
    },
  },
};
