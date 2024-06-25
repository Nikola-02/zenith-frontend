import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TracksService } from '../../../tracks/tracks.service';
import { ITrack } from '../../../../shared/interfaces/i-track';
import { AuthService } from '../../../auth/auth.service';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { ILookupTable } from '../../../../shared/interfaces/i-lookup-table';
import { IGetFilters } from '../../../../shared/interfaces/i-get-filters';
import { FilesService } from '../../../../shared/services/files.service';
import { AdminTracksService } from '../admin-tracks.service';

@Component({
  selector: 'app-admin-tracks-edit',
  templateUrl: './admin-tracks-edit.component.html',
  styleUrl: './admin-tracks-edit.component.scss',
})
export class AdminTracksEditComponent implements OnInit, OnDestroy {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required, Validators.min(15)]),
    price: new FormControl('', [Validators.required, Validators.min(0.1)]),
    albumId: new FormControl('', [Validators.required]),
    artistId: new FormControl('', [Validators.required]),
    genreId: new FormControl('', [Validators.required]),
    mediaTypeId: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    audio: new FormControl(''),
  });

  public albums: ILookupTable[];
  public artists: ILookupTable[];
  public genres: ILookupTable[];
  public mediaTypes: ILookupTable[];
  public track: ITrack;

  private singleTrackSub: Subscription;
  private filtersSub: Subscription;
  private editTrackSub: Subscription;

  public formatNotValid: string;
  public imagePath: string;
  public songPath: string;
  public validationErrors;

  constructor(
    private route: ActivatedRoute,
    private tracksService: TracksService,
    private authService: AuthService,
    private popUpService: PopUpService,
    private router: Router,
    private filesService: FilesService,
    private adminTracksService: AdminTracksService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.fetchSingleTrack(id);
      this.fetchFilters();
    });
  }

  fetchSingleTrack(id) {
    this.singleTrackSub = this.tracksService.fetchSingleTrack(id).subscribe({
      next: (response) => {
        let track: ITrack = response as ITrack;
        this.track = track;

        this.setFormValues();
      },
      error: (error) => {
        console.log(error);

        if (error.status == 401) {
          this.authService.logout();
          return;
        }

        if (error.status == 404) {
          this.router.navigate(['/admin']);
          return;
        }

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching track.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching track.',
          'error-snack-bar'
        );
      },
    });
  }

  fetchFilters() {
    this.filtersSub = this.tracksService.fetchFilters().subscribe({
      next: (response) => {
        let responseObj: IGetFilters = response as IGetFilters;

        this.albums = responseObj.albums;
        this.artists = responseObj.artists;
        this.genres = responseObj.genres;
        this.mediaTypes = responseObj.mediaTypes;
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching data.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching data.',
          'error-snack-bar'
        );
      },
    });
  }

  handleUploadFile($event) {
    const file = $event.target.files[0];
    if (file) {
      const fieldName = $event.target.name;

      const formData = new FormData();
      formData.append('file', file);

      this.filesService.fileUpload(formData).subscribe({
        next: (response) => {
          let responseObj: { file: string } = response as { file: string };

          if (responseObj.file) {
            if (fieldName === 'image') {
              this.imagePath = responseObj.file;
              this.popUpService.show(
                'Successfully uploaded image.',
                'success-snack-bar'
              );
            } else if (fieldName === 'audio') {
              this.songPath = responseObj.file;
              this.popUpService.show(
                'Successfully uploaded song.',
                'success-snack-bar'
              );
            }
          }
        },
        error: (error) => {
          console.log(error);

          if (error.status == 415) {
            if (fieldName === 'image') {
              this.formatNotValid =
                'Uploaded file is in invalid format. Supported formats for image: jpg, jpeg, png.';
            } else if (fieldName === 'audio') {
              this.formatNotValid =
                'Uploaded file is in invalid format. Supported formats for song: mp3, wav';
            }
          } else if (error.status == 500) {
            this.formatNotValid = 'Error occurred while uploading file.';
          } else {
            this.formatNotValid = 'Error occurred while uploading file.';
          }
        },
      });
    }
  }

  setFormValues() {
    this.form.patchValue({
      name: this.track.name,
      description: this.track.description,
      duration: this.track.duration.toString(),
      price: this.track.price.toString(),
      albumId: this.track.album.id.toString(),
      artistId: this.track.artist.id.toString(),
      genreId: this.track.genre.id.toString(),
      mediaTypeId: this.track.mediaType.id.toString(),
    });
  }

  onEditTrack(id) {
    console.log(this.imagePath);

    if (this.form.valid) {
      let formData = {
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
        duration: this.form.get('duration')?.value,
        price: this.form.get('price')?.value,
        albumId: this.form.get('albumId')?.value,
        artistId: this.form.get('artistId')?.value,
        genreId: this.form.get('genreId')?.value,
        mediaTypeId: this.form.get('mediaTypeId')?.value,
        trackFiles: {
          imagePath: this.imagePath,
          songPath: this.songPath,
        },
      };

      this.editTrackSub = this.adminTracksService
        .editTrack(this.track.id, formData)
        .subscribe({
          next: (response) => {
            this.popUpService.show(
              'Successfully edited track.',
              'success-snack-bar'
            );

            this.router.navigate(['/admin/tracks']);
          },
          error: (error) => {
            console.log(error);

            if (error.status == 422) {
              this.validationErrors = error.error;
              return;
            }

            if (error.status == 500) {
              this.popUpService.show(
                'Error occured while editing track.',
                'error-snack-bar'
              );
              return;
            }

            this.popUpService.show(
              'Error occured while editing track.',
              'error-snack-bar'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.singleTrackSub) {
      this.singleTrackSub.unsubscribe();
    }

    if (this.filtersSub) {
      this.filtersSub.unsubscribe();
    }

    if (this.editTrackSub) {
      this.editTrackSub.unsubscribe();
    }
  }
}
