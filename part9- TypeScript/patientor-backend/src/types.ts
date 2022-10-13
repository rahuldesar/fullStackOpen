export interface DiagnosisEntry { 
  code : string;
  name : string;
  latin?: string;
}

export type shortDiagnoseEntry = Omit<DiagnosisEntry, 'latin'>;

// "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
// "name": "Hans Gruber",
// "dateOfBirth": "1970-04-25",
// "ssn": "250470-555L",
// "gender": "male",
// "occupation": "Technician"


export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: string,
  occupation: string,
  ssn?: string
}

export type nonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

