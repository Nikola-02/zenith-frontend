import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  fileUpload(formData) {
    return this.http.post(`${this.apiUrl}files`, formData);
  }
}
