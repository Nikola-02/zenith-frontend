import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITrack } from '../../../../shared/interfaces/i-track';
import { Subscription } from 'rxjs';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { AdminTracksService } from '../admin-tracks.service';

@Component({
  selector: 'app-admin-tracks-dashboard',
  templateUrl: './admin-tracks-dashboard.component.html',
  styleUrl: './admin-tracks-dashboard.component.scss',
})
export class AdminTracksDashboardComponent implements OnInit, OnDestroy {
  public tracks: ITrack[];
  private tracksSub: Subscription;

  constructor(
    private adminTracksService: AdminTracksService,
    private popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.tracksSub = this.adminTracksService.fetchTracksAdmin().subscribe({
      next: (response) => {
        let responseObj: ITrack[] = response as ITrack[];

        this.tracks = responseObj;
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching tracks.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching tracks.',
          'error-snack-bar'
        );
      },
    });
  }

  ngOnDestroy(): void {
    if (this.tracksSub) {
      this.tracksSub.unsubscribe();
    }
  }
}
