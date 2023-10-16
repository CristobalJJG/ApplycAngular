import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorManagerService {
  constructor() {}

  manageErrors(e: string) {
    console.log(e);

    switch (e) {
      case 'ok':
        return 'ok';
      case 'sameThanBefore':
        return 'error.sameBefore';
      case 'auth/email-already-exists':
        return 'error.exists';
      case 'auth/insufficient-permission':
        return 'error.perm';
      case 'auth/internal-error':
        return 'error.intern';
      case 'auth/invalid-email':
        return 'error.invalid-mail';
      case 'auth/invalid-password':
        return 'error.invalid-pass';
      case 'auth/user-not-found':
        return 'error.not-found';
      case 'auth/invalid-login-credentials':
        return 'error.invalid-cred';
      case 'auth/too-many-requests':
        return 'error.many-tries';
      default:
        return 'error.chungo';
    }
  }
}
