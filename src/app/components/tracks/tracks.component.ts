import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TracksService } from './tracks.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpService } from '../../shared/services/pop-up.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent implements OnInit {
  public tracks = [];
  public serverError = '';
  @ViewChild('filter_div') filterDiv!: ElementRef;

  constructor(
    private tracksService: TracksService,
    private popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.tracksService.fetchTracks().subscribe({
      next: (response) => {
        this.serverError = '';
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.serverError = 'Error occurred in database.';
          return;
        }

        this.serverError = 'Error occurred.';
      },
    });
  }

  onOpen() {
    //this.filterDiv.nativeElement.classList.toggle('active');
    this.popUpService.show('Error occured.', 'error-snack-bar');
  }
}
