import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminTracksService {
  private apiUrl = environment.apiUrl;
  public headersNoAuth = new HttpHeaders({
    'No-Auth': 'True',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  fetchTracksAdmin() {
    return this.http.get(`${this.apiUrl}adminTracks`, {
      headers: this.headersNoAuth,
    });
  }

  createNewTrack(formData) {
    return this.http.post(`${this.apiUrl}tracks`, formData);
  }

  deleteTrack(trackId) {
    return this.http.delete(`${this.apiUrl}tracks/` + trackId);
  }
}
