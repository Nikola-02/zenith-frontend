import { Injectable, OnInit } from '@angular/core';
import { IRegisterUser } from '../../shared/interfaces/i-register-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, noAuthOptions } from '../../../environment';
import { ILoginUser } from '../../shared/interfaces/i-login-user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../shared/interfaces/i-user';
import { logoutIfTokenExpired } from '../../app.module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private apiUrl = environment.apiUrl;
  public $userSubject = new BehaviorSubject<IUser | null>(null);
  public $tokenExpired = new BehaviorSubject<string>('');
  private adminUseCaseId: number = 39;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

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

        localStorage.removeItem('user_token');

        this.router.navigate(['/login']);
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

  isAuthorized() {
    let token = localStorage.getItem('user_token');
    if (token) {
      let user = this.jwtHelper.decodeToken(token);

      if (logoutIfTokenExpired(user)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  isAdmin() {
    let token = localStorage.getItem('user_token');
    if (token) {
      let user = this.jwtHelper.decodeToken(token);

      let userObj = user as IUser;

      let useCases: number[] = JSON.parse(userObj.UseCaseIds);

      if (logoutIfTokenExpired(userObj)) {
        return false;
      } else if (useCases.includes(this.adminUseCaseId)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getTokenFromLS() {
    return localStorage.getItem('user_token');
  }

  logout() {
    localStorage.removeItem('user_token');

    this.notifyForLoggedUser();
  }
}
