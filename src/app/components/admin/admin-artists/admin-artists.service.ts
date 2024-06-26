import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminArtistsService {
  private apiUrl = environment.apiUrl;
  public headersNoAuth = new HttpHeaders({
    'No-Auth': 'True',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  fetchArtistsAdmin() {
    return this.http.get(`${this.apiUrl}adminArtists`, {
      headers: this.headersNoAuth,
    });
  }

  createNewArtist(formData) {
    return this.http.post(`${this.apiUrl}artists`, formData);
  }

  editArtist(artistId, formData) {
    return this.http.put(`${this.apiUrl}artists/` + artistId, formData);
  }

  deleteArtist(artistId) {
    return this.http.delete(`${this.apiUrl}artists/` + artistId);
  }
}
