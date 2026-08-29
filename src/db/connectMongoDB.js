import mongoose from 'mongoose';

import dns from 'node:dns';
import { Note } from '../models/note.js';
dns.setServers(['1.1.1.1', '8.8.8.8']);

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB connection established successfully');

    await Note.syncIndexes();
    console.log('Indexes synced successfully');
  } catch (error) {
    console.error('Failed to connect to the MongoDB Database: ', error.message);
    process.exit(1);
  }
};
