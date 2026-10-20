import mongoose from 'mongoose';

export let isConnectedToMongo = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fraud_naashak';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000, // Quick timeout to fallback if mongod is not local
    });
    isConnectedToMongo = true;
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    isConnectedToMongo = false;
    console.warn(`[MongoDB Notice]: Could not connect to MongoDB at ${mongoURI} (${error.message}).`);
    console.log(`[Resilience Mode]: Activating High-Availability In-Memory Data Store for Fraud-Naashak.`);
  }
};
