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

    // Older deployments had a unique `externalId` index on users. That field
    // is no longer part of the User schema, so documents without it all share
    // the same null index key and the second registration fails with E11000.
    // Remove only that obsolete index; preserve every current/other index.
    const usersCollection = conn.connection.db?.collection('users');
    if (usersCollection) {
      const indexes = await usersCollection.listIndexes().toArray();
      for (const index of indexes) {
        if (index.name !== '_id_' && Object.hasOwn(index.key, 'externalId')) {
          await usersCollection.dropIndex(index.name);
          console.log(`[Database] Dropped obsolete users index: ${index.name}`);
        }
      }
    }

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
