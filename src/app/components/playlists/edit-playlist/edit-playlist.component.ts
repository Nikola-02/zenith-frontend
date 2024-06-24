import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistsService } from '../playlists.service';
import { IGetResponse } from '../../../shared/interfaces/i-get-response';
import { IPlaylist } from '../../../shared/interfaces/i-playlist';
import { PopUpService } from '../../../shared/services/pop-up.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrl: './edit-playlist.component.scss',
})
export class EditPlaylistComponent implements OnInit, OnDestroy {
  public playlist: IPlaylist;
  public singlePlaylistSub: Subscription;
  public editPlaylistSub: Subscription;
  public validationErrors;

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

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

  fetchSinglePlaylist(id) {
    this.singlePlaylistSub = this.playlistService
      .fetchPlaylistsForUser()
      .subscribe({
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
          this.form.get('name')?.setValue(playlist.name);
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

  onEditNewPlaylist(id) {
    let playlistName = this.form.get('name')?.value;

    if (playlistName) {
      this.editPlaylistSub = this.playlistService
        .editPlaylist(playlistName, id)
        .subscribe({
          next: (response) => {
            this.popUpService.show('Successfully edited.', 'success-snack-bar');
            this.router.navigate(['/playlists/' + id]);
          },
          error: (error) => {
            console.log(error);

            if (error.status == 422) {
              this.validationErrors = error.error;
              return;
            }

            if (error.status == 500) {
              this.popUpService.show('Error occurred.', 'error-snack-bar');
              return;
            }

            this.popUpService.show('Error occurred.', 'error-snack-bar');
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.singlePlaylistSub) {
      this.singlePlaylistSub.unsubscribe();
    }

    if (this.editPlaylistSub) {
      this.editPlaylistSub.unsubscribe();
    }
  }
}
