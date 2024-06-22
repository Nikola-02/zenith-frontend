import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistsComponent } from './playlists.component';

@NgModule({
  declarations: [PlaylistsComponent, PlaylistComponent],
  imports: [CommonModule, PlaylistsRoutingModule],
})
export class PlaylistsModule {}
