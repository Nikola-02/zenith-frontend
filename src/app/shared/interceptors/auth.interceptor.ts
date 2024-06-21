// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '../../components/auth/auth.service';
import { Router } from '@angular/router';
import { logoutIfTokenExpired } from '../../app.module';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('user_token');

    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    if (token) {
      let user = this.jwtHelper.decodeToken(token);

      if (logoutIfTokenExpired(user)) {
        this.router.navigate(['/login']);
        this.authService.notifyTokenExpired();
        return EMPTY;
      }

      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(clonedReq);
    } else {
      this.router.navigate(['/login']);
      this.authService.notifyTokenExpired();
      return EMPTY;
    }
  }
}
