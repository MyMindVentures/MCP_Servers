/**
 * Executes 8dd9f14e-0db0-4417-aca1-8a45bd1f5398 API request Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Get record",
  "request": {
    "method": "GET",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/:baseId/:tableIdOrName/:recordId?cellFormat=<string>&returnFieldsByFieldId=<boolean,null>",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        ":baseId",
        ":tableIdOrName",
        ":recordId"
      ],
      "query": [
        {
          "key": "cellFormat",
          "value": "<string>"
        },
        {
          "key": "returnFieldsByFieldId",
          "value": "<boolean,null>"
        }
      ],
      "variable": [
        {
          "id": "353a2ee4-9e54-42ed-953b-bf6d293bcb88",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "7651d92e-ef30-4e80-bacc-d4898bc0d206",
          "key": "tableIdOrName",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "49c52afe-f5b7-4693-a2cc-d5d7a561d668",
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
 * Tool definition for Get record
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_record',
      description: 'Executes 8dd9f14e-0db0-4417-aca1-8a45bd1f5398 API request Requires env vars: base_url, personal_access_token',
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
