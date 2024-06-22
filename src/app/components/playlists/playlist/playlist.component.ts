import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {
  @Input() playlist;
}
