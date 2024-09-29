import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

let isConnected = false;

export const connectToDB = async () : Promise<boolean> => {
  if (!process.env.MONGODB_URL) {
    console.log('Missing MongoDB URL among env variables');
    return false;
  }
  
  if (isConnected) {
    console.log('MongoDB connection already exists');
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log('Connected to MongoDB');
    
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
    isConnected = false;
  }

  return isConnected;
}

export default connectToDB;