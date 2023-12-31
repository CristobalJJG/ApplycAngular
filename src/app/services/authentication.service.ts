import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  sendEmailVerification,
} from 'firebase/auth';

import { environment } from 'src/environments/environment.development';
import { initializeApp } from 'firebase/app';
import { SnackbarService } from './aux-components/snackbar.service';
import { DatabaseService } from './database.service';
import { CookieService } from 'ngx-cookie-service';
import { ErrorManagerService } from './error-manager.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private static app = initializeApp(environment.firebaseConfig);
  private static auth = getAuth(AuthenticationService.app);
  private error = '';
  static user = AuthenticationService.auth?.currentUser;

  public static getApp() {
    return this.app;
  }

  public static getAuth() {
    return this.auth;
  }

  constructor(
    private sbs: SnackbarService,
    private db: DatabaseService,
    private cs: CookieService,
    private ms: ErrorManagerService,
    private router: Router
  ) {}

  /*
   * Decimos que un usuario está loggeado cuando su username y su uid están en las cookies
   * También es necesario que el uid exista.
   */
  async isUserLogged() {
    let check1 = this.cs.check('applyc_username');
    let check2 = this.cs.check('applyc_uid');
    let check3 = false;
    if (check2) {
      let uid = this.cs.get('applyc_uid');
      let snap = await this.db.getUserInfo(uid);
      if (snap) check3 = true;
    }
    let res = check1 && check2;
    if (!res) {
      this.sbs.openSnackBar('snack.problem', '');
      setTimeout(() => {}, 2000);
    }
    return res;
  }

  async login(userEmail: string, password: string) {
    let error = [''];
    await signInWithEmailAndPassword(
      AuthenticationService.auth,
      userEmail,
      password
    )
      .then((result) => {
        AuthenticationService.user = result.user;
        if (!result.user.emailVerified) {
          this.sbs.openSnackBar('snack.validate', '');
          this.logout();
        } else {
          this.cs.set('applyc_username', userEmail.split('@')[0]);
          this.cs.set('applyc_uid', result.user.uid);
          this.sbs.openSnackBar('snack.login', '');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((e) => {
        this.showError(error);
        this.logout();
        error[0] = this.ms.manageErrors(e.code);
      });
    if (error[0] != '') return error[0];
    else return '';
  }

  async register(userEmail: string, password: string) {
    await createUserWithEmailAndPassword(
      AuthenticationService.auth,
      userEmail,
      password
    )
      .then((result) => {
        this.db.addNewUser(result.user.uid || '', result.user.email || '');
        sendEmailVerification(result.user)
          .then(() =>
            this.sbs.openSnackBar('Correo de validación enviado con exito', '')
          )
          .catch((error) =>
            this.sbs.openSnackBar(
              'Error al crear el usuario: ' + error.message,
              ''
            )
          );
      })
      .catch((error) => this.showError(error));
    return this.error;
  }

  async logout() {
    await signOut(AuthenticationService.auth)
      .then(() => {
        AuthenticationService.user = null;
        this.cs.deleteAll();
        this.router.navigateByUrl('/home');
      })
      .catch((error) => this.showError(error));
  }

  showError(error: any) {
    const ec = error.code;
    const em = error.message;
    console.error(ec, em);
  }
}
