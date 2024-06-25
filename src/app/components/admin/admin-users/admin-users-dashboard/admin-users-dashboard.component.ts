import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopUpService } from '../../../../shared/services/pop-up.service';
import { AdminUsersService } from '../admin-users.service';
import { IUser } from '../../../../shared/interfaces/i-user';
import { IUserDTO } from '../../../../shared/interfaces/i-user-dto';
import { DeleteCheckDialogComponent } from '../../../../shared/abstract/delete-check-dialog/delete-check-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-users-dashboard',
  templateUrl: './admin-users-dashboard.component.html',
  styleUrl: './admin-users-dashboard.component.scss',
})
export class AdminUsersDashboardComponent implements OnInit, OnDestroy {
  public users: IUserDTO[];
  readonly dialog = inject(MatDialog);

  private usersSub: Subscription;
  private deleteUserSub: Subscription;
  private deleteDialogSub: Subscription;

  constructor(
    private popUpService: PopUpService,
    private adminUsersService: AdminUsersService
  ) {}

  ngOnInit(): void {
    this.fetchAdminUsers();
  }

  fetchAdminUsers() {
    this.usersSub = this.adminUsersService.fetchUsersAdmin().subscribe({
      next: (response) => {
        let responseObj: IUserDTO[] = response as IUserDTO[];

        this.users = responseObj;
      },
      error: (error) => {
        console.log(error);

        if (error.status == 500) {
          this.popUpService.show(
            'Error occured while fetching users.',
            'error-snack-bar'
          );
          return;
        }

        this.popUpService.show(
          'Error occured while fetching users.',
          'error-snack-bar'
        );
      },
    });
  }

  deleteUser(userId) {
    const dialogRef = this.dialog.open(DeleteCheckDialogComponent);
    this.deleteDialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUserSub = this.adminUsersService
          .deleteUser(userId)
          .subscribe({
            next: (response) => {
              this.popUpService.show(
                'Successfully deleted user.',
                'success-snack-bar'
              );

              this.fetchAdminUsers();
            },
            error: (error) => {
              console.log(error);

              if (error.status == 500) {
                this.popUpService.show(
                  'Error occured while deleting user.',
                  'error-snack-bar'
                );
                return;
              }

              this.popUpService.show(
                'Error occured while deleting user.',
                'error-snack-bar'
              );
            },
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }

    if (this.deleteUserSub) {
      this.deleteUserSub.unsubscribe();
    }

    if (this.deleteDialogSub) {
      this.deleteDialogSub.unsubscribe();
    }
  }
}
