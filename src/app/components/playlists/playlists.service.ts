import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  constructor(private http: HttpClient) {}

  fetchPlaylistsForUser() {
    return this.http.get(`${environment.apiUrl}playlists/mine`);
  }

  addTrackToPlaylists(trackId, selectedPlaylists) {
    console.log(selectedPlaylists);

    // return this.http.post(`${environment.apiUrl}playlists/tracks`, {
    //   trackId,
    //   selectedPlaylists,
    // });
  }
}
