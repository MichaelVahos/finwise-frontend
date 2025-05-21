import { Routes } from '@angular/router';
import { RegisterTransactionComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { AdminUserTransactionsComponent } from '../admin/pages/admin-user-transactions/admin-user-transactions.component';

export const TRANSACTIONS_ROUTES: Routes = [
  {
    path: 'nueva',
    component: RegisterTransactionComponent
  },
  {
    path: 'lista',
    component: ListComponent
  },
  {
    path: 'admin/:id',
    component: AdminUserTransactionsComponent
  }
];
