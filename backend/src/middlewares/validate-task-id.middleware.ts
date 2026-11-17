import type { RequestHandler } from 'express';
import { Types } from 'mongoose';
import { AppError } from '../errors/app-error.js';

export const validateTaskId: RequestHandler = (req, _res, next) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id || !Types.ObjectId.isValid(id)) {
    next(new AppError('El identificador de tarea no es válido.', 400, 'INVALID_ID'));
    return;
  }
  _res.locals.taskId = id;
  next();
};