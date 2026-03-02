/**
 * GitHub API meta. GET /
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Meta',
  request: {
    method: 'GET',
    url: { raw: '{{GITHUB_BASE_URL}}/', host: ['{{GITHUB_BASE_URL}}'], path: [''] },
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
      name: 'github_meta',
      description: 'Get GitHub API meta information.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
