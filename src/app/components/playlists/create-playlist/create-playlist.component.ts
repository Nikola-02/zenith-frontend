import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PlaylistsService } from '../playlists.service';
import { PopUpService } from '../../../shared/services/pop-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrl: './create-playlist.component.scss',
})
export class CreatePlaylistComponent implements OnDestroy {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  private createPlaylistSub: Subscription;
  public validationErrors;

  constructor(
    private playlistService: PlaylistsService,
    private popUpService: PopUpService,
    private router: Router
  ) {}

  onCreateNewPlaylist() {
    let playlistName = this.form.get('name')?.value;

    if (playlistName) {
      this.createPlaylistSub = this.playlistService
        .createNewPlaylist(playlistName)
        .subscribe({
          next: (response) => {
            this.popUpService.show(
              'Successfully created.',
              'success-snack-bar'
            );
            this.router.navigate(['/playlists']);
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
    if (this.createPlaylistSub) {
      this.createPlaylistSub.unsubscribe();
    }
  }
}
