import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTracksDashboardComponent } from './admin-tracks-dashboard/admin-tracks-dashboard.component';
import { AdminTracksCreateComponent } from './admin-tracks-create/admin-tracks-create.component';
import { AdminTracksEditComponent } from './admin-tracks-edit/admin-tracks-edit.component';

const routes: Routes = [
  { path: '', component: AdminTracksDashboardComponent },
  { path: 'create', component: AdminTracksCreateComponent },
  { path: ':id/edit', component: AdminTracksEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTracksRoutingModule {}
