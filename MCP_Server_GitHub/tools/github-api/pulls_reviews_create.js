/**
 * Create pull request review. POST /repos/:owner/:repo/pulls/:pull_number/reviews
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create pull review',
  request: {
    method: 'POST',
    url: { raw: '{{GITHUB_BASE_URL}}/repos/:owner/:repo/pulls/:pull_number/reviews', host: ['{{GITHUB_BASE_URL}}'], path: ['repos', ':owner', ':repo', 'pulls', ':pull_number', 'reviews'] },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/vnd.github.v3+json' },
      { key: 'Authorization', value: 'Bearer {{GITHUB_TOKEN}}' },
    ],
    body: { mode: 'raw', raw: '{{body_json}}' },
  },
};

const collectionVariables = [{ key: 'GITHUB_BASE_URL', value: 'https://api.github.com' }];

const executeFunction = async ({ owner, repo, pull_number, body_json }) => executeRequest(requestDefinition, { owner, repo, pull_number, body_json }, collectionVariables);

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_pulls_reviews_create',
      description: 'Create a pull request review. Body: commit_id, body, event (APPROVE, REQUEST_CHANGES, COMMENT), comments.',
      parameters: {
        type: 'object',
        properties: { owner: { type: 'string' }, repo: { type: 'string' }, pull_number: { type: 'number' }, body_json: { type: 'string' } },
        required: ['owner', 'repo', 'pull_number', 'body_json'],
      },
    },
  },
};
