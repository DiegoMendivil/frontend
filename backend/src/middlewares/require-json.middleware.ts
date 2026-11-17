import type { RequestHandler } from 'express';
import { AppError } from '../errors/app-error.js';

export const requireJson: RequestHandler = (req, _res, next) => {
  if (!req.is('application/json')) {
    next(new AppError('El Content-Type debe ser application/json.', 415, 'UNSUPPORTED_MEDIA_TYPE'));
    return;
  }
  next();
};