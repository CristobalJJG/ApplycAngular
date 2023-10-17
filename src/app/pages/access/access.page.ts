import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorManagerService } from 'src/app/services/error-manager.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
})
export class AccessComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private cs: CookieService,
    private ms: ErrorManagerService
  ) {}

  pastEmail: string | undefined = undefined;
  pastPassword: string | undefined = undefined;

  error: string = '';

  ngOnInit() {
    let aux = this.cs.get('username');
    if (aux != '') window.location.href = '';
  }

  async login(email: string, password: string) {
    if (email == this.pastEmail && password == this.pastPassword)
      this.error = this.ms.manageErrors('sameThanBefore');
    else {
      this.error = '';
      this.pastEmail = email;
      this.pastPassword = password;
      await this.auth.login(email, password).then((e) => (this.error = e));
    }
  }
}
