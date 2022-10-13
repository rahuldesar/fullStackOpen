import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";


const router = express.Router();


router.get('/', (_req,res) =>{
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/',(req, res) => {
  try{
    // addPatientEntry
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatientEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown){
    let errorMessage = "Something went wrong.";

    if(error instanceof Error) { 
      errorMessage += " Error " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;