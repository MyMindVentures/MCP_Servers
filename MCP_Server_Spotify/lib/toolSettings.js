import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SETTINGS_PATH = path.resolve(
  process.env.TOOL_SETTINGS_PATH ||
    path.join(__dirname, "..", "tool-settings.json")
);

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

export function getEnabledToolNames(allToolNames) {
  const names = allToolNames || [];
  if (!hasFile()) return new Set(names);
  const enabled = load();
  return enabled;
}

export function isToolEnabled(toolName, allToolNames) {
  const names = allToolNames || [];
  if (!hasFile()) return true;
  return load().has(toolName);
}

export function setEnabledToolNames(toolNames) {
  const list = Array.isArray(toolNames)
    ? toolNames.filter((x) => typeof x === "string")
    : [];
  cachedEnabled = new Set(list);
  hasSettingsFile = true;
  try {
    writeFileSync(
      SETTINGS_PATH,
      JSON.stringify({ enabled: list }, null, 2),
      "utf8"
    );
  } catch (err) {
    console.error("[toolSettings] Failed to write settings:", err.message);
  }
}

export function getEnabledList() {
  return Array.from(load());
}

