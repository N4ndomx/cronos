import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClubHeaderComponent } from '../club-header/club-header.component';

@Component({
  selector: 'app-placeholder-page',
  imports: [RouterLink, ClubHeaderComponent],
  template: `
    <div class="placeholder-shell">
      <app-club-header />

      <section class="placeholder-view">
        <div class="placeholder-icon">
          <span class="material-symbols-outlined">{{ icon() }}</span>
        </div>
        <h2>{{ title() }}</h2>
        <p>{{ description() }}</p>
        <a class="btn-return-home" routerLink="/sessions">Volver a Sesiones</a>
      </section>
    </div>
  `,
  styles: [
    `
      .placeholder-shell {
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
        padding: 16px 16px calc(150px + env(safe-area-inset-bottom, 0px)) 16px;
        box-sizing: border-box;
      }

      @media (min-width: 768px) {
        .placeholder-shell {
          max-width: 860px;
          padding: 24px 24px 160px 24px;
        }
      }

      @media (min-width: 1024px) {
        .placeholder-shell {
          max-width: 1040px;
        }
      }

      .placeholder-view {
        max-width: 440px;
        margin: 40px auto;
        padding: 32px 24px;
        background-color: #ffffff;
        border: 1px solid #e5e8ee;
        border-radius: 16px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
      }

      .placeholder-icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #d8f3dc;
        color: #0f5132;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .placeholder-icon .material-symbols-outlined {
        font-size: 30px;
      }

      h2 {
        font-size: 20px;
        font-weight: 700;
        color: #181c20;
      }

      p {
        font-size: 14px;
        color: #73777e;
        line-height: 1.5;
      }

      .btn-return-home {
        margin-top: 8px;
        height: 42px;
        padding: 0 20px;
        display: inline-flex;
        align-items: center;
        background-color: #1b4332;
        color: #ffffff;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: background-color 0.15s ease;
      }

      .btn-return-home:hover {
        background-color: #012d1d;
      }
    `,
  ],
})
export class PlaceholderPageComponent {
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
