import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminGenresService {
  private apiUrl = environment.apiUrl;
  public headersNoAuth = new HttpHeaders({
    'No-Auth': 'True',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  fetchGenresAdmin() {
    return this.http.get(`${this.apiUrl}adminGenres`, {
      headers: this.headersNoAuth,
    });
  }

  createNewGenre(formData) {
    return this.http.post(`${this.apiUrl}genres`, formData);
  }

  editGenre(genreId, formData) {
    return this.http.put(`${this.apiUrl}genres/` + genreId, formData);
  }

  deleteGenre(genreId) {
    return this.http.delete(`${this.apiUrl}genres/` + genreId);
  }
}
