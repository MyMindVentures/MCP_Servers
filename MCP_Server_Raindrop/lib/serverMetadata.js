/**
 * Centralized server metadata for the Raindrop MCP server.
 */
import { getToolLabel, TOOL_GROUP_ORDER, TOOL_GROUP_LABELS } from "./toolGroups.js";
import * as transportSettings from "./transportSettings.js";

const PLATFORM_NAME = "MCP Server — Raindrop";
const PLATFORM_DESCRIPTION =
  "Lightweight MCP server that exposes the Raindrop.io API for collections, bookmarks (raindrops), tags, user, and backups. Use with MCP-compatible clients.";

export function getServerMetadata(tools, publicUrl, enabledToolNames) {
  const baseUrl =
    publicUrl || process.env.MCP_PUBLIC_URL || "http://127.0.0.1:3001/mcp";
  const transportMode = transportSettings.getTransportMode();
  const availableTransports = transportSettings.getAvailableModes();

  const toolList = (tools || [])
    .map((tool) => {
      const fn = tool.definition?.function;
      if (!fn?.name) return null;
      const label = getToolLabel(fn.name);
      const item = {
        id: fn.name,
        name: fn.name,
        title: label.title,
        shortDescription: label.shortDescription,
        group: label.group,
      };
      if (enabledToolNames !== undefined) {
        item.enabled = enabledToolNames.has(fn.name);
      }
      return item;
    })
    .filter(Boolean);

  const groupIds = [...TOOL_GROUP_ORDER];
  const toolGroups = groupIds
    .map((groupId) => {
      const meta =
        TOOL_GROUP_LABELS[groupId] || { title: groupId, description: "" };
      const groupTools = toolList.filter((t) => t.group === groupId);
      return {
        id: groupId,
        title: meta.title,
        description: meta.description,
        tools: groupTools,
      };
    })
    .filter((g) => g.tools.length > 0);

  return {
    name: PLATFORM_NAME,
    description: PLATFORM_DESCRIPTION,
    publicUrl: baseUrl,
    transportMode,
    availableTransports,
    toolGroups,
    tools: toolList,
  };
}
