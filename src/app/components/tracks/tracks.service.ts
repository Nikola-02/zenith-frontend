import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, noAuthOptions } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private apiUrl = environment.apiUrl;
  public headersNoAuth = new HttpHeaders({
    'No-Auth': 'True',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  fetchTracks(filters) {
    console.log(filters);

    return this.http.get(`${this.apiUrl}tracks`, {
      headers: this.headersNoAuth,
      params: filters,
    });
  }

  fetchSingleTrack(id) {
    return this.http.get(`${this.apiUrl}tracks/` + id, noAuthOptions);
  }

  fetchPopularTracks() {
    return this.http.get(`${this.apiUrl}tracks/popular`, noAuthOptions);
  }

  fetchFilters() {
    return this.http.get(`${this.apiUrl}filters`, noAuthOptions);
  }

  isTrackLiked(trackId) {
    return this.http.get(`${this.apiUrl}trackLikes/` + trackId);
  }

  likeTrack(trackId) {
    return this.http.post(`${this.apiUrl}trackLikes`, { trackId });
  }

  undoLikeTrack(trackId) {
    return this.http.delete(`${this.apiUrl}trackLikes/` + trackId);
  }
}
