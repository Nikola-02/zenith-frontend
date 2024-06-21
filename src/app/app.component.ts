import { Component } from '@angular/core';
import { AuthService } from './components/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'zenith-frontend';

  constructor(
    private authService: AuthService,
    public jwtHelper: JwtHelperService
  ) {
    this.authService.notifyForLoggedUser();
  }
}
