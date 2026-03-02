/**
 * Lists accessible bases for the token, supporting pagination via offset. Requires env vars: personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "List bases",
  "request": {
    "method": "GET",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/meta/bases?offset=<string,null>",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        "meta",
        "bases"
      ],
      "query": [
        {
          "key": "offset",
          "value": "<string,null>"
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
const executeFunction = async ({ baseUrl }) => {
  return executeRequest(requestDefinition, { baseUrl }, collectionVariables);
};

/**
 * Tool definition for List bases
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_bases',
      description: 'Lists accessible bases for the token, supporting pagination via offset. Requires env vars: personal_access_token',
      parameters: {
        type: 'object',
        properties: {
          'baseUrl': {
            type: 'string',
            description: 'The baseUrl parameter'
          }
        },
        required: ['baseUrl']
      }
    }
  }
};
