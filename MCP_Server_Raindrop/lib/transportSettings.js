import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SETTINGS_PATH = path.resolve(
  process.env.TRANSPORT_SETTINGS_PATH ||
    path.join(__dirname, "..", "transport-settings.json")
);

const ALLOWED_MODES = ["streamable-http", "sse", "stdio"];
const DEFAULT_MODE = "streamable-http";

let cachedMode = null;
let hasSettingsFile = null;

function hasFile() {
  if (hasSettingsFile === null) hasSettingsFile = existsSync(SETTINGS_PATH);
  return hasSettingsFile;
}

function loadFromFile() {
  if (!hasFile()) return null;
  try {
    const raw = readFileSync(SETTINGS_PATH, "utf8");
    const data = JSON.parse(raw);
    if (data && typeof data.mode === "string" && ALLOWED_MODES.includes(data.mode)) {
      return data.mode;
    }
    return null;
  } catch {
    return null;
  }
}

function loadEnvMode() {
  const envMode = process.env.MCP_TRANSPORT_MODE;
  if (typeof envMode === "string" && ALLOWED_MODES.includes(envMode)) {
    return envMode;
  }
  return null;
}

export function getAvailableModes() {
  return [...ALLOWED_MODES];
}

export function getTransportMode() {
  if (cachedMode !== null) return cachedMode;

  const fileMode = loadFromFile();
  if (fileMode) {
    cachedMode = fileMode;
    return cachedMode;
  }

  const envMode = loadEnvMode();
  if (envMode) {
    cachedMode = envMode;
    return cachedMode;
  }

  cachedMode = DEFAULT_MODE;
  return cachedMode;
}

export function setTransportMode(mode) {
  if (!ALLOWED_MODES.includes(mode)) {
    throw new Error(
      `Invalid transport mode: ${mode}. Expected one of: ${ALLOWED_MODES.join(", ")}`
    );
  }
  cachedMode = mode;
  hasSettingsFile = true;
  try {
    writeFileSync(
      SETTINGS_PATH,
      JSON.stringify({ mode }, null, 2),
      "utf8"
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[transportSettings] Failed to write settings:", err.message);
  }
}

