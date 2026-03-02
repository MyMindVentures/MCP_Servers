/**
 * Executes 32efb9be-b13a-4e98-bfc0-b3ae6a2f6b31 API request Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Update table",
  "request": {
    "method": "PATCH",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/meta/bases/:baseId/tables/:tableIdOrName",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        "meta",
        "bases",
        ":baseId",
        "tables",
        ":tableIdOrName"
      ],
      "variable": [
        {
          "id": "81e4a02e-6dda-4192-b452-defcef7d9296",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "404321ec-da5d-4fca-8989-0d54e48676c7",
          "key": "tableIdOrName",
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
      "raw": "{\n  \"dateDependencySettings\": {\n    \"startDateFieldId\": \"<string>\",\n    \"endDateFieldId\": \"<string>\",\n    \"durationFieldId\": \"<string>\",\n    \"predecessorFieldId\": \"<string>\",\n    \"isEnabled\": \"<boolean>\",\n    \"shouldSkipWeekendsAndHolidays\": \"<boolean>\",\n    \"holidays\": [\n      \"<string>\",\n      \"<string>\"\n    ],\n    \"reschedulingMode\": \"<string>\"\n  },\n  \"description\": \"<string>\",\n  \"name\": \"<string>\"\n}",
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
const executeFunction = async ({ baseId, tableIdOrName }) => {
  return executeRequest(requestDefinition, { baseId, tableIdOrName }, collectionVariables);
};

/**
 * Tool definition for Update table
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_table',
      description: 'Executes 32efb9be-b13a-4e98-bfc0-b3ae6a2f6b31 API request Requires env vars: base_url, personal_access_token',
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
