/**
 * List raindrops in a collection. GET /rest/v1/raindrops/:collectionId
 * Use collectionId 0 for all raindrops.
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List raindrops',
  request: {
    method: 'GET',
    url: {
      raw: '{{RAINDROP_BASE_URL}}/raindrops/:collection_id?page={{page}}&perpage={{perpage}}&search={{search}}&sort={{sort}}',
      host: ['{{RAINDROP_BASE_URL}}'],
      path: ['raindrops', ':collection_id'],
      query: [
        { key: 'page', value: '{{page}}' },
        { key: 'perpage', value: '{{perpage}}' },
        { key: 'search', value: '{{search}}' },
        { key: 'sort', value: '{{sort}}' },
      ],
    },
    header: [{ key: 'Accept', value: 'application/json' }],
    body: null,
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{RAINDROP_ACCESS_TOKEN}}', type: 'string' }],
    },
  },
};

const collectionVariables = [
  { key: 'RAINDROP_BASE_URL', value: 'https://api.raindrop.io/rest/v1' },
];

const executeFunction = async ({ collection_id, page, perpage, search, sort } = {}) => {
  return executeRequest(
    requestDefinition,
    {
      collection_id: collection_id ?? 0,
      page: page ?? 0,
      perpage: perpage ?? 50,
      search: search ?? '',
      sort: sort ?? '-created',
    },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'raindrop_list_raindrops',
      description: 'List raindrops (bookmarks) in a collection. Use collection_id 0 for all. Optional: page, perpage, search, sort (-created, title, etc.).',
      parameters: {
        type: 'object',
        properties: {
          collection_id: { type: 'number', description: 'Collection ID (0 = all)' },
          page: { type: 'number', description: 'Page number' },
          perpage: { type: 'number', description: 'Per page (max 50)' },
          search: { type: 'string', description: 'Search text' },
          sort: { type: 'string', description: 'Sort: -created, title, -title, etc.' },
        },
        required: [],
      },
    },
  },
};
