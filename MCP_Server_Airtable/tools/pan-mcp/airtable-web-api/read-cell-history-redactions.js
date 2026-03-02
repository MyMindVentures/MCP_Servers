/**
 * Executes 8e181f1b-6f61-4e91-8b80-3d9121719802 API request Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Read cell history redactions",
  "request": {
    "method": "GET",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/:baseId/:tableIdOrName/:recordId/redactions?tableId=<string>&pageSize=<number>&offset=<number>",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        ":baseId",
        ":tableIdOrName",
        ":recordId",
        "redactions"
      ],
      "query": [
        {
          "key": "tableId",
          "value": "<string>"
        },
        {
          "key": "pageSize",
          "value": "<number>"
        },
        {
          "key": "offset",
          "value": "<number>"
        }
      ],
      "variable": [
        {
          "id": "ef32d552-28cd-4335-a541-118eedf96af1",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "5eefe194-08ca-4299-9649-feeafdc2750c",
          "key": "tableIdOrName",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "2df1e065-810c-4767-a463-2f3ca464ab40",
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
 * Tool definition for Read cell history redactions
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'read_cell_history_redactions',
      description: 'Executes 8e181f1b-6f61-4e91-8b80-3d9121719802 API request Requires env vars: base_url, personal_access_token',
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
