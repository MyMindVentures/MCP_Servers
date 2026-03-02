#!/usr/bin/env node
/**
 * Script to compare MCP server tools (from tools/paths.js) with optional
 * expected endpoint lists. Run from "MCP Servers" root:
 *   node scripts/check-api-coverage.js
 *
 * For each server, reads tools/paths.js and derives tool names. If
 * docs/expected-endpoints.txt exists (one endpoint identifier per line,
 * # for comments), reports which expected endpoints have no matching tool.
 * Use this to flag new official API endpoints that need a tool.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SKIP_DIRS = new Set([
  "MCP_Server_Template",
  "MCP_Server_Template_Lightweight_AirtableExample",
]);

function getServerDirs() {
  const names = fs.readdirSync(ROOT, { withFileTypes: true });
  return names
    .filter((d) => d.isDirectory() && d.name.startsWith("MCP_Server_") && !SKIP_DIRS.has(d.name))
    .map((d) => path.join(ROOT, d.name));
}

/**
 * Extract tool path strings from tools/paths.js (export const toolPaths = [ ... ])
 */
function extractToolPathsFromPathsJs(content) {
  const match = content.match(/export\s+const\s+toolPaths\s*=\s*\[([\s\S]*?)\];/);
  if (!match) return [];
  const inner = match[1];
  const paths = [];
  const re = /['"]([^'"]+\.js)['"]/g;
  let m;
  while ((m = re.exec(inner)) !== null) {
    paths.push(m[1]);
  }
  return paths;
}

/**
 * Derive a short tool id from path (e.g. "github-api/repos_list.js" -> "repos_list")
 */
function pathToToolId(p) {
  const base = path.basename(p, ".js");
  return base.replace(/-/g, "_");
}

function getToolIds(serverDir) {
  const pathsFile = path.join(serverDir, "tools", "paths.js");
  if (!fs.existsSync(pathsFile)) return { toolIds: [], paths: [] };
  const content = fs.readFileSync(pathsFile, "utf8");
  const paths = extractToolPathsFromPathsJs(content);
  const toolIds = paths.map(pathToToolId);
  return { toolIds, paths };
}

function getExpectedEndpoints(serverDir) {
  const file = path.join(serverDir, "docs", "expected-endpoints.txt");
  if (!fs.existsSync(file)) return null;
  const content = fs.readFileSync(file, "utf8");
  return content
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, "").trim())
    .filter(Boolean);
}

/**
 * Normalize for fuzzy match: lowercase, collapse underscores/dashes.
 */
function normalize(s) {
  return s.toLowerCase().replace(/[-_\s]+/g, "_");
}

function findMissingExpected(expected, toolIds) {
  const normalizedTools = new Set(toolIds.map(normalize));
  return expected.filter((e) => {
    const n = normalize(e);
    if (normalizedTools.has(n)) return false;
    const withoutPrefix = n.replace(/^(github_|clickup_|outlook_|notion_|raindrop_|onepassword_|gamma_)/, "");
    return !toolIds.some((t) => normalize(t) === n || normalize(t).endsWith(withoutPrefix));
  });
}

function main() {
  const serverDirs = getServerDirs();
  const lines = ["# API coverage check (tools vs expected endpoints)", ""];

  for (const serverDir of serverDirs) {
    const serverName = path.basename(serverDir);
    const { toolIds, paths } = getToolIds(serverDir);
    const expected = getExpectedEndpoints(serverDir);

    lines.push(`## ${serverName}`);
    lines.push(`- Tools in paths.js: **${toolIds.length}**`);
    if (paths.length > 0 && paths.length <= 10) {
      lines.push(`- Tool paths: ${paths.join(", ")}`);
    } else if (paths.length > 10) {
      lines.push(`- Tool paths: ${paths.slice(0, 5).join(", ")} ... +${paths.length - 5} more`);
    }
    lines.push("");

    if (expected) {
      const missing = findMissingExpected(expected, toolIds);
      if (missing.length > 0) {
        lines.push(`- **Missing tools for expected endpoints (${missing.length}):**`);
        missing.forEach((e) => lines.push(`  - ${e}`));
        lines.push("");
      } else {
        lines.push("- All expected endpoints have a corresponding tool.");
        lines.push("");
      }
    } else {
      lines.push("- No `docs/expected-endpoints.txt`; add one to track gaps (one endpoint id per line).");
      lines.push("");
    }
  }

  const report = lines.join("\n");
  console.log(report);

  const reportPath = path.join(ROOT, "docs", "API_COVERAGE_REPORT.md");
  const docsDir = path.join(ROOT, "docs");
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(reportPath, report, "utf8");
  console.log(`\nReport written to ${reportPath}`);
}

main();
