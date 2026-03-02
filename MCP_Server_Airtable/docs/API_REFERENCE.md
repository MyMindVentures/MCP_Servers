# Airtable API reference for this MCP server

This document keeps the MCP server's tools in sync with the **official Airtable Web API**.

## Official API references

- **[Airtable Web API](https://airtable.com/developers/web/api)** — Scopes, endpoints, meta API, webhooks.
- **[Airtable.js SDK](https://github.com/Airtable/airtable.js)** — Source of truth for record/table URLs and `run_action`; see `src/base.ts`, `src/table.ts`, `src/query.ts`, `src/run_action.ts`, [CHANGELOG](https://github.com/Airtable/airtable.js/blob/master/CHANGELOG.md).
- **[Interactive API docs](https://airtable.com/api)** — Per-base docs (JavaScript tab has Airtable.js examples).

## Endpoint vs MCP tool coverage

| Official endpoint / resource | MCP tool | Not covered |
|------------------------------|----------|-------------|
| `GET /v0/meta/whoami` | `meta_whoami` | — |
| `GET /v0/meta/bases` | `list_bases` | — |
| `POST /v0/meta/bases` (create base, run_action) | `create_base` | — |
| `GET /v0/meta/bases/:baseId/tables` | `get_base_schema` | — |
| Create / update table (meta API) | `create_table`, `update_table` | — |
| Create / update field (meta API) | `create_field`, `update_field` | — |
| List records (GET or POST) | `list_records`, `list_records_post` | — |
| Get / create / update / delete record(s) | `get_record`, `create_records`, `update_record`, `update_multiple_records`, `delete_record`, `delete_multiple_records` | — |
| Upload attachment | `upload_attachment` | — |
| Sync CSV data | `sync_csv_data` | — |
| List views, get view metadata, delete view | `list_views`, `get_view_metadata`, `delete_view` | — |
| Webhooks: create, list, update, delete, list payloads | `webhook-create`, `webhook-list`, `webhook-update`, `webhook-delete`, `webhook-list-payloads` | — |
| Redact history; read/delete cell history redactions | `redact_history`, `read_cell_history_redactions`, `delete_cell_history_redaction` | — |
| Create view (meta API) | — | **Optional**: Verify at [airtable.com/developers/web/api](https://airtable.com/developers/web/api); add tool if supported. |
| Other run_action endpoints (beyond create base) | — | **Optional**: Airtable.js `run_action` may expose more; add tools as needed. |

## Gaps and verification notes

- **Create view**: The official Web API may allow creating views via the meta API. Confirm at [airtable.com/developers/web/api](https://airtable.com/developers/web/api); if supported, add a `create_view` tool and register it in `tools/paths.js` and `lib/toolGroups.js`.
- **Run action**: The SDK’s `run_action` is used for “create base”. If the Web API exposes additional run-action operations, add corresponding tools and keep this table updated.
- When adding or changing a tool, verify path, method, and parameters against Airtable.js and/or the Web API docs, then add the tool under `tools/pan-mcp/airtable-web-api/`, register in `tools/paths.js`, and add a label in `lib/toolGroups.js`.

## Quick checklist when updating tools

- [ ] Confirm the endpoint path and HTTP method in Airtable.js or the Web API docs.
- [ ] Align request body and query parameters with the official reference.
- [ ] Add or update the tool in `tools/pan-mcp/airtable-web-api/` and register it in `tools/paths.js`.
- [ ] Add a label and short description in `lib/toolGroups.js` for the Manual/Settings UI.
- [ ] Update this API_REFERENCE.md endpoint table.
