import type { RequestHandler } from 'express';
import { AppError } from '../errors/app-error.js';

export const notFound: RequestHandler = (req, _res, next) => {
  next(new AppError(`No existe la ruta ${req.method} ${req.path}.`, 404, 'ROUTE_NOT_FOUND'));
};