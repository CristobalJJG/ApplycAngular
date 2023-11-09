import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SnackbarService } from 'src/app/services/aux-components/snackbar.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage {
  username: string = '';
  id: string = '';
  constructor(
    private cs: CookieService,
    private auth: AuthenticationService,
    private db: DatabaseService
  ) {
    this.isRegistered();
  }
  async isRegistered() {
    if (await !this.auth.isUserLogged()) location.href = '/not-logged';
    this.username = this.cs.get('applyc_username');
    this.id = this.cs.get('applyc_uid');
    this.db.isUserAdmin(this.id);
  }
}
