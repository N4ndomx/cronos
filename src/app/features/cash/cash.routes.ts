import { Routes } from '@angular/router';

export const CASH_ROUTES: Routes = [
  {
    path: '',
    title: 'Caja · Club El Maestro',
    loadComponent: () =>
      import('./pages/cash-page.component').then((module) => module.CashPageComponent),
  },
];
