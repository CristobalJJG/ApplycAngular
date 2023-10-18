import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Person } from 'src/app/classes/Person';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(
    private db: DatabaseService,
    private auth: AuthenticationService,
    private cs: CookieService
  ) {}

  pastEmail: string | undefined = undefined;
  pastPassword: string | undefined = undefined;

  error: string = '';

  ngOnInit() {
    if (!this.auth.isUserLogged()) location.href = '/not-logged';
    let uid = this.cs.get('applyc_uid');
    this.db.getUserInfo(uid).then((user: Person) => {
      if (!user.isAdmin()) location.href = '/not-permission';
    });
  }

  async register(email: string, password: string) {
    await this.auth.register(email, password);
  }
}
