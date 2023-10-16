import { Injectable } from '@angular/core';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';
import { Person } from '../interfaces/Person';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  db = getFirestore(AuthenticationService.getApp());

  async getUserInfo(id: string) {
    let snap = await getDoc(doc(this.db, 'users', id));
    console.log(snap.data());
  }

  async addNewUser(id: string, mail: string) {
    let user = new Person(id);
    user.setCorporativeEmail(mail);
    let info = user.getUserInfoJSON();
    await setDoc(doc(this.db, 'users', id), { info });
  }

  async updateUserName(
    firstName: string,
    firstSurname: string,
    secondName?: string,
    secondSurname?: string
  ) {
    let name = this.toPascal(firstName);
    let surname = this.toPascal(firstSurname);
    if (secondName) name += ' ' + this.toPascal(secondName);
    if (secondSurname) surname += ' ' + this.toPascal(secondSurname);
  }

  protected toPascal(str: string) {
    return (
      str.charAt(0).toUpperCase() + str.substring(1, str.length).toLowerCase()
    );
  }
}
