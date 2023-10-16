export class Person {
  _id: string;
  personalData: PersonalData;
  contactData: ContactData;
  professionalData: ProfessionalData;

  constructor(
    _id: string,
    personalData?: PersonalData,
    contactData?: ContactData,
    professionalData?: ProfessionalData
  ) {
    this._id = _id;
    if (personalData) this.personalData = personalData;
    else
      this.personalData = {
        name1: '',
        name2: '',
        surname1: '',
        surname2: '',
        birthdate: '',
        nationality: '',
        dniNie: '',
        nSS: '',
        username: '',
        isAdmin: false,
        gender: Gender.Other,
      };
    if (contactData) this.contactData = contactData;
    else
      this.contactData = {
        corporativeEmail: '',
        address: '',
        personalEmail: '',
        postalCode: '',
        phoneNumber: '',
        municipio: '',
      };
    if (professionalData) this.professionalData = professionalData;
    else
      this.professionalData = {
        profession: '', //Docente, mantenimiento, etc
        department: '', //Departamento al que pertenece en la empresa
        aditionalInfo: '',
      };
  }

  /* Getters */
  get_Id() {
    return this._id;
  }
  getUserInfoJSON() {
    return {
      _id: this._id,
      personalData: {
        name1: this.personalData.name1,
        name2: this.personalData.name2,
        surname1: this.personalData.surname1,
        surname2: this.personalData.surname2,
        birthdate: this.personalData.birthdate,
        nationality: this.personalData.nationality,
        dniNie: this.personalData.dniNie,
        nSS: this.personalData.nSS,
        username: this.personalData.username,
        isAdmin: this.personalData.isAdmin || false,
        gender: this.personalData.gender || Gender.Other,
      },
      contactData: {
        corporativeEmail: this.contactData.corporativeEmail,
        address: this.contactData.address,
        personalEmail: this.contactData.personalEmail,
        postalCode: this.contactData.postalCode,
        phoneNumber: this.contactData.phoneNumber,
        municipio: this.contactData.municipio,
      },
      professionalData: {
        profession: this.professionalData.profession,
        department: this.professionalData.department,
        aditionalInfo: this.professionalData.aditionalInfo,
      },
    };
  }

  getName() {
    return `${this.personalData?.name1}`;
  }

  isAdmin() {
    return this.personalData?.isAdmin;
  }

  getEmail() {
    return this.contactData?.corporativeEmail;
  }

  getFullUsername() {
    return `${this.personalData?.name1} ${this.personalData?.name2} ${this.personalData?.surname1} ${this.personalData?.surname2}`;
  }

  getPersonalData() {
    return this.personalData;
  }

  getContactData() {
    return this.contactData;
  }

  getProfessionalData() {
    return this.professionalData;
  }

  /* Setters */

  setUsername(username: string) {
    this.personalData.username = username;
  }
  setPersonalEmail(email: string) {
    this.contactData.personalEmail = email;
  }
  setCorporativeEmail(email: string) {
    this.contactData.corporativeEmail = email;
  }
}

export enum Gender {
  Male = 'M.',
  Female = 'Mme.',
  Other = '',
}

export interface PersonalData {
  name1: string;
  name2: string;
  surname1: string;
  surname2?: string;
  birthdate?: string;
  nationality?: string;
  dniNie?: string;
  nSS: string;
  username: string;
  isAdmin: boolean;
  gender: Gender;
}

export interface ContactData {
  corporativeEmail: string;
  address: string;
  personalEmail: string;
  postalCode: string;
  phoneNumber: string;
  municipio: string;
}

export interface ProfessionalData {
  profession: string; //Docente, mantenimiento, etc
  department: string; //Departamento al que pertenece en la empresa
  aditionalInfo: string;
}
