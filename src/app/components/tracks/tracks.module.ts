import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TracksComponent } from './tracks.component';
import { TrackComponent } from './track/track.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TracksComponent, TrackComponent],
  imports: [
    CommonModule,
    TracksRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
  ],
})
export class TracksModule {}
