import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TracksComponent } from './tracks.component';
import { TrackComponent } from './track/track.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SingleTrackComponent } from './single-track/single-track.component';

@NgModule({
  declarations: [TracksComponent, TrackComponent, SingleTrackComponent],
  imports: [
    CommonModule,
    TracksRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
  ],
})
export class TracksModule {}
