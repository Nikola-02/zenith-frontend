import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { AdminGenresService } from '../admin-genres.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ILookupTable } from '../../../../shared/interfaces/i-lookup-table';
import { DeleteCheckDialogComponent } from '../../../../shared/abstract/delete-check-dialog/delete-check-dialog.component';

@Component({
  selector: 'app-admin-genres-dashboard',
  templateUrl: './admin-genres-dashboard.component.html',
  styleUrl: './admin-genres-dashboard.component.scss',
})
export class AdminGenresDashboardComponent implements OnInit, OnDestroy {
  public genres: ILookupTable[];
  readonly dialog = inject(MatDialog);

  private genresSub: Subscription;
  private deleteGenreSub: Subscription;
  private deleteDialogSub: Subscription;

  constructor(
    private popUpService: PopUpService,
    private adminGenresService: AdminGenresService
  ) {}

  ngOnInit(): void {
    this.fetchAdminGenres();
  }

  fetchAdminGenres() {
    this.genresSub = this.adminGenresService.fetchGenresAdmin().subscribe({
      next: (response) => {
        let responseObj: ILookupTable[] = response as ILookupTable[];

        this.genres = responseObj;
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching genres.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching genres.',
          'error-snack-bar'
        );
      },
    });
  }

  deleteGenre(genreId) {
    const dialogRef = this.dialog.open(DeleteCheckDialogComponent);
    this.deleteDialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteGenreSub = this.adminGenresService
          .deleteGenre(genreId)
          .subscribe({
            next: (response) => {
              this.popUpService.show(
                'Successfully deleted genre.',
                'success-snack-bar'
              );

              this.fetchAdminGenres();
            },
            error: (error) => {
              console.log(error);

              if (error.status == 409) {
                this.popUpService.show(error.error.error, 'error-snack-bar');
                return;
              }

              if (error.status == 500) {
                this.popUpService.show(
                  'Error occured while deleting genre.',
                  'error-snack-bar'
                );
                return;
              }

              this.popUpService.show(
                'Error occured while deleting genre.',
                'error-snack-bar'
              );
            },
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.genresSub) {
      this.genresSub.unsubscribe();
    }

    if (this.deleteGenreSub) {
      this.deleteGenreSub.unsubscribe();
    }

    if (this.deleteDialogSub) {
      this.deleteDialogSub.unsubscribe();
    }
  }
}
