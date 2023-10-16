import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(
    private _snackBar: MatSnackBar,
    private translate: TranslatePipe
  ) {}

  openSnackBar(name: string, button: string) {
    this._snackBar.open(
      this.translate.transform(name),
      this.translate.transform(button),
      {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5 * 1000,
      }
    );
  }
}
