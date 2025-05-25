import { Routes } from '@angular/router';
import { IaSugerenciasComponent } from './ia-sugerencias.component';
import { IaHistorialComponent } from './ia-historial.component';
import { authGuard } from '../../../guards/auth.guard';

export const IA_ROUTES: Routes = [
  {
    path: 'sugerencias',
    component: IaSugerenciasComponent
  },
  {
    path: 'historial',
    component: IaHistorialComponent
  }
];
