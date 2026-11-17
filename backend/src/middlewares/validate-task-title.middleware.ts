import type { RequestHandler } from 'express';
import { AppError } from '../errors/app-error.js';

export const validateTaskTitle: RequestHandler = (req, _res, next) => {
  const title: unknown = req.body?.title;
  if (typeof title !== 'string' || title.trim().length === 0 || title.trim().length > 120) {
    next(new AppError('title debe ser texto de 1 a 120 caracteres.', 422, 'VALIDATION_ERROR'));
    return;
  }
  req.body.title = title.trim();
  next();
};