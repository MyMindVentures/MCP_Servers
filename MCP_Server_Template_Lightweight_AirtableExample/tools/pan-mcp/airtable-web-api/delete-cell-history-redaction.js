/**
 * Deletes a cell history redaction to reveal previous cell history. Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Delete cell history redaction",
  "request": {
    "method": "DELETE",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/:baseId/:tableIdOrName/:recordId/redactions/:cellHistoryRedactionId?tableId=<string>",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        ":baseId",
        ":tableIdOrName",
        ":recordId",
        "redactions",
        ":cellHistoryRedactionId"
      ],
      "query": [
        {
          "key": "tableId",
          "value": "<string>"
        }
      ],
      "variable": [
        {
          "id": "55abcd1f-cc0d-4a73-b193-dd9f78646f07",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "35858697-fee2-470d-927b-f3df006b0601",
          "key": "tableIdOrName",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "11d3c287-c332-4e25-9976-0a5387462461",
          "key": "recordId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "e68586bd-1a5c-4bbe-9caa-2cbdb5319c90",
          "key": "cellHistoryRedactionId",
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
const executeFunction = async ({ baseId, tableIdOrName, recordId, cellHistoryRedactionId }) => {
  return executeRequest(requestDefinition, { baseId, tableIdOrName, recordId, cellHistoryRedactionId }, collectionVariables);
};

/**
 * Tool definition for Delete cell history redaction
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_cell_history_redaction',
      description: 'Deletes a cell history redaction to reveal previous cell history. Requires env vars: base_url, personal_access_token',
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
          },
          'cellHistoryRedactionId': {
            type: 'string',
            description: 'The cellHistoryRedactionId parameter'
          }
        },
        required: ['baseId', 'tableIdOrName', 'recordId', 'cellHistoryRedactionId']
      }
    }
  }
};
