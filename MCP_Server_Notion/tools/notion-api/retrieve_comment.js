/**
 * Retrieve a comment by ID. GET /v1/comments/:comment_id
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Retrieve comment',
  request: {
    method: 'GET',
    url: {
      raw: '{{NOTION_BASE_URL}}/v1/comments/:comment_id',
      host: ['{{NOTION_BASE_URL}}'],
      path: ['v1', 'comments', ':comment_id'],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Notion-Version', value: '{{NOTION_VERSION}}' },
    ],
    body: null,
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

const executeFunction = async ({ comment_id }) => {
  return executeRequest(requestDefinition, { comment_id }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'notion_retrieve_comment',
      description: 'Retrieve a Notion comment by its ID.',
      parameters: {
        type: 'object',
        properties: {
          comment_id: { type: 'string', description: 'The comment UUID' },
        },
        required: ['comment_id'],
      },
    },
  },
};
