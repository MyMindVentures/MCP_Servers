# API coverage check (tools vs expected endpoints)

## MCP_Server_1Password
- Tools in paths.js: **14**
- Tool paths: onepassword-api/list_vaults.js, onepassword-api/get_vault.js, onepassword-api/list_items.js, onepassword-api/get_item.js, onepassword-api/create_item.js ... +9 more

- All expected endpoints have a corresponding tool.

## MCP_Server_Airtable
- Tools in paths.js: **29**
- Tool paths: pan-mcp/airtable-web-api/meta-whoami.js, pan-mcp/airtable-web-api/list-bases.js, pan-mcp/airtable-web-api/create-base.js, pan-mcp/airtable-web-api/get-base-schema.js, pan-mcp/airtable-web-api/update-field.js ... +24 more

- No `docs/expected-endpoints.txt`; add one to track gaps (one endpoint id per line).

## MCP_Server_ClickUp
- Tools in paths.js: **22**
- Tool paths: clickup-api/get_authorized_teams.js, clickup-api/get_team.js, clickup-api/get_spaces.js, clickup-api/get_folders.js, clickup-api/get_lists.js ... +17 more

- No `docs/expected-endpoints.txt`; add one to track gaps (one endpoint id per line).

## MCP_Server_GammaAI
- Tools in paths.js: **4**
- Tool paths: gamma-api/create_generation.js, gamma-api/get_generation.js, gamma-api/list_themes.js, gamma-api/list_folders.js

- No `docs/expected-endpoints.txt`; add one to track gaps (one endpoint id per line).

## MCP_Server_GitHub
- Tools in paths.js: **31**
- Tool paths: github-api/meta.js, github-api/rate_limit.js, github-api/user.js, github-api/user_get.js, github-api/repos_list.js ... +26 more

- No `docs/expected-endpoints.txt`; add one to track gaps (one endpoint id per line).

## MCP_Server_Notion
- Tools in paths.js: **21**
- Tool paths: notion-api/list_users.js, notion-api/retrieve_user.js, notion-api/retrieve_bot.js, notion-api/retrieve_page.js, notion-api/update_page.js ... +16 more

- No `docs/expected-endpoints.txt`; add one to track gaps (one endpoint id per line).

## MCP_Server_Outlook
- Tools in paths.js: **18**
- Tool paths: outlook-api/list_mail_folders.js, outlook-api/list_messages.js, outlook-api/get_message.js, outlook-api/create_message.js, outlook-api/send_message.js ... +13 more

- No `docs/expected-endpoints.txt`; add one to track gaps (one endpoint id per line).

## MCP_Server_Raindrop
- Tools in paths.js: **17**
- Tool paths: raindrop-api/list_collections.js, raindrop-api/get_collection.js, raindrop-api/create_collection.js, raindrop-api/update_collection.js, raindrop-api/delete_collection.js ... +12 more

- No `docs/expected-endpoints.txt`; add one to track gaps (one endpoint id per line).
