# 1Password Connect API reference for this MCP server

This document keeps the MCP server's tools in sync with the **1Password Connect Server API**.

## Official API reference

- **[1Password Connect Server API reference](https://developer.1password.com/docs/connect/api-reference/)** — Full endpoint list (v1.8.1).  
- **[API specification (YAML)](https://i.1password.com/media/1password-connect/1password-connect-api_1.8.1.yaml)** — Downloadable for tooling.

## Endpoint vs MCP tool coverage

| Official endpoint / resource | MCP tool | Not covered |
|------------------------------|----------|-------------|
| List vaults | `onepassword_list_vaults` | — |
| Get vault details | `onepassword_get_vault` | — |
| List items | `onepassword_list_items` | — |
| Get item details | `onepassword_get_item` | — |
| Add item | `onepassword_create_item` | — |
| Replace item | `onepassword_replace_item` | — |
| Update item (subset of attributes) | `onepassword_update_item` | — |
| Delete item | `onepassword_delete_item` | — |
| List files | `onepassword_list_files` | — |
| Get file details | `onepassword_get_file` | — |
| Get file content | `onepassword_get_file_content` | — |
| List API activity | `onepassword_list_activity` | — |
| Server heartbeat | `onepassword_heartbeat` | — |
| Server health | `onepassword_health` | — |
| Metrics (Prometheus) | — | **Optional**: Add `onepassword_metrics` for full parity if needed. |

All core Connect endpoints (vaults, items, files, activity, heartbeat, health) are covered. The only optional gap is **Metrics** (Prometheus); document as "server health only, no Prometheus metrics" if you do not add it.

## Quick checklist when updating tools

- [ ] Confirm the endpoint in [Connect API reference](https://developer.1password.com/docs/connect/api-reference/).
- [ ] Add or update the tool in `tools/onepassword-api/` and register it in `tools/paths.js`.
- [ ] Add a label and short description in `lib/toolGroups.js`.
- [ ] Update this API_REFERENCE.md table.
