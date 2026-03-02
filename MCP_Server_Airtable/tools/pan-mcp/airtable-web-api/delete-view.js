/**
 * Deletes a specific view from a base in the system. Requires env vars: personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Delete view",
  "request": {
    "method": "DELETE",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/meta/bases/:baseId/views/:viewId",
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
      "variable": [
        {
          "id": "0d127c76-6209-4147-8d68-667f9ada5ef6",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "53dda7fe-c91c-498a-8345-e2d6fec819ea",
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
 * Tool definition for Delete view
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_view',
      description: 'Deletes a specific view from a base in the system. Requires env vars: personal_access_token',
      parameters: {
        type: 'object',
        properties: {
          'baseId': {
            type: 'string',
            description: 'The baseId parameter'
          },
          'viewId': {
            type: 'string',
            description: 'The viewId parameter'
          }
        },
        required: ['baseId', 'viewId']
      }
    }
  }
};
