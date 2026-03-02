# Raindrop.io API reference for this MCP server

This document keeps the MCP server's tools in sync with the **Raindrop.io API**.

## Official API reference

- **[Raindrop.io API documentation](https://developer.raindrop.io/)** — Collections, raindrops, highlights, user, tags, filters, import/export, backups.

## Endpoint vs MCP tool coverage

### Covered (MCP tools)

| Official endpoint / resource | MCP tool |
|------------------------------|----------|
| Collections (list/get/create/update/delete) | `raindrop_list_collections`, `raindrop_get_collection`, `raindrop_create_collection`, `raindrop_update_collection`, `raindrop_delete_collection` |
| Raindrops (list/get/create/update/delete) | `raindrop_list_raindrops`, `raindrop_get_raindrop`, `raindrop_create_raindrop`, `raindrop_update_raindrop`, `raindrop_delete_raindrop` |
| Tags (get, rename, merge, remove) | `raindrop_get_tags`, `raindrop_rename_tag`, `raindrop_merge_tags`, `raindrop_remove_tags` |
| User | `raindrop_get_user` |
| Backups (get, create) | `raindrop_get_backups`, `raindrop_create_backup` |

### Not covered (optional / planned)

| Official endpoint / resource | Not covered |
|------------------------------|------------|
| Highlights (create/update/delete on raindrops) | Add tools if needed |
| Filters (list/create/update/delete saved filters) | Add tools if exposed in API |
| Import/Export (e.g. export collection) | Add tools if part of public API |

## Quick checklist when updating tools

- [ ] Confirm the endpoint in [Raindrop API docs](https://developer.raindrop.io/).
- [ ] Add or update the tool in `tools/raindrop-api/` and register it in `tools/paths.js`.
- [ ] Add a label and short description in `lib/toolGroups.js`.
- [ ] Update this API_REFERENCE.md table.
