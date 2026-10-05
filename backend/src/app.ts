import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from './config/index.js';
import apiRouter from './routes/index.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

export function createApp(): Express {
  const app = express();
  const configuredOrigins = config.corsOrigin
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin) => {
      if (origin === '*') return origin;
      try {
        return new URL(origin).origin;
      } catch {
        return origin.replace(/\/$/, '');
      }
    });
  const allowedOrigins = new Set([
    ...configuredOrigins,
    'http://localhost:5173',
    'http://localhost:3000',
  ]);

  // Middleware
  app.use(cors({
    origin: (origin, callback) => {
      // Requests from tools such as curl do not send an Origin header.
      if (!origin || configuredOrigins.includes('*') || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (config.nodeEnv !== 'test') {
    app.use(morgan('dev'));
  }

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    const databaseConnected = mongoose.connection.readyState === 1;
    res.status(databaseConnected ? 200 : 503).json({
      status: databaseConnected ? 'healthy' : 'unavailable',
      database: databaseConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
      service: 'Online Voting & Election Portal API',
      version: '1.0.0',
    });
  });

  // Mount API router
  app.use('/api', apiRouter);

  // 404 handler
  app.use(notFoundHandler);

  // Global error handler
  app.use(errorHandler);

  return app;
}

export const app = createApp();
