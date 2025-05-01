import { Routes } from '@angular/router';
import { MonthlyComponent } from './monthly/monthly.component';
import { CategoriasGraficoComponent } from '../reports/pages/categorias-grafico.component';
import { authGuard } from '../../guards/auth.guard';

export const REPORTS_ROUTES: Routes = [
  {
    path: '',
    component: MonthlyComponent,
    canActivate: [authGuard]
  },
  {
    path: 'categorias',
    component: CategoriasGraficoComponent,
    canActivate: [authGuard]
  }
];
