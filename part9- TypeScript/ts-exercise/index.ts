import express from "express";
import { parseBmiValues, calculateBmi, bmiValuesObj } from "./bmiCalculator";

// import qs from 'qs';
const app = express();


const PORT = 3004;

const getBmi= (height: number,weight: number, bmi: string ): bmiValuesObj => {
  return{
    height,
    weight,
    bmi
  }
}

app.get('/hello', (_req, res) => {
  res.send('HELLO FULLSTACK');
});

app.get('/bmi', (req, res) => {
  try{
    let {height, weight} = parseBmiValues(["0","0",String(req.query.height), String(req.query.weight)]);
    const bmi = (calculateBmi(height,weight));
    res.send(getBmi(height,weight,bmi));
  } catch (error: unknown) {
    if(error instanceof Error){
      res.send({error : error.message});
    }
  }
});

app.listen(PORT, () => {
  console.log(`SERVER running at port ${PORT}`);
})