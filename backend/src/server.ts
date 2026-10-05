import { app } from './app.js';
import { config } from './config/index.js';
import { connectDB, disconnectDB } from './config/db.js';
import { Admin } from './models/Admin.js';

async function startServer() {
  try {
    await connectDB();

    const defaultAdmin = await Admin.findOne({
      username: config.adminDefaultUsername.toLowerCase(),
    });
    if (!defaultAdmin) {
      await Admin.create({
        username: config.adminDefaultUsername,
        password: config.adminDefaultPassword,
        role: 'admin',
      });
      console.log(`[Bootstrap] Default admin created: ${config.adminDefaultUsername}`);
    }

    const server = app.listen(config.port, () => {
      console.log(`====================================================`);
      console.log(`🚀 Election Portal Backend API is running!`);
      console.log(`📡 URL: http://localhost:${config.port}`);
      console.log(`🏥 Health Check: http://localhost:${config.port}/api/health`);
      console.log(`🛡️  Admin Default: ${config.adminDefaultUsername} / ${config.adminDefaultPassword}`);
      console.log(`====================================================`);
    });

    // Graceful shutdown
    let shuttingDown = false;
    const handleShutdown = (signal: string) => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log('[Server] HTTP server closed.');
        disconnectDB().finally(() => process.exit(0));
      });
    };

    process.on('SIGINT', () => handleShutdown('SIGINT'));
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  } catch (error) {
    console.error('[Server] Fatal startup error:', error);
    console.error('[Server] API did not start because MongoDB is unavailable.');
    process.exit(1);
  }
}

startServer();
