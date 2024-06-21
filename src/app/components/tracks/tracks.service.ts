import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, noAuthOptions } from '../../../environment';
import { ITrack } from '../../shared/interfaces/i-track';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchTracks(search: string) {
    return this.http.get(`${this.apiUrl}tracks`, noAuthOptions);
  }

  fetchSingleTrack(id) {
    return this.http.get(`${this.apiUrl}tracks/` + id, noAuthOptions);
  }
}
