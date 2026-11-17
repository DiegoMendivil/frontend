import type { Request, Response } from 'express';
import { getAuthenticatedUser, loginUser, registerUser } from '../services/auth.service.js';

export const registerController = async (_req: Request, res: Response): Promise<void> => {
  const { name, email, password } = res.locals.authRegister as {
    name: string;
    email: string;
    password: string;
  };

  const result = await registerUser({ name, email, password });
  res.status(201).json({ data: { token: result.token, user: result.user } });
};

export const loginController = async (_req: Request, res: Response): Promise<void> => {
  const { email, password } = res.locals.authLogin as {
    email: string;
    password: string;
  };

  const result = await loginUser({ email, password });
  res.status(200).json({ data: { token: result.token, user: result.user } });
};

export const getCurrentUserController = async (_req: Request, res: Response): Promise<void> => {
  const auth = res.locals.auth as { userId: string; role: string } | undefined;

  if (!auth) {
    res.status(401).json({
      error: {
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Debes enviar un token de acceso.',
        requestId: res.locals.requestId ?? 'unknown'
      }
    });
    return;
  }

  const user = await getAuthenticatedUser(auth.userId);
  res.status(200).json({ data: { user } });
};
