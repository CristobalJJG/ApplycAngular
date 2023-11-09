import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';
import { Person } from '../classes/Person';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  db = getFirestore(AuthenticationService.getApp());

  /**
   * Obtiene la información de un usuario de la base de datos.
   *
   * @param {string} id El ID del usuario.
   */
  async getUserInfo(id: string) {
    let snap = await getDoc(doc(this.db, 'users', id));
    if (snap.data() != undefined) {
      return new Person(
        snap.id,
        snap.data()!['info']['personalData'],
        snap.data()!['info']['contactData'],
        snap.data()!['info']['professionalData']
      );
    } else {
      console.error(
        'Los credenciales no están bien, cierra sesión y logéate de nuevo, por favor.'
      );
      return undefined;
    }
  }

  async isUserAdmin(id: string) {
    let res = false;
    let snap = await getDoc(doc(this.db, 'users', id));

    const q = query(collection(this.db, 'users'));
    const querySnapshot = await getDocs(q);

    var BreakException = {};
    try {
      querySnapshot.forEach((doc) => {
        if (doc.id == snap.id) {
          res = true;
          throw BreakException;
        }
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }

    return res;
  }

  /**
   * Añade un nuevo usuario a la base de datos.
   *
   * @param {string} id El ID del usuario.
   * @param {string} mail El correo corporativo del usuario.
   */
  async addNewUser(id: string, mail: string) {
    let user = new Person(id);
    user.setCorporativeEmail(mail);
    this.updateUser(id, user);
  }

  async updateUser(id: string, user: Person) {
    let info = user.getUserInfoJSON();
    await setDoc(doc(this.db, 'users', id), { info });
  }

  /**
   * Actualiza el nombre de un usuario en la base de datos.
   *
   * @param {string} firstName El primer nombre del usuario.
   * @param {string} firstSurname El primer apellido del usuario.
   * @param {string} secondName El segundo nombre del usuario (opcional).
   * @param {string} secondSurname El segundo apellido del usuario (opcional).
   */
  /*   async updateUserName(
    firstName: string,
    firstSurname: string,
    secondName?: string,
    secondSurname?: string
  ) {
    let name = this.toPascal(firstName);
    let surname = this.toPascal(firstSurname);
    if (secondName) name += ' ' + this.toPascal(secondName);
    if (secondSurname) surname += ' ' + this.toPascal(secondSurname);
  } */

  /**
   * Convierte una cadena a PascalCase.
   *
   * @param {string} str La cadena a convertir.
   * @returns {string} La cadena convertida a PascalCase.
   */
  protected toPascal(str: string) {
    return (
      str.charAt(0).toUpperCase() + str.substring(1, str.length).toLowerCase()
    );
  }

  /**
   * Obtiene toda la información de los usuarios almacenados en la base de datos.
   *
   * @returns {Promise<void>} Una promesa que se resuelve cuando se obtiene la información de los usuarios.
   */
  async getAllUserInformation() {
    const q = query(collection(this.db, 'users'));
    const querySnapshot = await getDocs(q);
    let pa: Person[] = [];
    querySnapshot.forEach((doc) => {
      let p = new Person(
        doc.id,
        doc.data()['info']['personalData'],
        doc.data()['info']['contactData'],
        doc.data()['info']['professionalData']
      );
      pa.push(p);
    });
    return pa;
  }
}
