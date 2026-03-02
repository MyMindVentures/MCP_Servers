/**
 * Lists records via POST (for long filter/sort params to avoid URL length limits).
 * Uses Airtable's POST listRecords endpoint. Requires env: personal_access_token.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

const defaultBody = JSON.stringify({
  filterByFormula: '',
  sort: [],
  pageSize: 100,
  maxRecords: null,
  offset: null,
  view: null,
  cellFormat: 'json',
  fields: [],
  returnFieldsByFieldId: false,
  recordMetadata: [],
});

const requestDefinition = {
  name: 'List records (POST)',
  request: {
    method: 'POST',
    url: {
      raw: '{{pan_mcp_base_url}}/v0/:baseId/:tableIdOrName/listRecords',
      host: ['{{pan_mcp_base_url}}'],
      path: ['v0', ':baseId', ':tableIdOrName', 'listRecords'],
      variable: [
        { key: 'baseId', value: '<string>', description: 'Base ID' },
        { key: 'tableIdOrName', value: '<string>', description: 'Table ID or name' },
      ],
    },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' },
    ],
    body: {
      mode: 'raw',
      raw: '{{list_records_post_body}}',
      options: { raw: { language: 'json' } },
    },
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{pan_mcp_personal_access_token}}', type: 'string' }],
    },
  },
};

const collectionVariables = [
  { key: 'baseUrl', value: 'https://api.airtable.com' },
  { key: 'PersonalAccessToken', value: '' },
];

const executeFunction = async ({ baseId, tableIdOrName, body }) => {
  const bodyStr =
    body != null
      ? typeof body === 'string'
        ? body
        : JSON.stringify(body)
      : defaultBody;
  return executeRequest(
    requestDefinition,
    { baseId, tableIdOrName, list_records_post_body: bodyStr },
    collectionVariables
  );
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_records_post',
      description:
        'Lists records in a table via POST. Use this when you have long filter or sort parameters to avoid URL length limits. Same result as list_records but parameters go in the request body. Requires personal_access_token.',
      parameters: {
        type: 'object',
        properties: {
          baseId: { type: 'string', description: 'The Airtable base ID (e.g. from list_bases)' },
          tableIdOrName: { type: 'string', description: 'Table ID or table name' },
          body: {
            type: 'object',
            description:
              'Optional JSON body: filterByFormula, sort, pageSize, maxRecords, offset, view, cellFormat, fields, returnFieldsByFieldId, recordMetadata',
          },
        },
        required: ['baseId', 'tableIdOrName'],
      },
    },
  },
};
