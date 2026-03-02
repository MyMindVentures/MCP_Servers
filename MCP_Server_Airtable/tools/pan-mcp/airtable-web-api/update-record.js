/**
 * Executes 7ba56b32-c3e9-492d-8c9d-45d2425f490c API request Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Update record",
  "request": {
    "method": "PATCH",
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
          "id": "ab6366e4-c030-4078-b62d-3c81b9c30ae7",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "99f3ac13-6c72-42d2-8741-14eae129f0a4",
          "key": "tableIdOrName",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "e3e198b6-d2ca-4c1f-ac71-a83931c14ac1",
          "key": "recordId",
          "value": "<string>",
          "description": "(Required) "
        }
      ]
    },
    "header": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "body": {
      "mode": "raw",
      "raw": "{\n  \"fields\": {\n    \"key_0\": {}\n  },\n  \"returnFieldsByFieldId\": \"<boolean,null>\",\n  \"typecast\": \"<boolean,null>\"\n}",
      "options": {
        "raw": {
          "language": "json"
        }
      }
    },
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
 * Tool definition for Update record
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_record',
      description: 'Executes 7ba56b32-c3e9-492d-8c9d-45d2425f490c API request Requires env vars: base_url, personal_access_token',
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
