import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { authGuard } from '../../guards/auth.guard';

export const TRANSACTIONS_ROUTES: Routes = [
  { path: '', component: ListComponent, canActivate: [authGuard] } 
];
