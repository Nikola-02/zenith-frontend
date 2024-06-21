import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ILoginUser } from '../../../shared/interfaces/i-login-user';
import { IUserToken } from '../../../shared/interfaces/i-user-token';
import { Router } from '@angular/router';
import { PopUpService } from '../../../shared/services/pop-up.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginSub: Subscription;
  wrongCredentials: boolean = false;
  tokenExpired: string = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      this.passwordValidator(),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.authService.$tokenExpired.subscribe((message) => {
      this.tokenExpired = message;
    });
  }

  login() {
    if (this.form.valid) {
      let loginValues: ILoginUser = this.form.value as ILoginUser;

      this.loginSub = this.authService.login(loginValues).subscribe({
        next: (response) => {
          this.wrongCredentials = false;

          let tokenResponse: IUserToken = response as IUserToken;
          let token = tokenResponse.token;

          localStorage.setItem('user_token', token);

          this.authService.notifyForLoggedUser();

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
          if (error.status == 401) {
            this.wrongCredentials = true;
            return;
          }

          if (error.status == 500) {
            this.popUpService.show('Error occurred.', 'error-snack-bar');
            return;
          }

          this.popUpService.show('Error occurred.', 'error-snack-bar');
        },
      });
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Provera da li lozinka sadrži bar 8 karaktera, jedno veliko slovo, jedno malo slovo i jedan broj
      const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);

      return valid ? null : { invalidPassword: true };
    };
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
