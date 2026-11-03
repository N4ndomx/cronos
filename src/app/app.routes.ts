import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sessions',
  },
  {
    path: 'sessions',
    loadChildren: () =>
      import('./features/sessions/sessions.routes').then((module) => module.SESSIONS_ROUTES),
  },
  {
    path: 'cash',
    loadChildren: () => import('./features/cash/cash.routes').then((module) => module.CASH_ROUTES),
  },
  {
    path: 'management',
    loadChildren: () =>
      import('./features/management/management.routes').then((module) => module.MANAGEMENT_ROUTES),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings/settings.routes').then((module) => module.SETTINGS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'sessions',
  },
];
