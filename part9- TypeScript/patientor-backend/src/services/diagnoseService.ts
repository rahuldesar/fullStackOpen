import diagnosis from '../../data/diagnosis';
import {DiagnosisEntry ,shortDiagnoseEntry } from '../types';

// , DiagnoseEntry


const showDiagnosis = () : DiagnosisEntry[] => {
  return diagnosis;
};

const showSimpleDiagnosis = () : shortDiagnoseEntry[] => {
  return diagnosis.map(({code, name }) => ({code, name}));
};

export default { 
  showDiagnosis,
  showSimpleDiagnosis
};