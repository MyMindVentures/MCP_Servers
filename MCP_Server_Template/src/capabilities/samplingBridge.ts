import type { SamplingRequest } from "./types.js";

export interface SamplingBridge {
  requestSampling(request: SamplingRequest): Promise<void>;
}

/**
 * Minimal no-op implementation: records intent but does not call a client.
 * This can be extended later to integrate with a real client-side sampler.
 */
export class NoopSamplingBridge implements SamplingBridge {
  async requestSampling(_request: SamplingRequest): Promise<void> {
    return;
  }
}

