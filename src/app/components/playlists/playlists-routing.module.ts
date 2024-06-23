import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists.component';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { SinglePlaylistComponent } from './single-playlist/single-playlist.component';

const routes: Routes = [
  { path: '', component: PlaylistsComponent },
  { path: 'create', component: CreatePlaylistComponent },
  { path: ':id', component: SinglePlaylistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistsRoutingModule {}
