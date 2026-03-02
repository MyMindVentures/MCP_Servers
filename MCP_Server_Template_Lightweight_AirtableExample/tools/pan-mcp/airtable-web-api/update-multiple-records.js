/**
 * Updates multiple records or performs upsert operations with optional typecasting. Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Update multiple records",
  "request": {
    "method": "PATCH",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/:baseId/:tableIdOrName",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        ":baseId",
        ":tableIdOrName"
      ],
      "variable": [
        {
          "id": "a598f331-9f31-49ef-a079-fd10c2117aa8",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "2c75240e-4c70-4384-9d22-1c47fec4af5d",
          "key": "tableIdOrName",
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
      "raw": "{\n  \"records\": [\n    {\n      \"fields\": {\n        \"key_0\": {\n          \"isStale\": \"<boolean>\",\n          \"state\": \"<string>\",\n          \"value\": \"<string,null>\"\n        }\n      },\n      \"id\": \"<string>\"\n    },\n    {\n      \"fields\": {\n        \"key_0\": {\n          \"isStale\": \"<boolean>\",\n          \"state\": \"<string>\",\n          \"value\": \"<string,null>\"\n        },\n        \"key_1\": {\n          \"isStale\": \"<boolean>\",\n          \"state\": \"<string>\",\n          \"value\": \"<string,null>\"\n        }\n      },\n      \"id\": \"<string>\"\n    }\n  ],\n  \"performUpsert\": {\n    \"fieldsToMergeOn\": [\n      \"<string>\",\n      \"<string>\"\n    ]\n  },\n  \"returnFieldsByFieldId\": \"<boolean,null>\",\n  \"typecast\": \"<boolean,null>\"\n}",
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
const executeFunction = async ({ baseId, tableIdOrName }) => {
  return executeRequest(requestDefinition, { baseId, tableIdOrName }, collectionVariables);
};

/**
 * Tool definition for Update multiple records
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_multiple_records',
      description: 'Updates multiple records or performs upsert operations with optional typecasting. Requires env vars: base_url, personal_access_token',
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
