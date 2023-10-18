import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(component: any, data?: Object) {
    this.dialog.open(component, { data: data });
  }
}
