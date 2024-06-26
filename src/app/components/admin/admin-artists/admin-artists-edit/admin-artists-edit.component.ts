import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ILookupTable } from '../../../../shared/interfaces/i-lookup-table';
import { AdminArtistsService } from '../admin-artists.service';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-admin-artists-edit',
  templateUrl: './admin-artists-edit.component.html',
  styleUrl: './admin-artists-edit.component.scss',
})
export class AdminArtistsEditComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  public validationErrors;

  public editArtistSub: Subscription;
  public artistsSub: Subscription;

  public artist: ILookupTable;

  constructor(
    private adminArtistsService: AdminArtistsService,
    private popUpService: PopUpService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.fetchSingleArtist(id);
    });
  }

  fetchSingleArtist(id) {
    this.artistsSub = this.adminArtistsService.fetchArtistsAdmin().subscribe({
      next: (response) => {
        let responseObj: ILookupTable[] = response as ILookupTable[];

        let artist = responseObj.find((x) => x.id == id);

        if (!artist) {
          this.router.navigate(['/admin']);
          return;
        }

        this.artist = artist;
        this.setFormValues();
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching artist.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching artist;',
          'error-snack-bar'
        );
      },
    });
  }

  setFormValues() {
    this.form.patchValue({
      name: this.artist.name,
    });
  }

  onEditArtist(artistId) {
    if (this.form.valid) {
      let formData = {
        name: this.form.get('name')?.value,
      };

      this.editArtistSub = this.adminArtistsService
        .editArtist(artistId, formData)
        .subscribe({
          next: (response) => {
            this.popUpService.show(
              'Successfully edited artist.',
              'success-snack-bar'
            );

            this.router.navigate(['/admin/artists']);
          },
          error: (error) => {
            console.log(error);

            if (error.status == 422) {
              this.validationErrors = error.error;
              return;
            }

            if (error.status == 500) {
              this.popUpService.show(
                'Error occured while editing artist.',
                'error-snack-bar'
              );
              return;
            }

            this.popUpService.show(
              'Error occured while editing artist.',
              'error-snack-bar'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.editArtistSub) {
      this.editArtistSub.unsubscribe();
    }

    if (this.artistsSub) {
      this.artistsSub.unsubscribe();
    }
  }
}
