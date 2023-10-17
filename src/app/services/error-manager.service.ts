import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorManagerService {
  private errors = new Map()
    .set('ok', 'ok')
    .set('sameThanBefore', 'error.sameBefore')
    .set('auth/email-already-exists', 'error.exists')
    .set('auth/insufficient-permission', 'error.perm')
    .set('auth/internal-error', 'error.intern')
    .set('auth/invalid-email', 'error.invalid-mail')
    .set('auth/invalid-password', 'error.invalid-pass')
    .set('auth/user-not-found', 'error.not-found')
    .set('auth/invalid-login-credentials', 'error.invalid-cred')
    .set('auth/too-many-requests', 'error.many-tries')
    .set('', '');
  constructor() {}

  manageErrors(e: string) {
    if (this.errors.has(e)) return this.errors.get(e);
    else return 'error.chungo';
  }
}
