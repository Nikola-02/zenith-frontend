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
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { getSortParamsFromString } from '../../app.module';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent implements OnInit, OnDestroy {
  public tracksReponseObj: IGetResponse<ITrack>;
  public search: string = '';
  public tracksSub: Subscription;
  public filtersSub: Subscription;
  public filters: IGetFilters;
  public sort: string = '';
  public page = 1;
  public filtersKeys: string[] = ['albums', 'artists', 'genres', 'mediaTypes'];
  form = new FormGroup({
    albums: new FormControl(''),
    artists: new FormControl(''),
    genres: new FormControl(''),
    mediaTypes: new FormControl(''),
  });
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
    let params = new HttpParams();

    if (this.search) {
      params = params.set('keyword', this.search);
    }

    let albumId = this.form.get('albums')?.value;
    let artistId = this.form.get('artists')?.value;
    let genreId = this.form.get('genres')?.value;
    let mediaTypeId = this.form.get('mediaTypes')?.value;

    if (albumId) {
      params = params.set('albumId', albumId);
    }

    if (artistId) {
      params = params.set('artistId', artistId);
    }

    if (genreId) {
      params = params.set('genreId', genreId);
    }

    if (mediaTypeId) {
      params = params.set('mediaTypeId', mediaTypeId);
    }

    if (this.sort != '') {
      let sortObj = getSortParamsFromString(this.sort);

      params = params.set('Sort.SortProperty', sortObj.property);
      params = params.set('Sort.Direction', sortObj.direction);
    }

    const perPage = 4;

    params = params.set('perPage', perPage);

    params = params.set('page', this.page);

    this.tracksSub = this.tracksService.fetchTracks(params).subscribe({
      next: (response) => {
        let responseObj: IGetResponse<ITrack> =
          response as IGetResponse<ITrack>;

        this.tracksReponseObj = responseObj;
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

  onFilterChange() {
    this.fetchTracks();
  }

  onOpen() {
    this.filterDiv.nativeElement.classList.toggle('active');

    //this.popUpService.show('Error occured.', 'success-snack-bar');
  }

  setPage(newPage: number) {
    this.page = newPage;
    this.fetchTracks();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchTracks();
    }
  }

  nextPage() {
    if (this.page < this.tracksReponseObj.pages) {
      this.page++;
      this.fetchTracks();
    }
  }

  counter(i: number) {
    return new Array(i);
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
