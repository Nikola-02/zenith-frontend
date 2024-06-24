import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTracksRoutingModule } from './admin-tracks-routing.module';
import { AdminTracksDashboardComponent } from './admin-tracks-dashboard/admin-tracks-dashboard.component';
import { AdminTracksCreateComponent } from './admin-tracks-create/admin-tracks-create.component';
import { AdminTracksUpdateComponent } from './admin-tracks-update/admin-tracks-update.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    AdminTracksDashboardComponent,
    AdminTracksCreateComponent,
    AdminTracksUpdateComponent,
  ],
  imports: [CommonModule, AdminTracksRoutingModule, SharedModule],
})
export class AdminTracksModule {}
