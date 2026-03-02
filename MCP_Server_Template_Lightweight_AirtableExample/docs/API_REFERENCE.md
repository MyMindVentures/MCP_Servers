# Airtable API reference for this MCP server

This document points to the **official Airtable API reference** so you can keep the MCP server’s tools in sync with the latest Airtable Web API.

## Primary reference: Airtable.js

**[github.com/Airtable/airtable.js](https://github.com/Airtable/airtable.js)** is the official Airtable JavaScript client. Use it as the source of truth for:

- **Endpoint paths and methods** — The SDK’s source (e.g. `src/base.ts`, `src/table.ts`, `src/query.ts`, `src/run_action.ts`) shows exactly which URLs and HTTP methods Airtable supports.
- **Parameters and request/response shapes** — Query params, body fields, and response structures match the Web API.
- **New features** — When Airtable adds or changes API behavior, it is reflected in the SDK and its [CHANGELOG](https://github.com/Airtable/airtable.js/blob/master/CHANGELOG.md).

The README links to:

- [airtable.com/developers/web/api](https://airtable.com/developers/web/api) — Web API reference (scopes, endpoints).
- [airtable.com/api](https://airtable.com/api) — Interactive docs (per base; JavaScript tab has Airtable.js examples).

## Endpoint coverage in this MCP server

Tools in `tools/pan-mcp/airtable-web-api/` map to the following Airtable API surface:

| Area | Endpoints (examples) | SDK / docs |
|------|----------------------|------------|
| **Meta** | `GET /v0/meta/whoami`, `GET /v0/meta/bases` | — (meta not in Airtable.js; see Web API docs) |
| **Base schema** | `GET /v0/meta/bases/:baseId/tables` | — |
| **Bases** | `POST /v0/meta/bases` (create base) | run_action / Web API |
| **Tables** | Create/update table (meta API) | Web API |
| **Fields** | Create/update field (meta API) | Web API |
| **Records** | `GET/POST /v0/:baseId/:tableIdOrName`, listRecords, get, create, update, delete | `table.ts`, `query.ts`, `record.ts` |
| **Attachments** | Upload attachment | Web API |
| **Views** | List views, get view metadata, delete view (meta API) | Web API |
| **Webhooks** | Create, list, update, delete webhook; list payloads | Web API (Webhooks API) |
| **History / redaction** | Redact, read/delete cell history redactions | Web API |

When adding or changing a tool, verify the **path**, **method**, and **parameters** against:

1. [Airtable/airtable.js](https://github.com/Airtable/airtable.js) (for record/table usage and URL layout), and/or  
2. [airtable.com/developers/web/api](https://airtable.com/developers/web/api) (for meta, webhooks, and other endpoints not in the SDK).

## Quick checklist when updating tools

- [ ] Confirm the endpoint path and HTTP method in Airtable.js or the Web API docs.
- [ ] Align request body and query parameters with the official reference.
- [ ] Add or update the tool in `tools/pan-mcp/airtable-web-api/` and register it in `tools/paths.js`.
- [ ] Add a label and short description in `lib/toolGroups.js` for the Manual/Settings UI.
