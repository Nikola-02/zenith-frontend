import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  private apiUrl = environment.apiUrl;
  public headersNoAuth = new HttpHeaders({
    'No-Auth': 'True',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  fetchUsersAdmin() {
    return this.http.get(`${this.apiUrl}adminUsers`, {
      headers: this.headersNoAuth,
    });
  }

  createNewUser(formData) {
    return this.http.post(`${this.apiUrl}users`, formData, {
      headers: this.headersNoAuth,
    });
  }

  deleteUser(userId) {
    return this.http.delete(`${this.apiUrl}users/` + userId);
  }
}
