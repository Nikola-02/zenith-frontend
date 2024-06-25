import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { IPlaylist } from '../../../shared/interfaces/i-playlist';
import { Subscription } from 'rxjs';
import { PlaylistsService } from '../playlists.service';
import { PopUpService } from '../../../shared/services/pop-up.service';
import { IGetResponse } from '../../../shared/interfaces/i-get-response';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCheckDialogComponent } from '../../../shared/abstract/delete-check-dialog/delete-check-dialog.component';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrl: './single-playlist.component.scss',
})
export class SinglePlaylistComponent implements OnInit, OnDestroy {
  public playlist: IPlaylist;
  private deletePlaylistSub: Subscription;
  private deleteDialogSub: Subscription;
  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistsService,
    private router: Router,
    private popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.fetchSinglePlaylist(id);
    });
  }

  deletePlaylist(id) {
    const dialogRef = this.dialog.open(DeleteCheckDialogComponent);
    this.deleteDialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePlaylistSub = this.playlistService
          .deletePlaylist(id)
          .subscribe({
            next: (response) => {
              console.log(response);
              this.popUpService.show(
                'Successfully deleted.',
                'success-snack-bar'
              );

              this.router.navigate(['/playlists']);
            },
            error: (error) => {
              console.log(error);

              if (error.status == 422) {
                let snackBarError = ``;

                if (error.error.length > 1) {
                  error.error.forEach((element) => {
                    snackBarError += '\n' + element;
                  });
                } else {
                  snackBarError += error.error[0].error;
                }
                this.popUpService.show(snackBarError, 'error-snack-bar');
                return;
              }

              if (error.status == 500) {
                this.popUpService.show(
                  'Error occurred while deleting playlist.',
                  'error-snack-bar'
                );
                return;
              }

              this.popUpService.show(
                'Error occurred while deleting playlist.',
                'error-snack-bar'
              );
            },
          });
      }
    });
  }

  fetchSinglePlaylist(id) {
    this.playlistService.fetchPlaylistsForUser().subscribe({
      next: (response) => {
        let responseObj: IGetResponse<IPlaylist> =
          response as IGetResponse<IPlaylist>;

        let playlist = responseObj.data.find((x) => x.id == id);

        console.log(playlist);

        if (!playlist) {
          this.router.navigate(['/']);
          return;
        }

        this.playlist = playlist;
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occurred while fetching playlist.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occurred while fetching playlist.',
          'error-snack-bar'
        );
      },
    });
  }

  ngOnDestroy(): void {
    if (this.deleteDialogSub) {
      this.deleteDialogSub.unsubscribe();
    }

    if (this.deletePlaylistSub) {
      this.deletePlaylistSub.unsubscribe();
    }
  }
}
