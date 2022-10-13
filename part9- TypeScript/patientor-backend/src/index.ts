import express from 'express';
import cors from 'cors';

import diagnoseRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';


const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send({});
});


app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
});

