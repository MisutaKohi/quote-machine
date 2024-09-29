import express from 'express';
import cors from 'cors';
import connectToDB from './mongoose';
import dotenv from 'dotenv';

const app = express();
const port = 4000;

dotenv.config(); // configures environment
app.use(cors());

app.get('/', async (req, res) => {
  res.send('It worked!');
  
  await connectToDB();
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});