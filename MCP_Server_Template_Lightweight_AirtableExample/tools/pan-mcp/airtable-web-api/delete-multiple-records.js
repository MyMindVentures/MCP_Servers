/**
 * Executes 82ba72ca-46c7-4575-bf71-72abe8966d15 API request Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Delete multiple records",
  "request": {
    "method": "DELETE",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/:baseId/:tableIdOrName?records=<string>&records=<string>",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        ":baseId",
        ":tableIdOrName"
      ],
      "query": [
        {
          "key": "records",
          "value": "<string>"
        },
        {
          "key": "records",
          "value": "<string>"
        }
      ],
      "variable": [
        {
          "id": "3a755f20-6e9c-4c20-bdfb-65ee05c0f84f",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "2e330b5e-1c6b-4ab8-92f3-093b931a1751",
          "key": "tableIdOrName",
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
const executeFunction = async ({ baseId, tableIdOrName }) => {
  return executeRequest(requestDefinition, { baseId, tableIdOrName }, collectionVariables);
};

/**
 * Tool definition for Delete multiple records
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_multiple_records',
      description: 'Executes 82ba72ca-46c7-4575-bf71-72abe8966d15 API request Requires env vars: base_url, personal_access_token',
      parameters: {
        type: 'object',
        properties: {
          'baseId': {
            type: 'string',
            description: 'The baseId parameter'
          },
          'tableIdOrName': {
            type: 'string',
            description: 'The tableIdOrName parameter'
          }
        },
        required: ['baseId', 'tableIdOrName']
      }
    }
  }
};
