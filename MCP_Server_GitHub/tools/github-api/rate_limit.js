/**
 * GitHub rate limit. GET /rate_limit
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Rate limit',
  request: {
    method: 'GET',
    url: { raw: '{{GITHUB_BASE_URL}}/rate_limit', host: ['{{GITHUB_BASE_URL}}'], path: ['rate_limit'] },
    header: [
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: null,
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async () => executeRequest(requestDefinition, {}, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_rate_limit',
      description: 'Get GitHub API rate limit status.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
