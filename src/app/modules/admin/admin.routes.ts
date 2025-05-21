import { Routes } from '@angular/router';
import { AdminUsersComponent } from './pages/admin.component';
import { RoleGuard } from '../../guards/role.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'usuarios',
    component: AdminUsersComponent,
    canActivate: [RoleGuard],
    data: { role: 'ROLE_ADMIN' } 
  },
];
