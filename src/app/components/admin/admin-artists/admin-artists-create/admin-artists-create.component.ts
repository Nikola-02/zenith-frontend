import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminArtistsService } from '../admin-artists.service';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-artists-create',
  templateUrl: './admin-artists-create.component.html',
  styleUrl: './admin-artists-create.component.scss',
})
export class AdminArtistsCreateComponent implements OnDestroy {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  public validationErrors;

  public createArtistSub: Subscription;

  constructor(
    private adminArtistsService: AdminArtistsService,
    private popUpService: PopUpService,
    private router: Router
  ) {}

  onCreateNewArtist() {
    if (this.form.valid) {
      let formData = {
        name: this.form.get('name')?.value,
      };

      this.createArtistSub = this.adminArtistsService
        .createNewArtist(formData)
        .subscribe({
          next: (response) => {
            this.popUpService.show(
              'Successfully added artist.',
              'success-snack-bar'
            );

            this.router.navigate(['/admin/artists']);
          },
          error: (error) => {
            console.log(error);

            if (error.status == 401) {
              this.popUpService.show(
                'You dont have permission to do this action.',
                'error-snack-bar'
              );
              return;
            }

            if (error.status == 422) {
              this.validationErrors = error.error;
              return;
            }

            if (error.status == 500) {
              this.popUpService.show(
                'Error occured while adding artist.',
                'error-snack-bar'
              );
              return;
            }

            this.popUpService.show(
              'Error occured while adding artist.',
              'error-snack-bar'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.createArtistSub) {
      this.createArtistSub.unsubscribe();
    }
  }
}
