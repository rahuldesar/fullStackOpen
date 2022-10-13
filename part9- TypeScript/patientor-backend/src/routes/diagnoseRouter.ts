import express from "express";
import diagnoseService from "../services/diagnoseService";


const router = express.Router();

router.get('/', (_req, res) => {
  console.log(diagnoseService.showDiagnosis());
  res.send(diagnoseService.showDiagnosis());
});


//!not required ?
router.get('/simple', (_req, res) => {
  console.log(diagnoseService.showSimpleDiagnosis());
  res.send(diagnoseService.showSimpleDiagnosis());
});

// ! REMOVE _ from req, req .. later while implementing logic
// TODO : save data while making post request.
router.post('/', (_req,_res) => {
  console.log('SAVING DIAGNOSIS.. LATER');
});

export default router;