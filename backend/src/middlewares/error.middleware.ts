import type { ErrorRequestHandler } from 'express';
import { AppError } from '../errors/app-error.js';

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
  const appError = error instanceof AppError
    ? error
    : new AppError('Ocurrió un error interno.', 500, 'INTERNAL_ERROR');
  res.status(appError.statusCode).json({
    error: {
      code: appError.code,
      message: appError.message,
      details: appError.details ?? undefined,
      requestId: res.locals.requestId ?? 'unknown'
    }
  });
};