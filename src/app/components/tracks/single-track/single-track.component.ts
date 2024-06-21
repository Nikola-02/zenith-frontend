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
  public track: ITrack;
  @ViewChild('audio') audio;

  constructor(
    private tracksService: TracksService,
    private route: ActivatedRoute,
    private popUpService: PopUpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.fetchSingleTrack(id);
    });

    this.userSub = this.authService.$userSubject.subscribe((user) => {
      console.log(user);

      this.user = user as IUser;
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

  likeTrack(trackId) {
    if (!this.user) {
      this.popUpService.show('Log in to like a song.', 'error-snack-bar');
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.singleTrackSub) {
      this.singleTrackSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
