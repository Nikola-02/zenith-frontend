import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
