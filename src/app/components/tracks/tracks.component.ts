import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TracksService } from './tracks.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpService } from '../../shared/services/pop-up.service';
import { ITrack } from '../../shared/interfaces/i-track';
import { IGetResponse } from '../../shared/interfaces/i-get-response';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent implements OnInit {
  public tracks: ITrack[] = [];
  public search: string = '';
  @ViewChild('filter_div') filterDiv!: ElementRef;

  constructor(
    private tracksService: TracksService,
    private popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.fetchTracks();
  }

  fetchTracks() {
    this.tracksService.fetchTracks(this.search).subscribe({
      next: (response) => {
        let responseObj: IGetResponse = response as IGetResponse;

        this.tracks = responseObj.data;
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show('Error occured.', 'error-snack-bar');
          return;
        }

        this.popUpService.show('Error occured.', 'error-snack-bar');
      },
    });
  }

  onOpen() {
    this.filterDiv.nativeElement.classList.toggle('active');

    //this.popUpService.show('Error occured.', 'success-snack-bar');
  }
}
