/**
 * Update file (same as create with sha). PUT /repos/:owner/:repo/contents/:path
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Update contents',
  request: {
    method: 'PUT',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/contents/:path', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo', 'contents', ':path'] },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: { mode: 'raw', raw: '{{body_json}}' },
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, path, body_json }) => executeRequest(requestDefinition, { owner, repo, path, body_json }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_contents_update',
      description: 'Update a file. Body: message, content (base64), sha (required), branch.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, path: { type: 'string' }, body_json: { type: 'string' } },
        required: ['owner', 'repo', 'path', 'body_json'],
      },
    },
  },
};
