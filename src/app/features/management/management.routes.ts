import { Routes } from '@angular/router';

export const MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    title: 'Gestión · Club El Maestro',
    loadComponent: () =>
      import('./pages/management-page.component').then((module) => module.ManagementPageComponent),
  },
];
