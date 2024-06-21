import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../../shared/interfaces/i-user';
import { Router } from '@angular/router';
import { logoutIfTokenExpired } from '../../../app.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  public user: IUser;
  private adminUseCaseId: number = 39;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.$userSubject.subscribe((user) => {
      console.log(user);

      if (user) {
        if (logoutIfTokenExpired(user)) this.expiredTokenLogout();
      }

      this.user = user as IUser;
    });
  }

  isAdmin() {
    let useCases: number[] = JSON.parse(this.user.UseCaseIds);

    return useCases.includes(this.adminUseCaseId);
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/']);
  }

  expiredTokenLogout() {
    this.authService.logout();

    this.authService.notifyTokenExpired();

    this.router.navigate(['/login']);
  }
}
