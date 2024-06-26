import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TracksService } from '../../../tracks/tracks.service';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { IGetFilters } from '../../../../shared/interfaces/i-get-filters';
import { ILookupTable } from '../../../../shared/interfaces/i-lookup-table';
import { FilesService } from '../../../../shared/services/files.service';
import { AdminTracksService } from '../admin-tracks.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../../../auth/login/login.component';

@Component({
  selector: 'app-admin-tracks-create',
  templateUrl: './admin-tracks-create.component.html',
  styleUrl: './admin-tracks-create.component.scss',
})
export class AdminTracksCreateComponent implements OnInit, OnDestroy {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    duration: new FormControl('', [Validators.required, Validators.min(15)]),
    price: new FormControl('', [Validators.required, Validators.min(0.1)]),
    albumId: new FormControl('', [Validators.required]),
    artistId: new FormControl('', [Validators.required]),
    genreId: new FormControl('', [Validators.required]),
    mediaTypeId: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    audio: new FormControl('', [Validators.required]),
  });

  public imagePath: string;
  public audioPath: string;
  public validationErrors;

  public filtersSub: Subscription;
  public createTrackSub: Subscription;
  public albums: ILookupTable[];
  public artists: ILookupTable[];
  public genres: ILookupTable[];
  public mediaTypes: ILookupTable[];

  public formatNotValid: string;

  constructor(
    private adminTracksService: AdminTracksService,
    private tracksService: TracksService,
    private popUpService: PopUpService,
    private filesService: FilesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFilters();
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
              this.audioPath = responseObj.file;
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
            this.formatNotValid =
              'Uploaded file is in invalid format. Supported formats are: jpg, jpeg, png';
            return;
          }

          if (error.status == 500) {
            this.popUpService.show(
              'Error occured while uploading file.',
              'error-snack-bar'
            );
            return;
          }

          this.popUpService.show(
            'Error occured while uploading file.',
            'error-snack-bar'
          );
        },
      });
    }
  }

  onCreateNewTrack() {
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
          songPath: this.audioPath,
        },
      };

      this.createTrackSub = this.adminTracksService
        .createNewTrack(formData)
        .subscribe({
          next: (response) => {
            this.popUpService.show(
              'Successfully added track.',
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
                'Error occured while adding track.',
                'error-snack-bar'
              );
              return;
            }

            this.popUpService.show(
              'Error occured while adding track.',
              'error-snack-bar'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.filtersSub) {
      this.filtersSub.unsubscribe();
    }

    if (this.createTrackSub) {
      this.createTrackSub.unsubscribe();
    }
  }
}
