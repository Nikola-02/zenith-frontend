import { Component, Input } from '@angular/core';
import { ITrack } from '../../../shared/interfaces/i-track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent {
  @Input() track: ITrack;
}
