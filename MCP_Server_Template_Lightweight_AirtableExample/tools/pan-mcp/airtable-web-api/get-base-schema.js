/**
 * Retrieves the schema of tables within a specified base. Requires env vars: personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Get base schema",
  "request": {
    "method": "GET",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/meta/bases/:baseId/tables?include=<string>&include=<string>",
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
          "id": "325f50f1-4506-4fcb-8c37-46621428b538",
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
const executeFunction = async ({ baseUrl, baseId }) => {
  return executeRequest(requestDefinition, { baseUrl, baseId }, collectionVariables);
};

/**
 * Tool definition for Get base schema
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_base_schema',
      description: 'Retrieves the schema of tables within a specified base. Requires env vars: personal_access_token',
      parameters: {
        type: 'object',
        properties: {
          'baseUrl': {
            type: 'string',
            description: 'The baseUrl parameter'
          },
          'baseId': {
            type: 'string',
            description: 'The baseId parameter'
          }
        },
        required: ['baseUrl', 'baseId']
      }
    }
  }
};
