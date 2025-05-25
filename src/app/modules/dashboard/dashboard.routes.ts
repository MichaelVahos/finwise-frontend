import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { authGuard } from '../../guards/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: MainComponent } 
];
