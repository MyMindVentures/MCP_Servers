/**
 * Creates a new column in a table and returns its schema. Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Create field",
  "request": {
    "method": "POST",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/meta/bases/:baseId/tables/:tableId/fields",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        "meta",
        "bases",
        ":baseId",
        "tables",
        ":tableId",
        "fields"
      ],
      "variable": [
        {
          "id": "3323eff5-e645-4511-be3b-d48ed9739c06",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "c9053a75-b837-49b5-945b-a2072dc9a9ef",
          "key": "tableId",
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
      "raw": "{\n  \"name\": \"<string>\",\n  \"type\": \"<string>\",\n  \"description\": \"<string>\"\n}",
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
const executeFunction = async ({ baseId, tableId }) => {
  return executeRequest(requestDefinition, { baseId, tableId }, collectionVariables);
};

/**
 * Tool definition for Create field
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_field',
      description: 'Creates a new column in a table and returns its schema. Requires env vars: base_url, personal_access_token',
      parameters: {
        type: 'object',
        properties: {
          'baseId': {
            type: 'string',
            description: 'The baseId parameter'
          },
          'tableId': {
            type: 'string',
            description: 'The tableId parameter'
          }
        },
        required: ['baseId', 'tableId']
      }
    }
  }
};
