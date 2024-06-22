import { Injectable, OnInit } from '@angular/core';
import { IRegisterUser } from '../../shared/interfaces/i-register-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, noAuthOptions } from '../../../environment';
import { ILoginUser } from '../../shared/interfaces/i-login-user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../shared/interfaces/i-user';
import { logoutIfTokenExpired } from '../../app.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private apiUrl = environment.apiUrl;
  public $userSubject = new BehaviorSubject<IUser | null>(null);
  public $tokenExpired = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.notifyForLoggedUser();
  }

  register(formValues: IRegisterUser) {
    return this.http.post(`${this.apiUrl}users`, formValues, noAuthOptions);
  }

  login(formValues: ILoginUser) {
    return this.http.post(`${this.apiUrl}auth`, formValues, noAuthOptions);
  }

  notifyForLoggedUser() {
    const token = localStorage.getItem('user_token');
    if (token) {
      const user: IUser | null = this.jwtHelper.decodeToken(token);

      if (logoutIfTokenExpired(user)) {
        this.$userSubject.next(null);
        return;
      }

      this.$userSubject.next(user);
    } else {
      this.$userSubject.next(null);
    }
  }

  notifyTokenExpired() {
    this.$tokenExpired.next('Token expired. Please login again.');
  }

  isUnauthorized() {
    return !this.getTokenFromLS();
  }

  getTokenFromLS() {
    return localStorage.getItem('user_token');
  }

  logout() {
    localStorage.removeItem('user_token');

    this.notifyForLoggedUser();
  }
}
