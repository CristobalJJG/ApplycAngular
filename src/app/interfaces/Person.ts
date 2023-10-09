export class Person {
  id: string;
  personalData?: PersonalData;
  contactData?: ContactData;
  professionalData?: ProfessionalData;

  constructor(
    id: string,
    personalData?: PersonalData,
    contactData?: ContactData,
    professionalData?: ProfessionalData
  ) {
    this.id = id;
    if (personalData) this.personalData = personalData;
    if (contactData) this.contactData = contactData;
    if (professionalData) this.professionalData = professionalData;
  }

  getId() {
    return this.id;
  }

  getName() {
    return `${this.personalData?.name}`;
  }

  isAdmin() {
    return this.personalData?.isAdmin;
  }

  getEmail() {
    return this.contactData?.corporativeEmail;
  }

  getFullUsername() {
    return `${this.personalData?.name} ${this.personalData?.surname1} ${this.personalData?.surname2}`;
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
}

export enum Gender {
  Male = 'M.',
  Female = 'Mme.',
  Other = '',
}

export interface PersonalData {
  name: string;
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
  altaDate: Date;
  bajaDate: Date;
  aditionalInfo: string;
}
