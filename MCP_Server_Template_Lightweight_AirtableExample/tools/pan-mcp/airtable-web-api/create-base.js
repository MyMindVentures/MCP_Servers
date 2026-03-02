/**
 * Creates a new base with specified tables and returns its schema. Requires env vars: personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Create base",
  "request": {
    "method": "POST",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/meta/bases",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        "meta",
        "bases"
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
      "raw": "{\n  \"workspaceId\": \"<string>\",\n  \"name\": \"<string>\",\n  \"tables\": [\n    {\n      \"name\": \"<string>\",\n      \"fields\": [\n        {\n          \"name\": \"<string>\",\n          \"type\": \"<string>\",\n          \"description\": \"<string>\"\n        },\n        {\n          \"name\": \"<string>\",\n          \"type\": \"<string>\",\n          \"description\": \"<string>\"\n        }\n      ],\n      \"description\": \"<string>\"\n    },\n    {\n      \"name\": \"<string>\",\n      \"fields\": [\n        {\n          \"name\": \"<string>\",\n          \"type\": \"<string>\",\n          \"description\": \"<string>\"\n        },\n        {\n          \"name\": \"<string>\",\n          \"type\": \"<string>\",\n          \"description\": \"<string>\"\n        }\n      ],\n      \"description\": \"<string>\"\n    }\n  ]\n}",
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
const executeFunction = async ({ baseUrl, name, tables }) => {
  return executeRequest(requestDefinition, { baseUrl, name, tables }, collectionVariables);
};

/**
 * Tool definition for Create base
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_base',
      description: 'Creates a new base with specified tables and returns its schema. Requires env vars: personal_access_token',
      parameters: {
        type: 'object',
        properties: {
          'baseUrl': {
            type: 'string',
            description: 'The baseUrl parameter'
          },
          'name': {
            type: 'string',
            description: 'The name parameter'
          },
          'tables': {
            type: 'array',
            description: 'The tables parameter'
          }
        },
        required: ['baseUrl', 'name', 'tables']
      }
    }
  }
};
