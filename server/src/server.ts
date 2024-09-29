import express from 'express';
import cors from 'cors';
import connectToDB from './mongoose';
import dotenv from 'dotenv';

import createHashKey from './utils/hashing';
import Quote from './models/Quote';
import { AppPageRouteModule } from 'next/dist/server/future/route-modules/app-page/module.compiled';

const app = express();
const port = 4000;

dotenv.config(); // configures environment
app.use(cors());
app.use(express.json());

connectToDB(); // create connection to MongoDB

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('it works!');
});

app.post('/savequote', async (req, res) => {
  console.log('/savequote');

  const { author, text } = req.body;

  const quote = {
    author: author,
    text: text,
    hash_id: ''
  }
  quote.hash_id = createHashKey(quote);

  const quoteExists = await Quote.findOne({ hash_id: quote.hash_id });

  if (!quoteExists) {
    new Quote(quote).save(); // save quote to MongoDB
  }
});

app.get('/fetchquote', async (req, res) => {
  console.log('/fetchquote');

  try {
    const recordCount = await Quote.countDocuments(); 
    const randomNum = Math.floor(Math.random() * recordCount);
    const randomQuote = await Quote.findOne().skip(randomNum);

    res.json(randomQuote);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch count' });
  }
});

app.get('/fetchall', async (req, res) => {
  console.log('/fetchall');

  try {
    const quotes = await Quote.find(); // Fetch all records
    res.json(quotes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quotes' });
  }
});
