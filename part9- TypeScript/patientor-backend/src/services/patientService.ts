import { nonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';
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
};

const addPatientEntry = ( entry : NewPatientEntry ) : PatientEntry => {
  const id: string = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  }; 

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};


export default { 
  getNonSensitivePatientEntries,
  addPatientEntry
};
