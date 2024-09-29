import express from 'express';

const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.send('It worked!');
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});