import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TracksComponent } from './tracks.component';
import { TrackComponent } from './track/track.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [TracksComponent, TrackComponent],
  imports: [CommonModule, TracksRoutingModule, SharedModule],
})
export class TracksModule {}
