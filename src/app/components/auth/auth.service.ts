import { Injectable } from '@angular/core';
import { IRegisterUser } from '../../shared/interfaces/i-register-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { ILoginUser } from '../../shared/interfaces/i-login-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(formValues: IRegisterUser) {
    return this.http.post(`${this.apiUrl}users`, formValues);
  }

  login(formValues: ILoginUser) {
    return this.http.post(`${this.apiUrl}auth`, formValues);
  }
}
