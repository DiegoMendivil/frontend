import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { AppError } from '../errors/app-error.js';
import { UserModel, toUser, type User, USER_ROLES, type UserRole } from '../models/user.js';
import { createUserDocument, findUserByEmail, findUserById } from '../repositories/user.repository.js';
import { loadEnvironment } from '../config/env.js';

const getJwtSecret = (): Uint8Array => new TextEncoder().encode(loadEnvironment().jwtSecret);

export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 12);

export const verifyPassword = async (password: string, passwordHash: string): Promise<boolean> =>
  bcrypt.compare(password, passwordHash);

export const signAccessToken = async (user: User): Promise<string> => {
  const env = loadEnvironment();

  return new SignJWT({
    email: user.email,
    role: user.role
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuer(env.jwtIssuer)
    .setAudience(env.jwtAudience)
    .setIssuedAt()
    .setExpirationTime(env.jwtExpiresIn)
    .sign(getJwtSecret());
};

export const verifyAccessToken = async (token: string): Promise<JWTPayload & { sub?: string; email?: string; role?: UserRole }> => {
  const env = loadEnvironment();

  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), {
      issuer: env.jwtIssuer,
      audience: env.jwtAudience
    });

    const sub = payload.sub;
    const email = payload.email;
    const role = payload.role;

    if (!sub || !email || typeof email !== 'string' || !role || typeof role !== 'string' || !USER_ROLES.includes(role as UserRole)) {
      throw new AppError('El token de acceso no es válido o ha expirado.', 401, 'INVALID_TOKEN');
    }

    return payload as JWTPayload & { sub: string; email: string; role: UserRole };
  } catch (error: unknown) {
    if (error instanceof AppError) throw error;
    throw new AppError('El token de acceso no es válido o ha expirado.', 401, 'INVALID_TOKEN');
  }
};

export const registerUser = async (input: { name: string; email: string; password: string }): Promise<{ token: string; user: User }> => {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new AppError('Ya existe un usuario con ese correo.', 409, 'USER_ALREADY_EXISTS');
  }

  const passwordHash = await hashPassword(input.password);
  const userDocument = await createUserDocument({
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    passwordHash
  });

  const user = toUser(userDocument);
  const token = await signAccessToken(user);
  return { token, user };
};

export const loginUser = async (input: { email: string; password: string }): Promise<{ token: string; user: User }> => {
  const userDocument = await UserModel.findOne({ email: input.email.trim().toLowerCase() });
  if (!userDocument) {
    throw new AppError('Credenciales inválidas.', 401, 'INVALID_CREDENTIALS');
  }

  const matches = await verifyPassword(input.password, userDocument.passwordHash);
  if (!matches) {
    throw new AppError('Credenciales inválidas.', 401, 'INVALID_CREDENTIALS');
  }

  const user = toUser(userDocument);
  const token = await signAccessToken(user);
  return { token, user };
};

export const getAuthenticatedUser = async (id: string): Promise<User> => {
  const userDocument = await findUserById(id);
  if (!userDocument) {
    throw new AppError('La identidad autenticada ya no existe.', 401, 'INVALID_TOKEN');
  }
  return toUser(userDocument);
};
