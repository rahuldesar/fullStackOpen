export interface DiagnosisEntry { 
  code : string;
  name : string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}


export type shortDiagnoseEntry = Omit<DiagnosisEntry, 'latin'>;


export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string,
  ssn?: string
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type nonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

