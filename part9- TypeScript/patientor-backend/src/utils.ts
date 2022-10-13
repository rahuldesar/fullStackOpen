import { Gender, NewPatientEntry } from "./types";

// * TYPE-GUARD => returns a boolean and has a type predicate as the return type
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};


// * PARSING GENDER 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param : any) : param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender : unknown) : Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender : ' + gender);
  }
  return gender;
};


// * PARSING DOB 
const isDate = ( date: string) : boolean => {
  return Boolean(Date.parse(date));
};

const parseDOB = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or Missing DOB :' + date);
  }
  return date;
};

// * PARSING NAME 

const parseString = (value : unknown) : string => {
  if(!value || !isString(value)){
    throw new Error('Incorrect or missing content :' +value);
  }
  return value;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = ({name, dateOfBirth, occupation, ssn, gender} : any) : NewPatientEntry => {
  const newEntry = { 
    name : parseString(name),
    dateOfBirth: parseDOB(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
  };

  return newEntry;
};


export default toNewPatientEntry;