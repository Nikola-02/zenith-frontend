import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  constructor(private snackBar: MatSnackBar) {}

  show(
    message: string,
    className: string = '',
    action: string = '',
    duration: number = 4000
  ): void {
    this.snackBar.open(message, action, {
      duration,
      panelClass: className,
    });
  }
}
