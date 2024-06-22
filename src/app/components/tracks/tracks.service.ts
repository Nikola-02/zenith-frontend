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
  });

  constructor(private http: HttpClient) {}

  fetchTracks(search: string) {
    let data = {
      keyword: search,
    };

    return this.http.get(`${this.apiUrl}tracks`, {
      headers: this.headersNoAuth,
      params: data,
    });
  }

  fetchSingleTrack(id) {
    return this.http.get(`${this.apiUrl}tracks/` + id, noAuthOptions);
  }

  fetchFilters() {
    return this.http.get(`${this.apiUrl}filters`, noAuthOptions);
  }
}
