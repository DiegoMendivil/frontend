import type { ApiDataResponse } from '../models/api.types';
import type {
  AuthUser,
  LoginCredentials,
  LoginData,
  MeData,
  RegisterCredentials,
  RegisterData,
} from '../models/auth.types';
import { HttpError, httpRequest } from './http.service';

interface BackendLoginData {
  user: AuthUser;
  accessToken?: string;
  token?: string;
  tokenType?: string;
  expiresIn?: string;
}

function normalizeLoginResponse(response: ApiDataResponse<BackendLoginData>): ApiDataResponse<LoginData> {
  const accessToken = response.data.accessToken ?? response.data.token;
  if (!accessToken) {
    throw new HttpError({
      status: 0,
      code: 'INVALID_LOGIN_RESPONSE',
      message: 'La respuesta de inicio de sesión no incluyó un token de acceso.',
    });
  }

  return {
    data: {
      user: response.data.user,
      accessToken,
      tokenType: 'Bearer',
      expiresIn: response.data.expiresIn,
    },
  };
}

export function registerUser(credentials: RegisterCredentials): Promise<ApiDataResponse<RegisterData>> {
  return httpRequest<ApiDataResponse<RegisterData>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function loginUser(credentials: LoginCredentials): Promise<ApiDataResponse<LoginData>> {
  const response = await httpRequest<ApiDataResponse<BackendLoginData>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return normalizeLoginResponse(response);
}

export function getAuthenticatedUser(
  accessToken: string,
  signal?: AbortSignal,
): Promise<ApiDataResponse<MeData>> {
  return httpRequest<ApiDataResponse<MeData>>('/auth/me', { signal }, accessToken);
}
