import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistsComponent } from './playlists.component';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { SharedModule } from '../../shared/shared.module';
import { SinglePlaylistComponent } from './single-playlist/single-playlist.component';

@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    SinglePlaylistComponent,
  ],
  imports: [CommonModule, PlaylistsRoutingModule, SharedModule],
})
export class PlaylistsModule {}
