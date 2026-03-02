/**
 * Search repositories. GET /search/repositories
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Search repos',
  request: {
    method: 'GET',
    url: {
      raw: '{{GITHUB_BASE_URL}}/search/repositories?q={{q}}&sort={{sort}}&order={{order}}&per_page={{per_page}}&page={{page}}',
      host: ['{{GITHUB_BASE_URL}}'],
      path: ['search', 'repositories'],
      query: [
        { key: 'q', value: '{{q}}' },
        { key: 'sort', value: '{{sort}}' },
        { key: 'order', value: '{{order}}' },
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

const executeFunction = async ({ q, sort, order, per_page, page } = {}) => {
  return executeRequest(
    requestDefinition,
    { q: q ?? '', sort: sort ?? '', order: order ?? 'desc', per_page: per_page ?? 30, page: page ?? 1 },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_search_repos',
      description: 'Search repositories. q is the search query (e.g. "org:github language:js").',
      parameters: {
        type: 'object',
        properties: { q: { type: 'string' }, sort: { type: 'string' }, order: { type: 'string' }, per_page: { type: 'number' }, page: { type: 'number' } },
        required: ['q'],
      },
    },
  },
};
