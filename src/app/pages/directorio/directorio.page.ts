import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Person } from 'src/app/classes/Person';
import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogService } from 'src/app/services/aux-components/dialog.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})
export class DirectorioPage {
  personArray: Person[] = [];
  filteredArray: Person[] = [];
  isAdmin: boolean = false;

  constructor(
    private db: DatabaseService,
    private auth: AuthenticationService,
    private cs: CookieService,
    private dialog: DialogService
  ) {
    this.isRegistered();
  }

  async isRegistered() {
    if (await !this.auth.isUserLogged()) location.href = '/not-logged';
    let uid = this.cs.get('applyc_uid');
    this.db.getUserInfo(uid).then((user: Person | undefined) => {
      this.isAdmin = false;
      this.db.isUserAdmin(uid).then((res: boolean) => {
        this.isAdmin = res;
      });
    });
    this.getUsers();
  }

  getUsers() {
    this.personArray = [];
    this.filteredArray = [];
    this.db.getAllUserInformation().then((pa: Person[]) => {
      pa.forEach((p) => {
        this.personArray.push(p);
        this.filteredArray.push(p);
      });
    });
  }

  openAddUserDialog() {
    this.dialog.openDialog(AddUserComponent);
  }
}
