# Gamma API reference for this MCP server

This document keeps the MCP server's tools in sync with the **Gamma API**.

## Official API reference

- **[Gamma API documentation](https://developers.gamma.app/)** — Generations, themes, folders.  
- Base URL: `https://public-api.gamma.app/v1.0`, header: `X-API-KEY`.

## Endpoint vs MCP tool coverage

| Official endpoint / resource | MCP tool | Not covered |
|------------------------------|----------|-------------|
| POST /v1.0/generations (create) | `gamma_create_generation` | — |
| GET generation (get status/result) | `gamma_get_generation` | — |
| GET /v1.0/themes | `gamma_list_themes` | — |
| GET /v1.0/folders | `gamma_list_folders` | — |

All current public Gamma API endpoints are covered. No gaps.

## Quick checklist when updating tools

- [ ] Confirm the endpoint in [Gamma API docs](https://developers.gamma.app/).
- [ ] Add or update the tool in `tools/gamma-api/` and register it in `tools/paths.js`.
- [ ] Add a label and short description in `lib/toolGroups.js`.
- [ ] Update this API_REFERENCE.md table.
