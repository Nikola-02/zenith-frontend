import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTracksDashboardComponent } from './admin-tracks-dashboard/admin-tracks-dashboard.component';
import { AdminTracksCreateComponent } from './admin-tracks-create/admin-tracks-create.component';
import { AdminTracksUpdateComponent } from './admin-tracks-update/admin-tracks-update.component';

const routes: Routes = [
  { path: '', component: AdminTracksDashboardComponent },
  { path: 'create', component: AdminTracksCreateComponent },
  { path: ':id/edit', component: AdminTracksUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTracksRoutingModule {}
