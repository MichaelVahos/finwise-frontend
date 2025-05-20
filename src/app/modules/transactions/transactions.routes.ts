import { Routes } from '@angular/router';
import { RegisterTransactionComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

export const TRANSACTIONS_ROUTES: Routes = [
  {
    path: 'nueva',
    component: RegisterTransactionComponent
  },
  {
    path: 'lista',
    component: ListComponent
  }
];
