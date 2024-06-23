import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrl: './single-playlist.component.scss',
})
export class SinglePlaylistComponent implements OnInit {
  public playlist: IPlaylist;
  private playlistSub: Subscription;

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
}
