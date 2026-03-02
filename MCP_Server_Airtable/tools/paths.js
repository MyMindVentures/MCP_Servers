/**
 * Tool definitions loaded by the MCP server.
 * Keep endpoints in sync with the official Airtable Web API; use as reference:
 * - https://github.com/Airtable/airtable.js (official SDK; see src/base.ts, src/table.ts, src/query.ts)
 * - https://airtable.com/developers/web/api
 * See also docs/API_REFERENCE.md.
 */
export const toolPaths = [
  'pan-mcp/airtable-web-api/meta-whoami.js',
  'pan-mcp/airtable-web-api/list-bases.js',
  'pan-mcp/airtable-web-api/create-base.js',
  'pan-mcp/airtable-web-api/get-base-schema.js',
  'pan-mcp/airtable-web-api/update-field.js',
  'pan-mcp/airtable-web-api/create-field.js',
  'pan-mcp/airtable-web-api/list-records.js',
  'pan-mcp/airtable-web-api/list-records-post.js',
  'pan-mcp/airtable-web-api/create-records.js',
  'pan-mcp/airtable-web-api/upload-attachment.js',
  'pan-mcp/airtable-web-api/delete-cell-history-redaction.js',
  'pan-mcp/airtable-web-api/update-multiple-records.js',
  'pan-mcp/airtable-web-api/redact-history.js',
  'pan-mcp/airtable-web-api/update-record.js',
  'pan-mcp/airtable-web-api/delete-multiple-records.js',
  'pan-mcp/airtable-web-api/delete-record.js',
  'pan-mcp/airtable-web-api/get-record.js',
  'pan-mcp/airtable-web-api/read-cell-history-redactions.js',
  'pan-mcp/airtable-web-api/sync-csv-data.js',
  'pan-mcp/airtable-web-api/update-table.js',
  'pan-mcp/airtable-web-api/create-table.js',
  'pan-mcp/airtable-web-api/list-views.js',
  'pan-mcp/airtable-web-api/delete-view.js',
  'pan-mcp/airtable-web-api/get-view-metadata.js',
  'pan-mcp/airtable-web-api/webhook-create.js',
  'pan-mcp/airtable-web-api/webhook-list.js',
  'pan-mcp/airtable-web-api/webhook-update.js',
  'pan-mcp/airtable-web-api/webhook-delete.js',
  'pan-mcp/airtable-web-api/webhook-list-payloads.js',
];