import express from 'express';
import { calculator } from './calculator';
const app = express();

app.use(express.json());


app.get('/ping', (_req, res) => {
  res.send("Pong");
});

app.post('/calculate', (req, res)  => {

  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {value1, value2, op} = req.body;
  
  if(!value1 || isNaN(Number(value1))){
    return res.status(400).send({error : 'First value validation error'});
  }
  if(!value2 || isNaN(Number(value2))){
    return res.status(400).send({error : 'Second value validation error'});
  }

  //eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  return res.send({result});
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`SERVER running at port ${PORT}`);
});