/**
 * Create a comment. POST /v1/comments
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create comment',
  request: {
    method: 'POST',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/comments',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'comments'],
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
      name: 'notion_create_comment',
      description: 'Create a comment on a page or block. Body must include parent (page_id or block_id) and rich_text.',
      parameters: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            description: 'JSON: parent (page_id or block_id), rich_text (array of text objects)',
          },
        },
        required: ['body'],
      },
    },
  },
};
