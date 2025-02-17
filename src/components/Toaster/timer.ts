class Timer {
  private timerId: number | null = null;
  private start: number = 0;
  private remaining: number;
  private callback: () => void;

  constructor(callback: () => void, delay: number) {
    this.callback = callback;
    this.remaining = delay;
    this.resume();
  }

  pause(): void {
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.remaining -= Date.now() - this.start;
      this.timerId = null;
    }
  }

  resume(): void {
    if (this.timerId === null) {
      this.start = Date.now();
      this.timerId = window.setTimeout(() => {
        this.callback();
        this.timerId = null;
      }, this.remaining);
    }
  }

  reset(delay: number): void {
    this.pause();
    this.remaining = delay;
    this.resume();
  }
}

export default Timer;
