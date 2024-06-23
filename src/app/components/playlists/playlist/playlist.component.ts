import { Component, Input } from '@angular/core';
import { IPlaylist } from '../../../shared/interfaces/i-playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {
  @Input() playlist: IPlaylist;
}
