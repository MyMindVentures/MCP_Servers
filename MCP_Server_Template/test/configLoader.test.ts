import { describe, it, expect } from "vitest";
import { loadConfig } from "../src/config/loader.js";

describe("config loader", () => {
  it("loads default config without error", async () => {
    const cfg = await loadConfig();
    expect(cfg.appName).toBeDefined();
    expect(cfg.baseUrl).toMatch(/^https?:\/\//);
  });
});

