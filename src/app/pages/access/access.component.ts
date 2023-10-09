import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
})
export class AccessComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private snack: SnackbarService
  ) {}

  user: string | null | undefined =
    AuthenticationService.getAuth().currentUser?.email;

  pastEmail: string = '';
  pastPassword: string = '';

  error: string = '';

  ngOnInit() {
    /* if (this.user != undefined) 
       window.location.href = '';  */
  }

  async login(email: string, password: string) {
    if (email == this.pastEmail || password == this.pastPassword) {
      this.manageErrors('sameThanBefore');
    }
    this.pastEmail = email;
    this.pastPassword = password;
    await this.auth
      .login(email, password)
      .then((res) => {
        this.user = res;
        this.snack.openSnackBar(this.user);
      })
      .catch((e) => console.log(e));
  }

  manageErrors(e: string) {
    switch (e) {
      case 'sameThanBefore':
        this.error = 'same';
        break;
    }
  }
}
