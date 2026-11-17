import type { AccessTokenSubject } from './auth.js';

declare global {
  namespace Express {
    interface Locals {
      requestId?: string;
      auth?: AccessTokenSubject;
    }
  }
}

export {};
