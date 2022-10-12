import express from "express";
import { parseBmiValues, calculateBmi, getBmi } from "./bmiCalculatorQS";
const app = express();
const PORT = 3004;

app.get('/hello', (_req, res) => {
  res.send('HELLO FULLSTACK');
});


app.get('/bmi', (req, res) => {
  try{
    let {height, weight} = parseBmiValues([String(req.query.height), String(req.query.weight)]);
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