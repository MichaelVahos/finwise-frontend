import { Routes } from '@angular/router';
import { CategoriasGraficoComponent } from '../reports/pages/categorias-grafico.component';
import { ResumenMensualComponent } from './pages/resumen-mensual.component';  
import { authGuard } from '../../guards/auth.guard';

export const REPORTS_ROUTES: Routes = [
  {
    path: 'resumen-mensual',
    component: ResumenMensualComponent
  },
  {
    path: 'categorias',
    component: CategoriasGraficoComponent
  }
];
