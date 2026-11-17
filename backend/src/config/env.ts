import 'dotenv/config';

export interface EnvironmentConfig {
  port: number;
  mongodbUri: string;
  mongodbDbName: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtIssuer: string;
  jwtAudience: string;
  corsOrigin: string;
  authRateLimitWindowMs: number;
  authRateLimitMax: number;
}

const requireEnvironmentVariable = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Falta la variable de entorno ${name}.`);
  return value;
};

const readPort = (): number => {
  const rawPort = process.env.PORT?.trim() ?? '3000';
  const port = Number(rawPort);
  if (!/^\d+$/.test(rawPort) || !Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error('PORT debe ser un entero entre 1 y 65535.');
  }
  return port;
};

const parsePositiveInteger = (name: string, fallback: string): number => {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${name} debe ser un número entero mayor que cero.`);
  }
  return value;
};

export const loadEnvironment = (): EnvironmentConfig => ({
  port: readPort(),
  mongodbUri: requireEnvironmentVariable('MONGODB_URI'),
  mongodbDbName: requireEnvironmentVariable('MONGODB_DB_NAME'),
  jwtSecret: requireEnvironmentVariable('JWT_SECRET'),
  jwtExpiresIn: requireEnvironmentVariable('JWT_EXPIRES_IN'),
  jwtIssuer: requireEnvironmentVariable('JWT_ISSUER'),
  jwtAudience: requireEnvironmentVariable('JWT_AUDIENCE'),
  corsOrigin: process.env.CORS_ORIGIN?.trim() ?? 'http://localhost:5173',
  authRateLimitWindowMs: parsePositiveInteger('AUTH_RATE_LIMIT_WINDOW_MS', '900000'),
  authRateLimitMax: parsePositiveInteger('AUTH_RATE_LIMIT_MAX', '10')
});