import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistsService } from './playlists.service';
import { Subscription } from 'rxjs';
import { IGetResponse } from '../../shared/interfaces/i-get-response';
import { IPlaylist } from '../../shared/interfaces/i-playlist';
import { PopUpService } from '../../shared/services/pop-up.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  public playlists: IPlaylist;
  playlistsForUserSub: Subscription;
  constructor(
    private playlistsService: PlaylistsService,
    private popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.fetchPlaylistsForUser();
  }

  fetchPlaylistsForUser() {
    this.playlistsForUserSub = this.playlistsService
      .fetchPlaylistsForUser()
      .subscribe({
        next: (response) => {
          console.log(response);

          //let responseObj: IGetResponse<IPlaylist> = response as IGetResponse<IPlaylist>;

          //this.playlists = responseObj.data;
        },
        error: (error) => {
          console.log(error);

          if (error.status == 500) {
            this.popUpService.show('Error occured.', 'error-snack-bar');
            return;
          }

          this.popUpService.show('Error occured.', 'error-snack-bar');
        },
      });
  }

  ngOnDestroy(): void {
    if (this.playlistsForUserSub) {
      this.playlistsForUserSub.unsubscribe();
    }
  }
}
