import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: string = '';

  constructor() {}

  getUser() {
    return this.user;
  }

  setUser(userName: string) {
    this.user = userName;
  }
}
