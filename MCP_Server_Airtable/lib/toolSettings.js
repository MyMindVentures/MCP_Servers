/**
 * Persists which tools are enabled. Used by the server to filter ListTools/CallTool
 * and by the Settings API for the UI.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SETTINGS_PATH = path.resolve(process.env.TOOL_SETTINGS_PATH || path.join(__dirname, "..", "tool-settings.json"));

let cachedEnabled = null;
let hasSettingsFile = null;

function hasFile() {
  if (hasSettingsFile === null) hasSettingsFile = existsSync(SETTINGS_PATH);
  return hasSettingsFile;
}

function load() {
  if (cachedEnabled !== null) return cachedEnabled;
  if (!hasFile()) {
    cachedEnabled = new Set();
    return cachedEnabled;
  }
  try {
    const raw = readFileSync(SETTINGS_PATH, "utf8");
    const data = JSON.parse(raw);
    const list = Array.isArray(data.enabled) ? data.enabled : [];
    cachedEnabled = new Set(list.filter((x) => typeof x === "string"));
    return cachedEnabled;
  } catch (_) {
    cachedEnabled = new Set();
    return cachedEnabled;
  }
}

/**
 * Returns a Set of tool names that are enabled.
 * - No settings file or invalid file: all tools enabled.
 * - File exists: only names in the file are enabled (empty array = none).
 */
export function getEnabledToolNames(allToolNames) {
  const names = allToolNames || [];
  if (!hasFile()) return new Set(names);
  const enabled = load();
  return enabled;
}

/**
 * Returns whether a tool name is enabled.
 * - No settings file: all enabled.
 * - File exists: only names in the file are enabled.
 */
export function isToolEnabled(toolName, allToolNames) {
  const names = allToolNames || [];
  if (!hasFile()) return true;
  return load().has(toolName);
}

/**
 * Set enabled tools and persist. Invalidates cache.
 * @param {string[]} toolNames - Full list of tool names that should be enabled.
 */
export function setEnabledToolNames(toolNames) {
  const list = Array.isArray(toolNames) ? toolNames.filter((x) => typeof x === "string") : [];
  cachedEnabled = new Set(list);
  hasSettingsFile = true;
  try {
    writeFileSync(SETTINGS_PATH, JSON.stringify({ enabled: list }, null, 2), "utf8");
  } catch (err) {
    console.error("[toolSettings] Failed to write settings:", err.message);
  }
}

/**
 * Get current enabled set as array (for API response). Only meaningful when settings file exists.
 */
export function getEnabledList() {
  return Array.from(load());
}
