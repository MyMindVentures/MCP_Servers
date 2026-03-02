/**
 * Fetches metadata for one view (filters, sort order, visible fields, etc.).
 * Requires env: personal_access_token.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Get view metadata",
  "request": {
    "method": "GET",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/meta/bases/:baseId/views/:viewId?include=<string>&include=<string>",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        "meta",
        "bases",
        ":baseId",
        "views",
        ":viewId"
      ],
      "query": [
        {
          "key": "include",
          "value": "<string>"
        },
        {
          "key": "include",
          "value": "<string>"
        }
      ],
      "variable": [
        {
          "id": "c087c4eb-444c-4d77-b489-9899e36cccd2",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "3e22b27c-8a34-4b98-9e15-fec4cc78dece",
          "key": "viewId",
          "value": "<string>",
          "description": "(Required) "
        }
      ]
    },
    "header": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "body": null,
    "auth": {
      "type": "bearer",
      "bearer": [
        {
          "key": "token",
          "value": "{{pan_mcp_personal_access_token}}",
          "type": "string"
        }
      ]
    }
  }
};

// Collection variables (will be merged with environment)
const collectionVariables = [
  {
    "key": "baseUrl",
    "value": "https://api.airtable.com"
  },
  {
    "key": "PersonalAccessToken",
    "value": ""
  }
];

/**
 * Executes the API request
 *
 * @param {Object} args - Function arguments
 * @returns {Promise<Object>} API response
 */
const executeFunction = async ({ baseId, viewId }) => {
  return executeRequest(requestDefinition, { baseId, viewId }, collectionVariables);
};

/**
 * Tool definition for Get view metadata
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_view_metadata',
      description: 'Fetches metadata for one view (filters, sort, visible fields). Requires personal_access_token.',
      parameters: {
        type: 'object',
        properties: {
          'baseId': {
            type: 'string',
            description: 'The base ID'
          },
          'viewId': {
            type: 'string',
            description: 'The view ID (find it via list_views)'
          }
        },
        required: ['baseId', 'viewId']
      }
    }
  }
};
