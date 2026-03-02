import type { AppConfig } from "../config/types.js";

const PRIVATE_IP_RANGES = [
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^127\./,
  /^0\./,
];

export function assertAllowedUpstream(url: URL, config: AppConfig): void {
  const host = url.hostname;

  if (!config.security.allowedUpstreamHosts.includes(host)) {
    throw new Error(`Upstream host not allowed: ${host}`);
  }

  if (isPrivateIp(host)) {
    throw new Error(`Private IPs are not allowed for upstream calls: ${host}`);
  }
}

function isPrivateIp(host: string): boolean {
  if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    return false;
  }

  return PRIVATE_IP_RANGES.some((re) => re.test(host));
}

