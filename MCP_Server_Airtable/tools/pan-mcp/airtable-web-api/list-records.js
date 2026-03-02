/**
 * Lists records in a table, supporting filtering, sorting, and pagination. Requires env vars: personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "List records",
  "request": {
    "method": "GET",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/:baseId/:tableIdOrName?timeZone=<string>&userLocale=<string>&pageSize=<number,null>&maxRecords=<number,null>&offset=<string,null>&view=<string>&sort={\"field\":\"<string>\",\"direction\":\"<string,null>\"}&sort={\"field\":\"<string>\",\"direction\":\"<string,null>\"}&filterByFormula=<string,null>&cellFormat=<string>&fields=<string>&fields=<string>&returnFieldsByFieldId=<boolean,null>&recordMetadata=<string>&recordMetadata=<string>",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        ":baseId",
        ":tableIdOrName"
      ],
      "query": [
        {
          "key": "timeZone",
          "value": "<string>"
        },
        {
          "key": "userLocale",
          "value": "<string>"
        },
        {
          "key": "pageSize",
          "value": "<number,null>"
        },
        {
          "key": "maxRecords",
          "value": "<number,null>"
        },
        {
          "key": "offset",
          "value": "<string,null>"
        },
        {
          "key": "view",
          "value": "<string>"
        },
        {
          "key": "sort",
          "value": "{\"field\":\"<string>\",\"direction\":\"<string,null>\"}"
        },
        {
          "key": "sort",
          "value": "{\"field\":\"<string>\",\"direction\":\"<string,null>\"}"
        },
        {
          "key": "filterByFormula",
          "value": "<string,null>"
        },
        {
          "key": "cellFormat",
          "value": "<string>"
        },
        {
          "key": "fields",
          "value": "<string>"
        },
        {
          "key": "fields",
          "value": "<string>"
        },
        {
          "key": "returnFieldsByFieldId",
          "value": "<boolean,null>"
        },
        {
          "key": "recordMetadata",
          "value": "<string>"
        },
        {
          "key": "recordMetadata",
          "value": "<string>"
        }
      ],
      "variable": [
        {
          "id": "4d20f182-56c5-4368-9203-3d6f545f447e",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "70bb3f29-833e-4fef-ab10-db2e5e314364",
          "key": "tableIdOrName",
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
const executeFunction = async ({ baseId, tableIdOrName }) => {
  return executeRequest(requestDefinition, { baseId, tableIdOrName }, collectionVariables);
};

/**
 * Tool definition for List records
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_records',
      description: 'Lists records in a table, supporting filtering, sorting, and pagination. Requires env vars: personal_access_token',
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
          }
        },
        required: ['baseId', 'tableIdOrName']
      }
    }
  }
};
