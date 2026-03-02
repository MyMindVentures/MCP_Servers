/**
 * Uploads an attachment to a record's attachment field. Requires env vars: base_url, personal_access_token
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Upload attachment",
  "request": {
    "method": "POST",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v0/:baseId/:recordId/:attachmentFieldIdOrName/uploadAttachment",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v0",
        ":baseId",
        ":recordId",
        ":attachmentFieldIdOrName",
        "uploadAttachment"
      ],
      "variable": [
        {
          "id": "15cdf428-d64b-4287-8317-94f56d9924e1",
          "key": "baseId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "52d19445-0b7c-4847-a425-98963130f7be",
          "key": "recordId",
          "value": "<string>",
          "description": "(Required) "
        },
        {
          "id": "68ac2ffb-f235-4c31-aece-d05ff4608438",
          "key": "attachmentFieldIdOrName",
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
      "raw": "{\n  \"file\": \"<string>\",\n  \"filename\": \"<string>\",\n  \"contentType\": \"<string>\"\n}",
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
const executeFunction = async ({ baseId, recordId, attachmentFieldIdOrName }) => {
  return executeRequest(requestDefinition, { baseId, recordId, attachmentFieldIdOrName }, collectionVariables);
};

/**
 * Tool definition for Upload attachment
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'upload_attachment',
      description: 'Uploads an attachment to a record\'s attachment field. Requires env vars: base_url, personal_access_token',
      parameters: {
        type: 'object',
        properties: {
          'baseId': {
            type: 'string',
            description: 'The baseId parameter'
          },
          'recordId': {
            type: 'string',
            description: 'The recordId parameter'
          },
          'attachmentFieldIdOrName': {
            type: 'string',
            description: 'The attachmentFieldIdOrName parameter'
          }
        },
        required: ['baseId', 'recordId', 'attachmentFieldIdOrName']
      }
    }
  }
};
