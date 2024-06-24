import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TracksService } from '../tracks.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ITrack } from '../../../shared/interfaces/i-track';
import { PopUpService } from '../../../shared/services/pop-up.service';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../../shared/interfaces/i-user';
import { PlaylistsService } from '../../playlists/playlists.service';
import { IGetResponse } from '../../../shared/interfaces/i-get-response';
import { IPlaylist } from '../../../shared/interfaces/i-playlist';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrl: './single-track.component.scss',
})
export class SingleTrackComponent implements OnInit, OnDestroy {
  public user: IUser;
  private singleTrackSub: Subscription;
  private userSub: Subscription;
  private likeSub: Subscription;
  private undoLike: Subscription;
  private playlistsForUserSub: Subscription;
  private isLikedSub: Subscription;
  private addTrackToPlaylistsSub: Subscription;
  public track: ITrack;
  public liked: boolean = false;
  public playlists: IPlaylist[] = [];
  public playlistsSelect = new FormControl();
  @ViewChild('audio') audio;
  @ViewChild('select') select;

  constructor(
    private tracksService: TracksService,
    private route: ActivatedRoute,
    private popUpService: PopUpService,
    private authService: AuthService,
    private playlistService: PlaylistsService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.$userSubject.subscribe((user) => {
      console.log(user);

      this.user = user as IUser;

      if (user) {
        this.isTrackLiked(this.track.id);
        this.fetchPlaylistsForUser();
      }
    });

    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.fetchSingleTrack(id);
      this.isTrackLiked(id);
      this.fetchPlaylistsForUser();

      console.log(this.playlists);
    });
  }

  fetchSingleTrack(id) {
    this.singleTrackSub = this.tracksService.fetchSingleTrack(id).subscribe({
      next: (response) => {
        let track: ITrack = response as ITrack;

        this.track = track;
      },
      error: (error) => {
        console.log(error);

        if (error.status == 401) {
          this.authService.logout();
          return;
        }

        if (error.status == 500) {
          this.popUpService.show('Error occured.', 'error-snack-bar');
          return;
        }

        this.popUpService.show('Error occured.', 'error-snack-bar');
      },
    });
  }

  fetchPlaylistsForUser() {
    this.playlistsForUserSub = this.playlistService
      .fetchPlaylistsForUser()
      .subscribe({
        next: (response) => {
          console.log(response);

          let responseObj: IGetResponse<IPlaylist> =
            response as IGetResponse<IPlaylist>;

          if (responseObj.data.length) {
            let playlistsToBeSelected = responseObj.data
              .filter((playlist) => playlist.tracks.length > 0)
              .filter((x) => x.tracks.map((y) => y.id).includes(this.track.id))
              .map((h) => h.id);

            this.playlistsSelect.patchValue(playlistsToBeSelected);
          }

          this.playlists = responseObj.data;

          console.log(this.playlists);

          if (this.playlists.length > 0) {
            this.playlistsSelect.enable();
          } else {
            this.playlistsSelect.disable();
          }
        },
        error: (error) => {
          console.log(error);

          if (error.status == 401) {
            this.authService.logout();
            return;
          }

          if (error.status == 500) {
            this.popUpService.show('Error occured.', 'error-snack-bar');
            return;
          }

          this.popUpService.show('Error occured.', 'error-snack-bar');
        },
      });
  }

  likeOrUndoLikeTrack(trackId) {
    if (!this.user) {
      this.popUpService.show('Log in to like a song.', 'error-snack-bar');
      return;
    }

    if (this.liked) {
      this.undoLike = this.tracksService.undoLikeTrack(trackId).subscribe({
        next: (response) => {
          this.liked = false;
          this.fetchSingleTrack(trackId);
          this.popUpService.show(
            'Thanks for feedback. We will improve track soon!',
            'success-snack-bar'
          );
          console.log(response);
        },
        error: (error) => {
          console.log(error);

          if (error.status == 401) {
            this.authService.logout();
            return;
          }

          if (error.status == 500) {
            this.popUpService.show(
              'Error occured while trying to undo like a track.',
              'error-snack-bar'
            );
            return;
          }

          this.popUpService.show(
            'Error occured while trying to undo like a track.',
            'error-snack-bar'
          );
        },
      });
    } else {
      this.likeSub = this.tracksService.likeTrack(trackId).subscribe({
        next: (response) => {
          this.liked = true;
          this.fetchSingleTrack(trackId);
          this.popUpService.show('Thank you for like!', 'success-snack-bar');
          console.log(response);
        },
        error: (error) => {
          console.log(error);

          if (error.status == 401) {
            this.authService.logout();
            return;
          }

          if (error.status == 500) {
            this.popUpService.show(
              'Error occured while trying to like a track.',
              'error-snack-bar'
            );
            return;
          }

          this.popUpService.show(
            'Error occured while trying to like a track.',
            'error-snack-bar'
          );
        },
      });
    }
  }

  isTrackLiked(trackId) {
    if (!this.user) {
      console.log(this.user);

      return;
    }

    this.isLikedSub = this.tracksService.isTrackLiked(trackId).subscribe({
      next: (response) => {
        let newResponse = response as { exists: boolean };

        this.liked = newResponse.exists;
      },
      error: (error) => {
        console.log(error);

        if (error.status == 401) {
          console.log('okeeeej bato');
          this.authService.logout();
          return;
        }

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while trying to get your like.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while trying to get your like.',
          'error-snack-bar'
        );
      },
    });
  }

  addToPlaylists(trackId) {
    let selectedPlaylistsArr = this.playlistsSelect.value;

    this.addTrackToPlaylistsSub = this.playlistService
      .addTrackToPlaylists(trackId, selectedPlaylistsArr)
      .subscribe({
        next: (response) => {
          this.fetchPlaylistsForUser();

          this.popUpService.show('Successfully saved.', 'success-snack-bar');
        },
        error: (error) => {
          console.log(error);

          if (error.status == 401) {
            this.authService.logout();
            return;
          }

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
            this.popUpService.show('Error occured.', 'error-snack-bar');
            return;
          }

          this.popUpService.show('Error occured.', 'error-snack-bar');
        },
      });
  }

  ngOnDestroy(): void {
    if (this.singleTrackSub) {
      this.singleTrackSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.likeSub) {
      this.likeSub.unsubscribe();
    }

    if (this.isLikedSub) {
      this.isLikedSub.unsubscribe();
    }

    if (this.undoLike) {
      this.undoLike.unsubscribe();
    }

    if (this.playlistsForUserSub) {
      this.playlistsForUserSub.unsubscribe();
    }

    if (this.addTrackToPlaylistsSub) {
      this.addTrackToPlaylistsSub.unsubscribe();
    }
  }
}
