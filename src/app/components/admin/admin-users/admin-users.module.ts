import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUsersEditComponent } from './admin-users-edit/admin-users-edit.component';
import { AdminUsersDashboardComponent } from './admin-users-dashboard/admin-users-dashboard.component';
import { AdminUsersCreateComponent } from './admin-users-create/admin-users-create.component';


@NgModule({
  declarations: [
    AdminUsersEditComponent,
    AdminUsersDashboardComponent,
    AdminUsersCreateComponent
  ],
  imports: [
    CommonModule,
    AdminUsersRoutingModule
  ]
})
export class AdminUsersModule { }
