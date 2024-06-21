import { Component } from '@angular/core';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'zenith-frontend';

  constructor(private authService: AuthService) {
    this.authService.notifyForLoggedUser();
  }
}
