# MCP Server — Outlook

MCP server that exposes **Microsoft Graph (Outlook)** for mail, calendar, and contacts. Use with MCP-compatible clients (e.g. Claude Desktop, Cursor).

## Prerequisites

- Node.js v18+
- Azure AD app registration with Mail.ReadWrite, Calendars.ReadWrite, Contacts.ReadWrite (or read-only as needed)
- OAuth2 access token (delegated user or client credentials)

## Setup

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env` and set:

   ```env
   MICROSOFT_ACCESS_TOKEN=eyJ0eXAi...   # Valid OAuth2 access token for Microsoft Graph
   ```

   To obtain a token:
   - **Delegated (user)**: Use Azure AD OAuth2 flow (e.g. device code or auth code) with scopes `Mail.ReadWrite`, `Calendars.ReadWrite`, `Contacts.ReadWrite`. Store the access token (and refresh when expired).
   - **App-only**: Use client credentials flow with `MICROSOFT_TENANT_ID`, `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`; you can add a small token helper that fetches the token at startup.

   Reference: [Microsoft Graph auth](https://learn.microsoft.com/en-us/graph/auth/).

## Run

- **Streamable HTTP**: `npm start` → MCP at `http://127.0.0.1:3001/mcp`, Docs UI at `http://127.0.0.1:3001/`
- **Stdio**: `node mcpServer.js`

## Tools (Microsoft Graph)

- **Mail**: list mail folders, list/get/create/send/delete messages
- **Calendar**: list calendars, list/get/create/update/delete events
- **Contacts**: list contact folders, list/get/create/update/delete contacts

## Docker

See [DEPLOY.md](DEPLOY.md).

## List tools

```sh
node index.js tools
```
