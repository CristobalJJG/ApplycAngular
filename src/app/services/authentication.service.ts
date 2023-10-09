import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendEmailVerification,
} from 'firebase/auth';

import { environment } from 'src/environments/environment.development';
import { getApp, initializeApp } from 'firebase/app';
import { Person } from '../interfaces/Person';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private static app = initializeApp(environment.firebaseConfig);
  private static auth = getAuth(AuthenticationService.app);

  private static user: Person;

  public static getApp() {
    return this.app;
  }

  public static getAuth() {
    return this.auth;
  }

  constructor() {}

  async register(userEmail: string, password: string) {
    await createUserWithEmailAndPassword(
      AuthenticationService.auth,
      userEmail,
      password
    )
      .then((result) => {
        sendEmailVerification(result.user)
          .then(() => {
            console.log('Validation email sent');
          })
          .catch((error) => {
            this.showError(error);
          });
      })
      .catch((error) => {
        this.showError(error);
      });
  }

  async logout() {
    await signOut(AuthenticationService.auth)
      .then(() => {
        console.log('Logged out successfully');
      })
      .catch((error) => {
        this.showError(error);
      });
  }

  showError(error: any) {
    const ec = error.code;
    const em = error.message;
    console.error(ec, em);
  }
}
