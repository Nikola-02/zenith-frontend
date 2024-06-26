import { Component, OnInit } from '@angular/core';
import { ITrack } from '../../shared/interfaces/i-track';
import { TracksService } from '../tracks/tracks.service';
import { PopUpService } from '../../shared/services/pop-up.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public popularTracks: ITrack[];

  constructor(
    private tracksService: TracksService,
    private popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.fetchPopularTracks();
  }

  fetchPopularTracks() {
    this.tracksService.fetchPopularTracks().subscribe({
      next: (response) => {
        let responseObj: ITrack[] = response as ITrack[];

        this.popularTracks = responseObj;
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching popularTracks.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching popularTracks.',
          'error-snack-bar'
        );
      },
    });
  }
}
