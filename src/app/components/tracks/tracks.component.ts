import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TracksService } from './tracks.service';
import { PopUpService } from '../../shared/services/pop-up.service';
import { ITrack } from '../../shared/interfaces/i-track';
import { IGetResponse } from '../../shared/interfaces/i-get-response';
import { Subscription } from 'rxjs';
import { IGetFilters } from '../../shared/interfaces/i-get-filters';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent implements OnInit, OnDestroy {
  public tracks: ITrack[] = [];
  public search: string = '';
  public tracksSub: Subscription;
  public filtersSub: Subscription;
  public filters: IGetFilters;
  public filtersKeys: string[] = ['albums', 'artists', 'genres', 'mediaTypes'];
  @ViewChild('filter_div') filterDiv!: ElementRef;

  constructor(
    private tracksService: TracksService,
    private popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.fetchTracks();
    this.fetchFilters();
  }

  fetchTracks() {
    this.tracksSub = this.tracksService.fetchTracks(this.search).subscribe({
      next: (response) => {
        let responseObj: IGetResponse<ITrack> =
          response as IGetResponse<ITrack>;

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

  fetchFilters() {
    this.filtersSub = this.tracksService.fetchFilters().subscribe({
      next: (response) => {
        let responseObj: IGetFilters = response as IGetFilters;

        this.filters = responseObj;

        console.log(this.filters);
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching filters.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching filters.',
          'error-snack-bar'
        );
      },
    });
  }

  onFilterChange() {}

  onOpen() {
    this.filterDiv.nativeElement.classList.toggle('active');

    //this.popUpService.show('Error occured.', 'success-snack-bar');
  }

  ngOnDestroy(): void {
    if (this.tracksSub) {
      this.tracksSub.unsubscribe();
    }

    if (this.filtersSub) {
      this.filtersSub.unsubscribe();
    }
  }
}
