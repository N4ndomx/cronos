import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    title: 'Configuración · Club El Maestro',
    loadComponent: () =>
      import('./pages/settings-page.component').then((module) => module.SettingsPageComponent),
  },
];
