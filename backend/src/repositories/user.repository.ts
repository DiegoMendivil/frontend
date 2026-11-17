import mongoose, { type HydratedDocument } from 'mongoose';
import { AppError } from '../errors/app-error.js';
import { UserModel, type UserPersistence, type UserRole } from '../models/user.js';
import type { FieldIssue } from '../types/api-error.js';

type UserDocument = HydratedDocument<UserPersistence>;

const mapPersistenceError = (error: unknown): AppError => {
  if (error instanceof AppError) return error;
  if (error instanceof mongoose.Error.ValidationError) {
    const details: FieldIssue[] = Object.values(error.errors).map((item) => ({
      field: item.path,
      message: item.message
    }));
    return new AppError('El usuario no cumple las reglas del modelo.', 422, 'PERSISTENCE_VALIDATION_ERROR', details);
  }
  if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: number }).code === 11000) {
    return new AppError('Ya existe un usuario con ese correo.', 409, 'USER_ALREADY_EXISTS');
  }
  return new AppError('No fue posible acceder al almacenamiento de usuarios.', 503, 'DATABASE_UNAVAILABLE');
};

const execute = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error: unknown) {
    throw mapPersistenceError(error);
  }
};

export const findUserByEmail = async (email: string): Promise<UserDocument | null> =>
  execute(async () => UserModel.findOne({ email: email.toLowerCase() }));

export const findUserById = async (id: string): Promise<UserDocument | null> =>
  execute(async () => UserModel.findById(id));

export const createUserDocument = async (input: {
  name: string;
  email: string;
  passwordHash: string;
  role?: UserRole;
}): Promise<UserDocument> =>
  execute(async () => UserModel.create({
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash: input.passwordHash,
    role: input.role ?? 'user'
  }));

export const setUserRoleByEmail = async (email: string, role: UserRole): Promise<UserDocument | null> =>
  execute(async () => UserModel.findOneAndUpdate(
    { email: email.toLowerCase() },
    { $set: { role } },
    { new: true, runValidators: true }
  ));
