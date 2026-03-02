/**
 * List repos for authenticated user. GET /user/repos
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List repos',
  request: {
    method: 'GET',
    url: {
      raw: '{{GITHUB_BASE_URL}}/user/repos?type={{type}}&sort={{sort}}&direction={{direction}}&per_page={{per_page}}&page={{page}}',
      host: ['{{GITHUB_BASE_URL}}'],
      path: ['user', 'repos'],
      query: [
        { key: 'type', value: '{{type}}' },
        { key: 'sort', value: '{{sort}}' },
        { key: 'direction', value: '{{direction}}' },
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

const executeFunction = async ({ type, sort, direction, per_page, page } = {}) => {
  return executeRequest(
    requestDefinition,
    { type: type ?? 'all', sort: sort ?? 'full_name', direction: direction ?? 'asc', per_page: per_page ?? 30, page: page ?? 1 },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'github_repos_list',
      description: 'List repositories for the authenticated user. For org/user repos use search or repos_get.',
      parameters: {
        type: 'object',
        properties: {
          type: { type: 'string', description: 'all, owner, member' },
          sort: { type: 'string', description: 'created, updated, pushed, full_name' },
          direction: { type: 'string', description: 'asc or desc' },
          per_page: { type: 'number', description: 'Per page (max 100)' },
          page: { type: 'number', description: 'Page number' },
        },
        required: [],
      },
    },
  },
};
