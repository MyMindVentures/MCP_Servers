/**
 * Executes 89f1ca5c-32e5-40e8-9de6-2eb5fd2e653a API request Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Delete record",
  "request": {
    "method": "DELETE",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/:baseId/:tableIdOrName/:recordId",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        ":baseId",
        ":tableIdOrName",
        ":recordId"
      ],
      "variable": [
        {
          "id": "31ac5d8c-19a1-40cb-89e6-4574bcb5afb6",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "880dabe2-07ae-4c2f-ae76-3df9f9201377",
          "key": "tableIdOrName",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "af8b6be6-67e4-4d41-b432-0a6b97b776dd",
          "key": "recordId",
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
const executeFunction = async ({ baseId, tableIdOrName, recordId }) => {
  return executeRequest(requestDefinition, { baseId, tableIdOrName, recordId }, collectionVariables);
};

/**
 * Tool definition for Delete record
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_record',
      description: 'Executes 89f1ca5c-32e5-40e8-9de6-2eb5fd2e653a API request Requires env vars: base_url, personal_access_token',
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
          },
          'recordId': {
            type: 'string',
            description: 'The recordId parameter'
          }
        },
        required: ['baseId', 'tableIdOrName', 'recordId']
      }
    }
  }
};
