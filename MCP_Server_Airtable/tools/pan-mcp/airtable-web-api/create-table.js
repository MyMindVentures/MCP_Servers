/**
 * Executes cd98308c-ae53-4be3-9c96-06691730e284 API request Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Create table",
  "request": {
    "method": "POST",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/meta/bases/:baseId/tables",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        "meta",
        "bases",
        ":baseId",
        "tables"
      ],
      "variable": [
        {
          "id": "46f9cc12-7342-4da3-900d-3a526ad7d1ba",
          "key": "baseId",
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
      "raw": "{\n  \"name\": \"<string>\",\n  \"fields\": [\n    {\n      \"name\": \"<string>\",\n      \"type\": \"<string>\",\n      \"description\": \"<string>\"\n    },\n    {\n      \"name\": \"<string>\",\n      \"type\": \"<string>\",\n      \"description\": \"<string>\"\n    }\n  ],\n  \"description\": \"<string>\"\n}",
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
const executeFunction = async ({ baseId }) => {
  return executeRequest(requestDefinition, { baseId }, collectionVariables);
};

/**
 * Tool definition for Create table
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_table',
      description: 'Executes cd98308c-ae53-4be3-9c96-06691730e284 API request Requires env vars: base_url, personal_access_token',
      parameters: {
        type: 'object',
        properties: {
          'baseId': {
            type: 'string',
            description: 'The baseId parameter'
          }
        },
        required: ['baseId']
      }
    }
  }
};
