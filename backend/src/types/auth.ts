import type { User, UserRole } from '../models/user.js';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AccessTokenSubject {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
