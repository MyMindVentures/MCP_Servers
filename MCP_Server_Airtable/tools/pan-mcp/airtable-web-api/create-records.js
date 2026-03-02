/**
 * Creates multiple new records in a specified table. Requires env vars: personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Create records",
  "request": {
    "method": "POST",
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
          "id": "6160eb58-d45a-4442-bb86-eb99bbb630cc",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "8ca083b9-1a5d-42c5-9fa2-ea62c523a8fe",
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
      "raw": "{\n  \"fields\": {\n    \"key_0\": {\n      \"isStale\": \"<boolean>\",\n      \"state\": \"<string>\",\n      \"value\": \"<string,null>\"\n    },\n    \"key_1\": {\n      \"isStale\": \"<boolean>\",\n      \"state\": \"<string>\",\n      \"value\": \"<string,null>\"\n    }\n  },\n  \"records\": [\n    {\n      \"fields\": {\n        \"key_0\": {\n          \"isStale\": \"<boolean>\",\n          \"state\": \"<string>\",\n          \"value\": \"<string,null>\"\n        }\n      }\n    },\n    {\n      \"fields\": {\n        \"key_0\": {\n          \"isStale\": \"<boolean>\",\n          \"state\": \"<string>\",\n          \"value\": \"<string,null>\"\n        },\n        \"key_1\": {\n          \"isStale\": \"<boolean>\",\n          \"state\": \"<string>\",\n          \"value\": \"<string,null>\"\n        },\n        \"key_2\": {\n          \"isStale\": \"<boolean>\",\n          \"state\": \"<string>\",\n          \"value\": \"<string,null>\"\n        },\n        \"key_3\": {\n          \"isStale\": \"<boolean>\",\n          \"state\": \"<string>\",\n          \"value\": \"<string,null>\"\n        }\n      }\n    }\n  ],\n  \"returnFieldsByFieldId\": \"<boolean,null>\",\n  \"typecast\": \"<boolean,null>\"\n}",
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
 * Tool definition for Create records
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_records',
      description: 'Creates multiple new records in a specified table. Requires env vars: personal_access_token',
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
