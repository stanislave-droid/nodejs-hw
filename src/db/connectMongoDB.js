import mongoose from 'mongoose';

import dns from 'node:dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('Failed to connect to the MongoDB Database: ', error.message);
    process.exit(1);
  }
};
