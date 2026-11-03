import { Routes } from '@angular/router';

export const SESSIONS_ROUTES: Routes = [
  {
    path: '',
    title: 'Cronos',
    loadComponent: () =>
      import('./pages/game-sessions-page/game-sessions-page.component').then(
        (module) => module.GameSessionsPageComponent,
      ),
    children: [
      {
        path: 'new',
        title: 'Abrir sesión',
        loadComponent: () =>
          import('./pages/open-session-wizard/open-session-wizard.component').then(
            (module) => module.OpenSessionWizardComponent,
          ),
      },
    ],
  },
];
