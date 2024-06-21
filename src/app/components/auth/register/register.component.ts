import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { IRegisterUser } from '../../../shared/interfaces/i-register-user';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PopUpService } from '../../../shared/services/pop-up.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  registerSub: Subscription;
  validationErrors: { error: string }[] = [];

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
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

  register() {
    if (this.form.valid) {
      let registerValues: IRegisterUser = this.form.value as IRegisterUser;

      this.registerSub = this.authService.register(registerValues).subscribe({
        next: (response) => {
          this.validationErrors = [];

          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
          if (error.status == 422) {
            this.validationErrors = error.error;
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
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }
}
