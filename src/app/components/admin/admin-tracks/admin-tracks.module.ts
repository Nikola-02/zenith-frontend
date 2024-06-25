import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTracksRoutingModule } from './admin-tracks-routing.module';
import { AdminTracksDashboardComponent } from './admin-tracks-dashboard/admin-tracks-dashboard.component';
import { AdminTracksCreateComponent } from './admin-tracks-create/admin-tracks-create.component';
import { SharedModule } from '../../../shared/shared.module';
import { AdminTracksEditComponent } from './admin-tracks-edit/admin-tracks-edit.component';

@NgModule({
  declarations: [AdminTracksDashboardComponent, AdminTracksCreateComponent, AdminTracksEditComponent],
  imports: [CommonModule, AdminTracksRoutingModule, SharedModule],
})
export class AdminTracksModule {}
