import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(name: string) {
    this._snackBar.open(name, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5 * 1000,
    });
  }
}
