import type { RequestHandler } from 'express';
import { AppError } from '../errors/app-error.js';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeString = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';

const reject = (field: string, message: string) => ({ field, message });

export const validateRegister: RequestHandler = (req, _res, next) => {
  if (!isRecord(req.body)) {
    next(new AppError('La solicitud contiene datos inválidos.', 422, 'AUTH_VALIDATION_ERROR', [{ field: 'body', message: 'Debe ser un objeto JSON.' }]));
    return;
  }

  const issues: Array<{ field: string; message: string }> = [];
  const name = normalizeString(req.body.name);
  const email = normalizeString(req.body.email).toLowerCase();
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (name.length < 2 || name.length > 80) {
    issues.push(reject('name', 'Debe tener entre 2 y 80 caracteres.'));
  }

  if (!emailPattern.test(email)) {
    issues.push(reject('email', 'Debe ser un correo válido.'));
  }

  if (password.length < 8 || password.length > 128) {
    issues.push(reject('password', 'Debe tener entre 8 y 128 caracteres.'));
  }

  if (issues.length > 0) {
    next(new AppError('La solicitud contiene datos inválidos.', 422, 'AUTH_VALIDATION_ERROR', issues));
    return;
  }

  req.body.name = name;
  req.body.email = email;
  req.body.password = password;
  _res.locals.authRegister = { name, email, password };
  next();
};

export const validateLogin: RequestHandler = (req, _res, next) => {
  if (!isRecord(req.body)) {
    next(new AppError('La solicitud contiene datos inválidos.', 422, 'AUTH_VALIDATION_ERROR', [{ field: 'body', message: 'Debe ser un objeto JSON.' }]));
    return;
  }

  const issues: Array<{ field: string; message: string }> = [];
  const email = normalizeString(req.body.email).toLowerCase();
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!emailPattern.test(email)) {
    issues.push(reject('email', 'Debe ser un correo válido.'));
  }

  if (password.length < 8 || password.length > 128) {
    issues.push(reject('password', 'Debe tener entre 8 y 128 caracteres.'));
  }

  if (issues.length > 0) {
    next(new AppError('La solicitud contiene datos inválidos.', 422, 'AUTH_VALIDATION_ERROR', issues));
    return;
  }

  req.body.email = email;
  req.body.password = password;
  _res.locals.authLogin = { email, password };
  next();
};
