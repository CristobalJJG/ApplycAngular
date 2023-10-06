export class Person {
  personalData?: PersonalData;
  contactData?: ContactData;
  professionalData?: ProfessionalData;

  constructor(
    personalData?: PersonalData,
    contactData?: ContactData,
    professionalData?: ProfessionalData
  ) {
    if (personalData) this.personalData = personalData;
    if (contactData) this.contactData = contactData;
    if (professionalData) this.professionalData = professionalData;
  }

  getName() {
    return `${this.personalData?.name}`;
  }
  getFullUsername() {
    return `${this.personalData?.name} ${this.personalData?.surname1} ${this.personalData?.surname2}`;
  }
}

export enum Gender {
  Male = 'M.',
  female = 'Mme.',
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
