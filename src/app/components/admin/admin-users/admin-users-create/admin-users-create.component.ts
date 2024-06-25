import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminUsersService } from '../admin-users.service';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users-create',
  templateUrl: './admin-users-create.component.html',
  styleUrl: './admin-users-create.component.scss',
})
export class AdminUsersCreateComponent implements OnDestroy {
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

  public validationErrors;

  public createUserSub: Subscription;

  constructor(
    private adminUsersService: AdminUsersService,
    private popUpService: PopUpService,
    private router: Router
  ) {}

  onCreateNewUser() {
    if (this.form.valid) {
      let formData = {
        username: this.form.get('username')?.value,
        firstName: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      };

      this.createUserSub = this.adminUsersService
        .createNewUser(formData)
        .subscribe({
          next: (response) => {
            this.popUpService.show(
              'Successfully added user.',
              'success-snack-bar'
            );

            this.router.navigate(['/admin/users']);
          },
          error: (error) => {
            console.log(error);

            if (error.status == 401) {
              this.popUpService.show(
                'You dont have permission to do this action.',
                'error-snack-bar'
              );
              return;
            }

            if (error.status == 422) {
              this.validationErrors = error.error;
              return;
            }

            if (error.status == 500) {
              this.popUpService.show(
                'Error occured while adding user.',
                'error-snack-bar'
              );
              return;
            }

            this.popUpService.show(
              'Error occured while adding user.',
              'error-snack-bar'
            );
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
    if (this.createUserSub) {
      this.createUserSub.unsubscribe();
    }
  }
}
