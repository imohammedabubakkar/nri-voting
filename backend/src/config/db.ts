import mongoose from 'mongoose';
import { config } from './index.js';

export async function connectDB(): Promise<typeof mongoose> {
  if (!config.mongoUri) {
    throw new Error('MONGO_URI is not configured. Set it in backend/.env or the backend host environment.');
  }

  try {
    mongoose.set('bufferCommands', false);
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database] Error connecting to MongoDB: ${(error as Error).message}`);
    console.error('[Database] Check MONGO_URI, Atlas credentials, and the Atlas Network Access IP allowlist.');
    throw error;
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
}
