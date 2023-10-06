import { Injectable } from '@angular/core';
import { Person } from '../interfaces/Person';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Person = new Person();

  getUser() {
    return this.user.getName();
  }
}
