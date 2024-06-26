import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ILookupTable } from '../../../../shared/interfaces/i-lookup-table';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { AdminArtistsService } from '../admin-artists.service';
import { DeleteCheckDialogComponent } from '../../../../shared/abstract/delete-check-dialog/delete-check-dialog.component';

@Component({
  selector: 'app-admin-artists-dashboard',
  templateUrl: './admin-artists-dashboard.component.html',
  styleUrl: './admin-artists-dashboard.component.scss',
})
export class AdminArtistsDashboardComponent implements OnInit, OnDestroy {
  public artists: ILookupTable[];
  readonly dialog = inject(MatDialog);

  private artistsSub: Subscription;
  private deleteArtistSub: Subscription;
  private deleteDialogSub: Subscription;

  constructor(
    private popUpService: PopUpService,
    private adminArtistsService: AdminArtistsService
  ) {}

  ngOnInit(): void {
    this.fetchAdminArtists();
  }

  fetchAdminArtists() {
    this.artistsSub = this.adminArtistsService.fetchArtistsAdmin().subscribe({
      next: (response) => {
        let responseObj: ILookupTable[] = response as ILookupTable[];

        this.artists = responseObj;
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching artists.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching artists.',
          'error-snack-bar'
        );
      },
    });
  }

  deleteArtist(artistId) {
    const dialogRef = this.dialog.open(DeleteCheckDialogComponent);
    this.deleteDialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteArtistSub = this.adminArtistsService
          .deleteArtist(artistId)
          .subscribe({
            next: (response) => {
              this.popUpService.show(
                'Successfully deleted artist.',
                'success-snack-bar'
              );

              this.fetchAdminArtists();
            },
            error: (error) => {
              console.log(error);

              if (error.status == 409) {
                this.popUpService.show(error.error.error, 'error-snack-bar');
                return;
              }

              if (error.status == 500) {
                this.popUpService.show(
                  'Error occured while deleting artist.',
                  'error-snack-bar'
                );
                return;
              }

              this.popUpService.show(
                'Error occured while deleting artist.',
                'error-snack-bar'
              );
            },
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.artistsSub) {
      this.artistsSub.unsubscribe();
    }

    if (this.deleteArtistSub) {
      this.deleteArtistSub.unsubscribe();
    }

    if (this.deleteDialogSub) {
      this.deleteDialogSub.unsubscribe();
    }
  }
}
