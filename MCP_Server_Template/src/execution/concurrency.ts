export class Semaphore {
  private current = 0;
  private readonly queue: (() => void)[] = [];

  constructor(private readonly max: number) {}

  async acquire(): Promise<void> {
    if (this.current < this.max) {
      this.current += 1;
      return;
    }

    await new Promise<void>((resolve) => {
      this.queue.push(() => {
        this.current += 1;
        resolve();
      });
    });
  }

  release() {
    this.current = Math.max(0, this.current - 1);
    const next = this.queue.shift();
    if (next) next();
  }
}

