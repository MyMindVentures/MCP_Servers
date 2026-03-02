/**
 * Lists all views in a base. Use this to find view IDs and see how tables are displayed.
 * Requires env: personal_access_token.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "List views",
  "request": {
    "method": "GET",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/meta/bases/:baseId/views?include=<string>&include=<string>",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        "meta",
        "bases",
        ":baseId",
        "views"
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
          "id": "7f851439-607f-4c3e-b3a1-214dd970c3c5",
          "key": "baseId",
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
const executeFunction = async ({ baseId }) => {
  return executeRequest(requestDefinition, { baseId }, collectionVariables);
};

/**
 * Tool definition for List views
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_views',
      description: 'Lists all views in an Airtable base. Use this to find view IDs. Requires personal_access_token.',
      parameters: {
        type: 'object',
        properties: {
          'baseId': {
            type: 'string',
            description: 'The base ID (find it via list_bases or get_base_schema)'
          }
        },
        required: ['baseId']
      }
    }
  }
};
