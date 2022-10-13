import { nonSensitivePatientEntry } from '../types';

import patientEntries from '../../data/patients';


//* NOT USING PatientEntry because we dont want to show ssn in response.
const getNonSensitivePatientEntries = () : nonSensitivePatientEntry[] => {
  return patientEntries.map(({name, id, gender, occupation, dateOfBirth}) =>({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

  // return patientEntries;
};

export default { 
  getPatientEntries: getNonSensitivePatientEntries
};
