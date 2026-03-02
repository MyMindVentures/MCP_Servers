/**
 * Search pages and databases. POST /v1/search
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Search',
  request: {
    method: 'POST',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/search',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'search'],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Notion-Version', value: '{{NOTION_VERSION}}' },
    ],
    body: {
      mode: 'raw',
      raw: '{{body}}',
    },
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{NOTION_API_KEY}}', type: 'string' }],
    },
  },
};

const collectionVariables = [
  { key: 'NOTION_BASE_URL', value: 'https://api.notion.com' },
  { key: 'NOTION_VERSION', value: '2022-06-28' },
];

const executeFunction = async ({ body }) => {
  const parsed = typeof body === 'string' ? body : JSON.stringify(body || {});
  return executeRequest(requestDefinition, { body: parsed }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_search',
      description: 'Search across pages and databases shared with the integration. Body can include query string, filter, sort, page_size, start_cursor.',
      parameters: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            description: 'Optional JSON: query (string), filter (object), sort (object), page_size, start_cursor',
          },
        },
        required: [],
      },
    },
  },
};
