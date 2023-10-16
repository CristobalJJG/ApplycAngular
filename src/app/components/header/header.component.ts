import { Component } from '@angular/core';
import { TranslateService } from 'src/app/services/translate.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  lang = '';
  user: string = ''; // Solo necesitamos el username

  constructor(
    private ts: TranslateService,
    private cs: CookieService,
    private auth: AuthenticationService,
    private sbs: SnackbarService
  ) {
    this.lang = ts.getLang();
    let aux = cs.get('username');
    if (aux) this.user = aux;
  }

  translate() {
    this.ts.translate(this.lang);
  }

  logout() {
    this.auth.logout().then(() => {
      this.sbs.openSnackBar('snack.logout', '');
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    });
  }
}
