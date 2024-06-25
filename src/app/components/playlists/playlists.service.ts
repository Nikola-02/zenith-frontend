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
    if (!selectedPlaylists) {
      selectedPlaylists = [];
    }

    let playlistIds = selectedPlaylists;

    return this.http.post(`${environment.apiUrl}playlists/track`, {
      trackId,
      playlistIds,
    });
  }

  createNewPlaylist(name: string) {
    return this.http.post(`${environment.apiUrl}playlists`, { name });
  }

  deletePlaylist(id) {
    return this.http.delete(`${environment.apiUrl}playlists/` + id);
  }

  editPlaylist(name, id) {
    return this.http.put(`${environment.apiUrl}playlists/` + id, { name });
  }

  removeTrackFromPlaylist(trackId, playlistId) {
    return this.http.delete(
      `${environment.apiUrl}playlists/` + playlistId + '/track',
      {
        body: { trackId: trackId },
      }
    );
  }
}
