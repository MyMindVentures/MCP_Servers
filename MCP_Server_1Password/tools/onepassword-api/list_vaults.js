/**
 * List vaults. GET /v1/vaults
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'List vaults',
  request: {
    method: 'GET',
    url: {
      raw: '{{ONEPASSWORD_CONNECT_HOST}}/vaults?filter={{filter}}',
      host: ['{{ONEPASSWORD_CONNECT_HOST}}'],
      path: ['vaults'],
      query: [{ key: 'filter', value: '{{filter}}' }],
    },
    header: [
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer {{ONEPASSWORD_CONNECT_TOKEN}}' },
    ],
    body: null,
  },
};

const executeFunction = async ({ filter } = {}) => {
  return executeRequest(requestDefinition, { filter: filter ?? '' }, []);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_list_vaults',
      description: 'List 1Password vaults. Optional SCIM filter by name.',
      parameters: {
        type: 'object',
        properties: { filter: { type: 'string', description: 'e.g. name eq "Demo Vault"' } },
        required: [],
      },
    },
  },
};
