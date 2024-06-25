import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminGenresService } from '../admin-genres.service';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { ILookupTable } from '../../../../shared/interfaces/i-lookup-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-genres-edit',
  templateUrl: './admin-genres-edit.component.html',
  styleUrl: './admin-genres-edit.component.scss',
})
export class AdminGenresEditComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  public validationErrors;

  public editGenreSub: Subscription;
  public genresSub: Subscription;

  public genre: ILookupTable;

  constructor(
    private adminGenresService: AdminGenresService,
    private popUpService: PopUpService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.fetchSingleGenre(id);
    });
  }

  fetchSingleGenre(id) {
    this.genresSub = this.adminGenresService.fetchGenresAdmin().subscribe({
      next: (response) => {
        let responseObj: ILookupTable[] = response as ILookupTable[];

        let genre = responseObj.find((x) => x.id == id);

        if (!genre) {
          this.router.navigate(['/admin']);
          return;
        }

        this.genre = genre;
        this.setFormValues();
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching genre.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching genre;',
          'error-snack-bar'
        );
      },
    });
  }

  setFormValues() {
    this.form.patchValue({
      name: this.genre.name,
    });
  }

  onEditGenre(genreId) {
    if (this.form.valid) {
      let formData = {
        name: this.form.get('name')?.value,
      };

      this.editGenreSub = this.adminGenresService
        .editGenre(genreId, formData)
        .subscribe({
          next: (response) => {
            this.popUpService.show(
              'Successfully edited genre.',
              'success-snack-bar'
            );

            this.router.navigate(['/admin/genres']);
          },
          error: (error) => {
            console.log(error);

            if (error.status == 422) {
              this.validationErrors = error.error;
              return;
            }

            if (error.status == 500) {
              this.popUpService.show(
                'Error occured while editing genre.',
                'error-snack-bar'
              );
              return;
            }

            this.popUpService.show(
              'Error occured while editing genre.',
              'error-snack-bar'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.editGenreSub) {
      this.editGenreSub.unsubscribe();
    }

    if (this.genresSub) {
      this.genresSub.unsubscribe();
    }
  }
}
