import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TracksService } from '../tracks.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ITrack } from '../../../shared/interfaces/i-track';
import { PopUpService } from '../../../shared/services/pop-up.service';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../../shared/interfaces/i-user';

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
  private isLikedSub: Subscription;
  public track: ITrack;
  public liked: boolean = false;
  @ViewChild('audio') audio;

  constructor(
    private tracksService: TracksService,
    private route: ActivatedRoute,
    private popUpService: PopUpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.$userSubject.subscribe((user) => {
      console.log(user);

      this.user = user as IUser;
    });

    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.fetchSingleTrack(id);
      this.isTrackLiked(id);
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
  }
}
