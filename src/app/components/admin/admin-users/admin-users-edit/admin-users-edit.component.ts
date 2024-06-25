import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminUsersService } from '../admin-users.service';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserDTO } from '../../../../shared/interfaces/i-user-dto';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrl: './admin-users-edit.component.scss',
})
export class AdminUsersEditComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  public validationErrors;

  public editUserSub: Subscription;
  public usersSub: Subscription;

  public user: IUserDTO;

  constructor(
    private adminUsersService: AdminUsersService,
    private popUpService: PopUpService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.fetchSingleUser(id);
    });
  }

  fetchSingleUser(id) {
    this.usersSub = this.adminUsersService.fetchUsersAdmin().subscribe({
      next: (response) => {
        let responseObj: IUserDTO[] = response as IUserDTO[];

        let user = responseObj.find((x) => x.id == id);

        if (!user) {
          this.router.navigate(['/admin']);
          return;
        }

        this.user = user;
        this.setFormValues();
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching user.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching user;',
          'error-snack-bar'
        );
      },
    });
  }

  setFormValues() {
    this.form.patchValue({
      username: this.user.username,
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    });
  }

  onEditUser(userId) {
    if (this.form.valid) {
      let formData = {
        username: this.form.get('username')?.value,
        firstName: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      };

      this.editUserSub = this.adminUsersService
        .editUser(userId, formData)
        .subscribe({
          next: (response) => {
            this.popUpService.show(
              'Successfully edited user.',
              'success-snack-bar'
            );

            this.router.navigate(['/admin/users']);
          },
          error: (error) => {
            console.log(error);

            if (error.status == 422) {
              this.validationErrors = error.error;
              return;
            }

            if (error.status == 500) {
              this.popUpService.show(
                'Error occured while editing user.',
                'error-snack-bar'
              );
              return;
            }

            this.popUpService.show(
              'Error occured while editing user.',
              'error-snack-bar'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.editUserSub) {
      this.editUserSub.unsubscribe();
    }

    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }
}
