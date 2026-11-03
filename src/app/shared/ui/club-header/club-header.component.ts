import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-club-header',
  template: `
    <header class="club-header">
      <div class="club-brand">
        <div class="club-logo-badge" aria-hidden="true">
          <svg viewBox="0 0 36 36" class="club-crest-svg" fill="none">
            <circle cx="18" cy="18" r="16" fill="#1b4332" stroke="#d4af37" stroke-width="1.5" />
            <circle cx="18" cy="18" r="12" fill="#012d1d" />
            <!-- Billiard balls and crown/cue emblem -->
            <circle cx="18" cy="16" r="4" fill="#ffffff" />
            <text
              x="18"
              y="17.5"
              font-size="5"
              font-family="Inter, sans-serif"
              font-weight="900"
              fill="#181c20"
              text-anchor="middle"
              dominant-baseline="central"
            >
              8
            </text>
            <path d="M12 25L24 25" stroke="#d4af37" stroke-width="1.5" stroke-linecap="round" />
            <path
              d="M14 22L18 20L22 22"
              stroke="#d4af37"
              stroke-width="1.2"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1 class="club-title">{{ clubName() }}</h1>
      </div>
    </header>
  `,
  styles: [
    `
      .club-header {
        margin-bottom: 14px;
      }

      .club-brand {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .club-logo-badge {
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .club-crest-svg {
        width: 38px;
        height: 38px;
      }

      .club-title {
        font-size: 18px;
        font-weight: 800;
        letter-spacing: -0.3px;
        color: #181c20;
        text-transform: uppercase;
      }
    `,
  ],
})
export class ClubHeaderComponent {
  readonly clubName = signal('Cronos');
}
