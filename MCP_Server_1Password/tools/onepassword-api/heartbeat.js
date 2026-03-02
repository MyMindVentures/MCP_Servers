/**
 * Server heartbeat. GET /heartbeat (root of Connect host, not under /v1)
 * Uses ONEPASSWORD_CONNECT_HOST without /v1 - assume env is base like http://host:8080/v1, so we need root.
 * Many setups use same host for /v1 and /heartbeat; if host is http://host:8080/v1 we strip /v1 for heartbeat.
 * Postman executor will replace {{ONEPASSWORD_CONNECT_HOST}} from env; user can set ONEPASSWORD_CONNECT_HOST=http://host:8080
 * and we use path /v1/vaults for API. So base = host with /v1. For heartbeat we use a separate variable or same host.
 * Doc says "Server Heartbeat" at root - typically http://connect:8080/heartbeat. So base for API = http://connect:8080/v1.
 * We'll use ONEPASSWORD_CONNECT_HOST as the full base including /v1 (e.g. http://host:8080/v1). Heartbeat URL then
 * must be derived: e.g. ONEPASSWORD_CONNECT_HEARTBEAT_URL or we document that heartbeat is at base minus /v1 + /heartbeat.
 * Simplest: add optional env ONEPASSWORD_CONNECT_HEARTBEAT_URL defaulting to same as host with /v1 replaced by empty + /heartbeat.
 * For the tool we can use a collection variable that defaults to host. Actually just use request to {{ONEPASSWORD_CONNECT_HOST}}/../heartbeat
 * which is invalid. Better: use a single env ONEPASSWORD_CONNECT_HOST=http://host:8080 (no /v1), then path for API is v1/vaults,
 * path for heartbeat is heartbeat. So path ['v1','vaults'] and path ['heartbeat']. Then we need ONEPASSWORD_CONNECT_HOST to be
 * http://host:8080 without /v1. Plan said "Base URL from ONEPASSWORD_CONNECT_HOST (e.g. http://host:8080/v1)" so base includes /v1.
 * So for heartbeat we need root URL. I'll define heartbeat as GET {{ONEPASSWORD_CONNECT_HOST}}/heartbeat and document that
 * for heartbeat/health you can set ONEPASSWORD_CONNECT_HOST to the root (http://host:8080) and use path heartbeat; for API
 * the server might mount API at /v1 so base is http://host:8080/v1. So two possible env vars: ONEPASSWORD_CONNECT_HOST for API (with /v1)
 * and optionally ONEPASSWORD_CONNECT_ROOT for heartbeat (without /v1). To keep one env: use ONEPASSWORD_CONNECT_HOST=http://host:8080/v1
 * for API; for heartbeat the user could set ONEPASSWORD_CONNECT_ROOT or we use a convention: if host ends with /v1, root is host slice 0 -3.
 * In the tool we'll use a variable ONEPASSWORD_CONNECT_ROOT - in collection variables we don't have logic. So just use same host and path
 * heartbeat - if their server has heartbeat at http://host:8080/heartbeat then host must be http://host:8080 and API path is v1/vaults.
 * So: ONEPASSWORD_CONNECT_HOST = http://host:8080 (root). Path for list_vaults = v1/vaults. Path for heartbeat = heartbeat.
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Heartbeat',
  request: {
    method: 'GET',
    url: {
      raw: '{{ONEPASSWORD_CONNECT_ROOT}}/heartbeat',
      host: ['{{ONEPASSWORD_CONNECT_ROOT}}'],
      path: ['heartbeat'],
    },
    header: [{ key: 'Accept', value: 'text/plain' }],
    body: null,
  },
};

const executeFunction = async () => {
  return executeRequest(requestDefinition, {}, []);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'onepassword_heartbeat',
      description: 'Ping the 1Password Connect server (returns "." if active). Set ONEPASSWORD_CONNECT_ROOT to server root URL (e.g. http://host:8080) without /v1.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};
