import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DASHBOARD_ROUTES } from './dashboard.routes';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    MainComponent
  ]
})
export class DashboardModule {}
