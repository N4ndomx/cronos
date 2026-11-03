import { Component, inject } from '@angular/core';
import { ToastStore } from './toast.store';

@Component({
  selector: 'app-toast',
  template: `
    @if (message(); as text) {
      <div class="toast-notification" role="status" aria-live="polite">
        <span class="material-symbols-outlined">check_circle</span>
        <span>{{ text }}</span>
      </div>
    }
  `,
  styles: [
    `
      .toast-notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #1b4332;
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13.5px;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 200;
        animation: toastFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .toast-notification .material-symbols-outlined {
        color: #a5d0b9;
        font-size: 20px;
      }

      @keyframes toastFadeIn {
        from {
          opacity: 0;
          transform: translate(-50%, -15px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }
    `,
  ],
})
export class ToastComponent {
  private readonly toastStore = inject(ToastStore);

  readonly message = this.toastStore.message;
}
