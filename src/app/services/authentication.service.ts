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
import { SnackbarService } from './snackbar.service';
import { DatabaseService } from './database.service';
import { CookieService } from 'ngx-cookie-service';
import { ErrorManagerService } from './error-manager.service';
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
    private ms: ErrorManagerService
  ) {}

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
          this.cs.set('username', userEmail.split('@')[0]);
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
        this.cs.delete('username');
      })
      .catch((error) => this.showError(error));
  }

  showError(error: any) {
    const ec = error.code;
    const em = error.message;
    console.error(ec, em);
  }
}
