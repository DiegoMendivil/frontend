import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error.js';
import { verifyAccessToken } from '../services/auth.service.js';

const getBearerToken = (authorization: string | undefined): string => {
  if (!authorization) {
    throw new AppError('Debes enviar un token de acceso.', 401, 'AUTHENTICATION_REQUIRED');
  }

  const parts = authorization.trim().split(/\s+/);
  const scheme = parts[0];
  const token = parts[1];

  if (parts.length !== 2 || scheme?.toLowerCase() !== 'bearer' || !token) {
    throw new AppError('El encabezado Authorization debe usar el formato Bearer <token>.', 401, 'INVALID_AUTHORIZATION_HEADER');
  }

  return token;
};

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = getBearerToken(req.header('authorization'));
    const payload = await verifyAccessToken(token);

    res.locals.auth = {
      userId: payload.sub ?? '',
      email: payload.email ?? '',
      role: payload.role ?? 'user'
    };

    next();
  } catch (error: unknown) {
    next(error);
  }
};
