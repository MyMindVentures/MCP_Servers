/**
 * Executes c50cf78b-faa6-4972-b593-22939ba4af6d API request Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Sync CSV data",
  "request": {
    "method": "POST",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/:baseId/:tableIdOrName/sync/:apiEndpointSyncId",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        ":baseId",
        ":tableIdOrName",
        "sync",
        ":apiEndpointSyncId"
      ],
      "variable": [
        {
          "id": "2fd6f9a5-9653-49e2-b8e7-368d56b12490",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "22f666d9-0efb-47ae-aad4-c43fda839072",
          "key": "tableIdOrName",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "f44bee13-b81f-4787-bc58-e7ea56ac00b0",
          "key": "apiEndpointSyncId",
          "value": "<string>",
          "description": "(Required) "
        }
      ]
    },
    "header": [
      {
        "key": "Content-Type",
        "value": "text/csv"
      },
      {
        "key": "Accept",
        "value": "text/csv"
      }
    ],
    "body": {
      "mode": "raw",
      "raw": "{}"
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
const executeFunction = async ({ baseId, tableIdOrName, apiEndpointSyncId }) => {
  return executeRequest(requestDefinition, { baseId, tableIdOrName, apiEndpointSyncId }, collectionVariables);
};

/**
 * Tool definition for Sync CSV data
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'sync_csv_data',
      description: 'Executes c50cf78b-faa6-4972-b593-22939ba4af6d API request Requires env vars: base_url, personal_access_token',
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
          'apiEndpointSyncId': {
            type: 'string',
            description: 'The apiEndpointSyncId parameter'
          }
        },
        required: ['baseId', 'tableIdOrName', 'apiEndpointSyncId']
      }
    }
  }
};
