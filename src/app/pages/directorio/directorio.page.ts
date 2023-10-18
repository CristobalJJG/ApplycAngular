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
    if (!auth.isUserLogged()) location.href = '/not-logged';
    let uid = cs.get('applyc_uid');
    db.getUserInfo(uid).then((user: Person) => {
      this.isAdmin = user.isAdmin();
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
