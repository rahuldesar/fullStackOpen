import express from "express";
import { parseBmiValues, calculateBmi } from "./bmiCalculatorQS";
import { calculateExerciseP } from "./exerciseCalculatorPost";

const app = express();
const PORT = 3004;

app.use(express.json());

// * res.send({some : 'json'}) is same as res.json({some: 'json'})
app.get('/hello', (_req, res) => {
  res.send('HELLO FULLSTACK');
});


// * USAGE : 'http://localhost:3004/bmi?weight=180&height=181'
app.get('/bmi', (req, res) => {
  try{
    const {height, weight} = parseBmiValues([String(req.query.height), String(req.query.weight)]);
    const bmi = (calculateBmi(height,weight));
    res.json({height, weight, bmi});
  } catch (error: unknown) {
    if(error instanceof Error){
      res.json({error : error.message});
    }
  }
});


// * ......POST REQUEST FORMAT .......
// POST http://localhost:3004/exercises
// content-type: application/json
// 
// {
//   "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
//   "target": 2.5
// }
//

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;
  
  if(!daily_exercises || !target){
    return res.status(400).send('parameters missing');
  }

  if(Array.isArray(daily_exercises)){
    if(daily_exercises.length === 0 ) {
      return res.status(400).send('parameters missing at \'daily_exercises\' ');
    }
    for (let i = 0; i < daily_exercises.length; i++) {
      if(isNaN(Number(daily_exercises[i]))){
        return res.status(400).send(`malformatted parameters at 'daily_exercises' : ${daily_exercises[i]} `);
      }
    }
  }

  if(isNaN(Number(target))){
    return res.status(400).send(`malformatted parameters : target => ${target}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExerciseP(daily_exercises, Number(target));
  return res.send(result);
});



app.listen(PORT, () => {
  console.log(`SERVER running at port ${PORT}`);
});