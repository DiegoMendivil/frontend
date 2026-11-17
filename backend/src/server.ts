import 'dotenv/config';
import type { Server } from 'node:http';
import { app } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { loadEnvironment } from './config/env.js';

const connectWithRetry = async (uri: string, dbName: string): Promise<void> => {
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await connectDatabase({ uri, dbName });
      return;
    } catch {
      if (attempt === maxAttempts) throw new Error('DATABASE_CONNECTION_FAILED');
      console.warn(`No se pudo conectar con MongoDB (intento ${attempt}/${maxAttempts}); se reintentará.`);
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    }
  }
};

const startServer = async (): Promise<void> => {
  let server: Server | undefined;
  try {
    const env = loadEnvironment();
    await connectWithRetry(env.mongodbUri, env.mongodbDbName);
    server = app.listen(env.port, () => {
      console.log(`API disponible en http://localhost:${env.port}`);
    });

    let shuttingDown = false;
    const shutdown = (signal: NodeJS.Signals): void => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.log(`Señal ${signal} recibida; cerrando la API.`);
      server?.close(() => {
        void disconnectDatabase()
          .then(() => console.log('Conexión con MongoDB cerrada.'))
          .catch(() => {
            console.error('No fue posible cerrar MongoDB correctamente.');
            process.exitCode = 1;
          });
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'DATABASE_CONNECTION_FAILED') {
      console.error('No fue posible conectar con MongoDB después de varios intentos. Revise credenciales, despliegue y lista de acceso IP.');
    } else {
      console.error('No fue posible iniciar la API. Revise PORT y las variables de entorno requeridas.');
    }
    process.exitCode = 1;
  }
};

void startServer();