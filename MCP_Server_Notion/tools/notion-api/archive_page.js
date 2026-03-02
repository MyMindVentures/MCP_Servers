/**
 * Archive (trash) a page. PATCH /v1/pages/:page_id with archived: true
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Archive page',
  request: {
    method: 'PATCH',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/pages/:page_id',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'pages', ':page_id'],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Notion-Version', value: '{{NOTION_VERSION}}' },
    ],
    body: {
      mode: 'raw',
      raw: '{"archived":true}',
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

const executeFunction = async ({ page_id }) => {
  return executeRequest(requestDefinition, { page_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_archive_page',
      description: 'Archive (move to trash) a Notion page by ID.',
      parameters: {
        type: 'object',
        properties: {
          page_id: { type: 'string', description: 'The page UUID to archive' },
        },
        required: ['page_id'],
      },
    },
  },
};
