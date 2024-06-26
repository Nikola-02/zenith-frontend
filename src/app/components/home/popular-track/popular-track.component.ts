import { Component, Input } from '@angular/core';
import { ITrack } from '../../../shared/interfaces/i-track';

@Component({
  selector: 'app-popular-track',
  templateUrl: './popular-track.component.html',
  styleUrl: './popular-track.component.scss',
})
export class PopularTrackComponent {
  @Input() track: ITrack;
}
