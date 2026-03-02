# Microsoft Graph (Outlook) API reference for this MCP server

This document keeps the MCP server's tools in sync with the **Microsoft Graph API** for Mail, Calendar, and Contacts (Outlook).

## Official API reference

- **[Microsoft Graph API overview](https://learn.microsoft.com/en-us/graph/api/overview)** — Full reference.  
- **[Mail API](https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview)**, **[Calendar](https://learn.microsoft.com/en-us/graph/api/resources/calendar)**, **[Contacts](https://learn.microsoft.com/en-us/graph/api/resources/contacts)** — Resource docs.

## Endpoint vs MCP tool coverage

### Covered (MCP tools)

| Official endpoint / resource | MCP tool |
|------------------------------|----------|
| Mail folders (list) | `outlook_list_mail_folders` |
| Messages (list/get/create/send/delete) | `outlook_list_messages`, `outlook_get_message`, `outlook_create_message`, `outlook_send_message`, `outlook_delete_message` |
| Calendars (list) | `outlook_list_calendars` |
| Events (list/get/create/update/delete) | `outlook_list_events`, `outlook_get_event`, `outlook_create_event`, `outlook_update_event`, `outlook_delete_event` |
| Contact folders (list) | `outlook_list_contact_folders` |
| Contacts (list/get/create/update/delete) | `outlook_list_contacts`, `outlook_get_contact`, `outlook_create_contact`, `outlook_update_contact`, `outlook_delete_contact` |

### Not covered (optional / planned)

| Official endpoint / resource | Not covered |
|------------------------------|------------|
| Mail: reply/replyAll/forward | Add tools if needed |
| Mail: move/copy message; mark read/unread | Add tools if needed |
| Calendar: event accept/decline/tentative | Add tools if needed |
| Calendar: calendar view (events in range); create/update/delete calendar | Add tools if needed |
| Contact folder create/update/delete | Add tools if needed |
| Graph batch endpoint | Optional single "batch" tool |

## Quick checklist when updating tools

- [ ] Confirm the endpoint in [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/api/overview).
- [ ] Add or update the tool in `tools/outlook-api/` and register it in `tools/paths.js`.
- [ ] Add a label and short description in `lib/toolGroups.js`.
- [ ] Update this API_REFERENCE.md table.
