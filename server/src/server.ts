import express from 'express';
import cors from 'cors';
import connectToDB from './mongoose';
import dotenv from 'dotenv';

import createHashKey from './utils/hashing';
import Quote from './models/Quote';


const app = express();
const port = 4000;

dotenv.config(); // configures environment
app.use(cors());

connectToDB();

app.get('/', async (req, res) => {
  res.send('It worked!');

  const quote = {
    author: 'Dumbledore',
    text: 'Do you not see?',
    hash_id: ''
  };
  
  const hash = createHashKey(quote);
  quote.hash_id = hash;

  const newQuote = new Quote(quote);

  await newQuote.save();
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});