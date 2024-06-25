import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminGenresService } from '../admin-genres.service';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-genres-create',
  templateUrl: './admin-genres-create.component.html',
  styleUrl: './admin-genres-create.component.scss',
})
export class AdminGenresCreateComponent implements OnDestroy {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  public validationErrors;

  public createGenreSub: Subscription;

  constructor(
    private adminGenresService: AdminGenresService,
    private popUpService: PopUpService,
    private router: Router
  ) {}

  onCreateNewGenre() {
    if (this.form.valid) {
      let formData = {
        name: this.form.get('name')?.value,
      };

      this.createGenreSub = this.adminGenresService
        .createNewGenre(formData)
        .subscribe({
          next: (response) => {
            this.popUpService.show(
              'Successfully added genre.',
              'success-snack-bar'
            );

            this.router.navigate(['/admin/genres']);
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
                'Error occured while adding genre.',
                'error-snack-bar'
              );
              return;
            }

            this.popUpService.show(
              'Error occured while adding genre.',
              'error-snack-bar'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.createGenreSub) {
      this.createGenreSub.unsubscribe();
    }
  }
}
