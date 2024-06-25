import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGenresRoutingModule } from './admin-genres-routing.module';
import { AdminGenresEditComponent } from './admin-genres-edit/admin-genres-edit.component';
import { AdminGenresDashboardComponent } from './admin-genres-dashboard/admin-genres-dashboard.component';
import { AdminGenresCreateComponent } from './admin-genres-create/admin-genres-create.component';


@NgModule({
  declarations: [
    AdminGenresEditComponent,
    AdminGenresDashboardComponent,
    AdminGenresCreateComponent
  ],
  imports: [
    CommonModule,
    AdminGenresRoutingModule
  ]
})
export class AdminGenresModule { }
