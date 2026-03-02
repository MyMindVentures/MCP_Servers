interface CircuitState {
  failures: number;
  lastFailureAt: number;
  open: boolean;
}

export class CircuitBreaker {
  private readonly states = new Map<string, CircuitState>();

  constructor(
    private readonly errorThreshold: number,
    private readonly resetMs: number,
  ) {}

  async execute<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const state = this.states.get(key);

    if (state?.open && now - state.lastFailureAt < this.resetMs) {
      throw new Error(`Circuit breaker open for ${key}`);
    }

    try {
      const result = await fn();
      this.recordSuccess(key);
      return result;
    } catch (err) {
      this.recordFailure(key);
      throw err;
    }
  }

  private recordSuccess(key: string) {
    this.states.set(key, { failures: 0, lastFailureAt: Date.now(), open: false });
  }

  private recordFailure(key: string) {
    const now = Date.now();
    const state = this.states.get(key) ?? { failures: 0, lastFailureAt: now, open: false };
    state.failures += 1;
    state.lastFailureAt = now;
    if (state.failures >= this.errorThreshold) {
      state.open = true;
    }
    this.states.set(key, state);
  }
}

