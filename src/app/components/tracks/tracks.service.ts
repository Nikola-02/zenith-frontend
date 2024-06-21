import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchTracks() {
    return this.http.get(`${this.apiUrl}tracks`);
  }
}
