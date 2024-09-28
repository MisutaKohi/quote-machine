import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});