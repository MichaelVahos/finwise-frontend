import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing-page.component').then((m) => m.LandingPageComponent),
    canActivate: [guestGuard]
  },
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
    canActivate: [authGuard]
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./modules/transactions/transactions.routes').then((m) => m.TRANSACTIONS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./modules/reports/reports.routes').then((m) => m.REPORTS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'resumen-mensual',
    loadComponent: () =>
      import('./modules/reports/pages/resumen-mensual.component')
        .then((m) => m.ResumenMensualComponent),
    canActivate: [authGuard]
  },
  {
    path: 'ia',
    loadChildren: () =>
      import('./modules/ia/pages/ia.routes').then(m => m.IA_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'unauthorized',
    loadComponent: () => 
      import('./modules/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  {
    path: '**',
    redirectTo: '',
  }
];
