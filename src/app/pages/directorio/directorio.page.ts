import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Person } from 'src/app/classes/Person';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})
export class DirectorioPage {
  personArray: Person[] = [];

  constructor(
    private db: DatabaseService,
    private auth: AuthenticationService,
    private cs: CookieService
  ) {
    if (!auth.isUserLogged()) location.href = '/not-logged';
    let uid = cs.get('applyc_uid');
    db.getAllUserInformation().then((pa: Person[]) => {
      pa.forEach((p) => this.personArray.push(p));
    });
  }
}
