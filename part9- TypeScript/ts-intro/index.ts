import express from 'express';
const app = express();


app.get('/ping', (_req, res) => {
  res.send("Pong");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`SERVER running at port ${PORT}`);
})