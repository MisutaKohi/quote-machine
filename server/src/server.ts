import express from 'express';
import cors from 'cors';
import connectToDB from './mongoose';
import dotenv from 'dotenv';

import createHashKey from './utils/hashing';

const app = express();
const port = 4000;

dotenv.config(); // configures environment
app.use(cors());

connectToDB();

app.get('/', async (req, res) => {
  res.send('It worked!');

  const quote = {
    author: 'Dumbledore',
    text: 'Do you not see?'
  };
  
  const hash = createHashKey(quote);

  console.log(hash);
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});