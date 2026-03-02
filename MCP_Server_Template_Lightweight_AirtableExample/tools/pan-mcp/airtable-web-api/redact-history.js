/**
 * Executes 794e366e-7bbb-456f-9357-ae6cdfe9ec66 API request Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Redact history",
  "request": {
    "method": "POST",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/:baseId/:tableIdOrName/:recordId/redactions",
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
      "variable": [
        {
          "id": "7fcfb133-497f-41bf-a07c-810eddf0c7a6",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "db5b5e59-3b94-48a2-9bea-baca05ac93c2",
          "key": "tableIdOrName",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "de0c32c9-26ad-4b4d-9f4e-cb1cad6def9f",
          "key": "recordId",
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
      "raw": "{\n  \"tableId\": \"<string>\",\n  \"fields\": {\n    \"key_0\": {},\n    \"key_1\": {},\n    \"key_2\": {},\n    \"key_3\": {}\n  },\n  \"options\": {\n    \"shouldDeleteSuppliedAttachments\": \"<boolean>\"\n  }\n}",
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
const executeFunction = async ({ baseId, tableIdOrName, recordId }) => {
  return executeRequest(requestDefinition, { baseId, tableIdOrName, recordId }, collectionVariables);
};

/**
 * Tool definition for Redact history
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'redact_history',
      description: 'Executes 794e366e-7bbb-456f-9357-ae6cdfe9ec66 API request Requires env vars: base_url, personal_access_token',
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
