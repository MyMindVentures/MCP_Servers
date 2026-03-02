/**
 * Updates the name or description of a specific field in a table. Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Update field",
  "request": {
    "method": "PATCH",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/meta/bases/:baseId/tables/:tableId/fields/:columnId",
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
        "fields",
        ":columnId"
      ],
      "variable": [
        {
          "id": "006067f3-8073-49c5-85ec-7a7e0bac8af1",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "1dfb5806-04f1-44a3-b1ba-b897407c3ba1",
          "key": "tableId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "8d30f17a-979c-4d2c-b9d9-f52cc0f231f3",
          "key": "columnId",
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
      "raw": "{\n  \"description\": \"<string>\",\n  \"name\": \"<string>\"\n}",
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
const executeFunction = async ({ baseId, tableId, columnId }) => {
  return executeRequest(requestDefinition, { baseId, tableId, columnId }, collectionVariables);
};

/**
 * Tool definition for Update field
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_field',
      description: 'Updates the name or description of a specific field in a table. Requires env vars: base_url, personal_access_token',
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
          },
          'columnId': {
            type: 'string',
            description: 'The columnId parameter'
          }
        },
        required: ['baseId', 'tableId', 'columnId']
      }
    }
  }
};
