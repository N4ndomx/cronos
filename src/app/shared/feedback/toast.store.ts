import { DestroyRef, inject, Injectable, signal } from '@angular/core';

const DEFAULT_DURATION_MS = 3500;

@Injectable({ providedIn: 'root' })
export class ToastStore {
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageState = signal<string | null>(null);
  private timeoutHandle: ReturnType<typeof setTimeout> | null = null;

  readonly message = this.messageState.asReadonly();

  constructor() {
    this.destroyRef.onDestroy(() => this.clearTimer());
  }

  show(message: string, durationMs: number = DEFAULT_DURATION_MS): void {
    this.clearTimer();
    this.messageState.set(message);

    this.timeoutHandle = setTimeout(() => {
      this.timeoutHandle = null;
      this.messageState.set(null);
    }, durationMs);
  }

  dismiss(): void {
    this.clearTimer();
    this.messageState.set(null);
  }

  private clearTimer(): void {
    if (this.timeoutHandle !== null) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }
}
