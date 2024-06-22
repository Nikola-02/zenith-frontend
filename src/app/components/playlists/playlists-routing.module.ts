import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists.component';

const routes: Routes = [
  { path: '', component: PlaylistsComponent },
  //{ path: ':id', component: SingleTrackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistsRoutingModule {}
