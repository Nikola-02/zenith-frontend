import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksComponent } from './tracks.component';
import { SingleTrackComponent } from './single-track/single-track.component';

const routes: Routes = [
  { path: '', component: TracksComponent },
  { path: ':id', component: SingleTrackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracksRoutingModule {}
