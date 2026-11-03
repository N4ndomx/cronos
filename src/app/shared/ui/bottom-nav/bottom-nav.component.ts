import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavTab {
  readonly path: string;
  readonly label: string;
  readonly icon: string;
}

const NAV_TABS: readonly NavTab[] = [
  { path: '/sessions', label: 'Sesiones', icon: 'grid_view' },
  { path: '/cash', label: 'Caja', icon: 'point_of_sale' },
  { path: '/management', label: 'Gestión', icon: 'table_restaurant' },
  { path: '/settings', label: 'Configuración', icon: 'settings' },
];

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav" aria-label="Navegación principal">
      <div class="bottom-nav-inner">
        @for (tab of tabs; track tab.path) {
          <a
            class="nav-item"
            [routerLink]="tab.path"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            ariaCurrentWhenActive="page"
          >
            <span class="material-symbols-outlined">{{ tab.icon }}</span>
            <span class="nav-label">{{ tab.label }}</span>
          </a>
        }
      </div>
    </nav>
  `,
  styles: [
    `
      .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: calc(64px + env(safe-area-inset-bottom, 0px));
        padding-bottom: env(safe-area-inset-bottom, 0px);
        background-color: #ffffff;
        border-top: 1px solid #e2e8f0;
        z-index: 50;
        box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
      }

      .bottom-nav-inner {
        width: 100%;
        max-width: 600px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 12px;
      }

      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        flex: 1;
        height: 100%;
        color: #73777e;
        text-decoration: none;
        transition: color 0.15s ease;
        font-size: 11.5px;
        font-weight: 500;
        min-width: 64px;
        -webkit-tap-highlight-color: transparent;
      }

      .nav-item .material-symbols-outlined {
        font-size: 24px;
        transition: transform 0.15s ease;
      }

      .nav-item.active {
        color: #1b4332;
        font-weight: 700;
      }

      .nav-item.active .material-symbols-outlined {
        font-variation-settings: 'FILL' 1;
        transform: translateY(-1px);
      }

      .nav-label {
        line-height: 1;
        letter-spacing: -0.1px;
      }
    `,
  ],
})
export class BottomNavComponent {
  protected readonly tabs = NAV_TABS;
}
