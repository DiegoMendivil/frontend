import mongoose from 'mongoose';

export interface DatabaseConfig {
  uri: string;
  dbName: string;
}

export const connectDatabase = async (config?: Partial<DatabaseConfig>): Promise<void> => {
  const uri = config?.uri ?? process.env.MONGODB_URI;
  const dbName = config?.dbName ?? process.env.MONGODB_DB_NAME ?? 'task_api';

  if (!uri) {
    throw new Error('Falta la variable de entorno MONGODB_URI.');
  }

  await mongoose.connect(uri, {
    dbName,
    serverSelectionTimeoutMS: 5000
  });
  console.log('Conexión con MongoDB establecida.');
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};