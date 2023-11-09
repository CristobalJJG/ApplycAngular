import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  ContactData,
  Person,
  PersonalData,
  ProfessionalData,
} from 'src/app/classes/Person';
import { SnackbarService } from 'src/app/services/aux-components/snackbar.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['../personal.page.scss'],
})
export class PersonalInfoComponent implements OnInit {
  uid: string = '';

  personalData: PersonalData | undefined;
  professionalData: ProfessionalData | undefined;
  contactData: ContactData | undefined;
  constructor(
    private cs: CookieService,
    private db: DatabaseService,
    private sbs: SnackbarService
  ) {}

  async ngOnInit() {
    this.uid = this.cs.get('applyc_uid');
    await this.db.getUserInfo(this.uid).then((data) => {
      this.personalData = data?.getPersonalData();
      this.professionalData = data?.getProfessionalData();
      this.contactData = data?.getContactData();
    });
  }

  savePersonalData(item: string, e: any) {
    if (this.personalData)
      switch (item) {
        case 'name1':
          this.personalData.name1 = e;
          break;
        case 'name2':
          this.personalData.name2 = e;
          break;
        case 'surname1':
          this.personalData.surname1 = e;
          break;
        case 'surname2':
          this.personalData.surname2 = e;
          break;
        case 'birth':
          this.personalData.birthdate = e;
          break;
        case 'dniNie':
          this.personalData.dniNie = e;
          break;
        case 'gender':
          this.personalData.gender = e;
          break;
        case 'nSS':
          this.personalData.nSS = e;
          break;
        case 'nationality':
          this.personalData.nationality = e;
          break;
        case 'username':
          this.personalData.username = e;
          break;
        default:
          console.error('No existe el input');
      }
  }

  save() {
    let p = new Person(
      this.uid,
      this.personalData,
      this.contactData,
      this.professionalData
    );
    this.db
      .updateUser(this.uid, p)
      .then(() => {
        this.sbs.openSnackBar('snack.updateDone', '');
        setTimeout(() => {}, 2000);
      })
      .catch((e) => console.error(e));
  }
}
