# ClickUp API reference for this MCP server

This document keeps the MCP server's tools in sync with the **ClickUp API v2**.

## Official API reference

- **[ClickUp API v2](https://developer.clickup.com/)** — Tasks, comments, custom fields, attachments, spaces/folders/lists, views, goals, docs, members, time tracking, webhooks, teams.
- **[OpenAPI specification](https://developer.clickup.com/docs/open-api-spec)** — Machine-readable endpoint list.
- **[Postman collection](https://developer.clickup.com/docs/postman)** — For testing.

## Endpoint vs MCP tool coverage

### Covered (MCP tools)

| Official endpoint / resource | MCP tool |
|------------------------------|----------|
| Authorized teams, get team | `clickup_get_authorized_teams`, `clickup_get_team` |
| Spaces, folders, lists | `clickup_get_spaces`, `clickup_get_folders`, `clickup_get_lists`, `clickup_get_list` |
| Tasks (get, list, create, update, delete) | `clickup_get_tasks`, `clickup_get_task`, `clickup_create_task`, `clickup_update_task`, `clickup_delete_task` |
| Goals | `clickup_get_goals`, `clickup_get_goal` |
| Team / list views | `clickup_get_team_views`, `clickup_get_list_views` |
| Custom fields | `clickup_get_custom_fields` |
| Time entries (get, create) | `clickup_get_time_entries`, `clickup_create_time_entry` |
| Webhooks (get, create, delete) | `clickup_get_webhooks`, `clickup_create_webhook`, `clickup_delete_webhook` |
| Authorized members | `clickup_get_authorized_members` |

### Not covered (optional / planned)

| Official endpoint / resource | Not covered |
|------------------------------|------------|
| Task comments (list/create/update/delete) | Add tools if needed |
| Attachments (list/create/delete on tasks) | Add tools if needed |
| Docs (list/get/create/update/delete if in v2) | Add tools if needed |
| Views: create/update/delete | Confirm in API; add tools if supported |
| Custom task types / Roles / User groups | Add tools if exposed in API |
| Update webhook | Add tool if supported |

Validate against the [ClickUp OpenAPI spec](https://developer.clickup.com/docs/open-api-spec) or Postman collection for the exact endpoint list when adding tools.

## Quick checklist when updating tools

- [ ] Confirm the endpoint in [ClickUp API docs](https://developer.clickup.com/) or OpenAPI spec.
- [ ] Add or update the tool in `tools/clickup-api/` and register it in `tools/paths.js`.
- [ ] Add a label and short description in `lib/toolGroups.js`.
- [ ] Update this API_REFERENCE.md table.
