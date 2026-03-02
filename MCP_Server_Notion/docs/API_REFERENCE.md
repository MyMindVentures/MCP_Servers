# Notion API reference for this MCP server

This document keeps the MCP server's tools in sync with the **Notion API**.

## Official API reference

- **[Notion API Reference](https://developers.notion.com/reference)** — Full endpoint and object reference.  
- **[Documentation index (llms.txt)](https://developers.notion.com/llms.txt)** — Discover all pages.  
- **[Working with files and media](https://developers.notion.com/guides/data-apis/working-with-files-and-media)** — File upload flow.  
- **[Webhooks](https://developers.notion.com/reference/webhooks)** — Event subscriptions.

## Endpoint vs MCP tool coverage

### Covered (MCP tools)

| Official endpoint / resource | MCP tool |
|------------------------------|----------|
| List users, retrieve user | `notion_list_users`, `notion_retrieve_user` |
| Retrieve bot (self) | `notion_retrieve_bot` |
| Retrieve / update / create / archive page | `notion_retrieve_page`, `notion_update_page`, `notion_create_page`, `notion_archive_page` |
| Retrieve / update / create database | `notion_retrieve_database`, `notion_update_database`, `notion_create_database` |
| Query database | `notion_query_database` |
| Retrieve block, get/append/update/delete block children | `notion_retrieve_block`, `notion_get_block_children`, `notion_append_block_children`, `notion_update_block`, `notion_delete_block` |
| List / create / retrieve comment | `notion_list_comments`, `notion_create_comment`, `notion_retrieve_comment` |
| Search | `notion_search` |
| Retrieve page property | `notion_retrieve_page_property` |

### Not covered (optional / planned)

| Official endpoint / resource | Not covered |
|------------------------------|------------|
| File upload: create, send (parts), complete; list uploads; retrieve upload | Add tools per [Working with files and media](https://developers.notion.com/guides/data-apis/working-with-files-and-media) |
| Move page | Add tool per [Move a page](https://developers.notion.com/reference/move-page) |
| Data sources (API 2025-09-03+): create/retrieve/update, list templates, query/filter/sort | Add or alias tools if targeting new version |
| Retrieve page as markdown; update page content as markdown | Add tools for enhanced markdown endpoints |
| Webhooks: create/update/delete subscription | Add tools per [Webhooks](https://developers.notion.com/reference/webhooks) |
| Token lifecycle (create/refresh/revoke/introspect) | Usually out of scope for MCP; add only if needed for admin |

## Quick checklist when updating tools

- [ ] Confirm the endpoint in [Notion API Reference](https://developers.notion.com/reference).
- [ ] Add or update the tool in `tools/notion-api/` and register it in `tools/paths.js`.
- [ ] Add a label and short description in `lib/toolGroups.js`.
- [ ] Update this API_REFERENCE.md table.
