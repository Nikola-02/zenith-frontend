import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGenresDashboardComponent } from './admin-genres-dashboard/admin-genres-dashboard.component';
import { AdminGenresCreateComponent } from './admin-genres-create/admin-genres-create.component';
import { AdminGenresEditComponent } from './admin-genres-edit/admin-genres-edit.component';

const routes: Routes = [
  { path: '', component: AdminGenresDashboardComponent },
  { path: 'create', component: AdminGenresCreateComponent },
  { path: ':id/edit', component: AdminGenresEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminGenresRoutingModule {}
