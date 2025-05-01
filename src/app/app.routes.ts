import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

// Carga diferida (lazy loading) para cada módulo
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./modules/profile/pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./modules/transactions/transactions.routes').then((m) => m.TRANSACTIONS_ROUTES),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./modules/reports/reports.routes').then((m) => m.REPORTS_ROUTES),
  },
  {
    path: 'resumen-mensual',
    loadComponent: () =>
      import('./modules/reports/pages/resumen-mensual.component')
        .then((m) => m.ResumenMensualComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard', // redirección por defecto
  },
];
