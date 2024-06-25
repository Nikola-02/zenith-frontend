import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersDashboardComponent } from './admin-users-dashboard/admin-users-dashboard.component';
import { AdminUsersCreateComponent } from './admin-users-create/admin-users-create.component';
import { AdminUsersEditComponent } from './admin-users-edit/admin-users-edit.component';

const routes: Routes = [
  { path: '', component: AdminUsersDashboardComponent },
  { path: 'create', component: AdminUsersCreateComponent },
  { path: ':id/edit', component: AdminUsersEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsersRoutingModule {}
