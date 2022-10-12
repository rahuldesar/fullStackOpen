import express from "express";
import { parseBmiValues, calculateBmi } from "./bmiCalculatorQS";
const app = express();
const PORT = 3004;


// * res.send({some : 'json'}) is same as res.json({some: 'json'})
app.get('/hello', (_req, res) => {
  res.send('HELLO FULLSTACK');
});


app.get('/bmi', (req, res) => {
  try{
    let {height, weight} = parseBmiValues([String(req.query.height), String(req.query.weight)]);
    const bmi = (calculateBmi(height,weight));
    res.json({height, weight, bmi});
  } catch (error: unknown) {
    if(error instanceof Error){
      res.json({error : error.message});
    }
  }
});


app.listen(PORT, () => {
  console.log(`SERVER running at port ${PORT}`);
})