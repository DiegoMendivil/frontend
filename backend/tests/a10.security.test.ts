import assert from 'node:assert/strict';
import test from 'node:test';
import { loadEnvironment } from '../src/config/env.js';
import { authenticate } from '../src/middlewares/authenticate.middleware.js';
import { requireRole } from '../src/middlewares/authorize.middleware.js';

const setEnv = () => {
  process.env.PORT = '3000';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/task_api_test';
  process.env.MONGODB_DB_NAME = 'task_api_test';
  process.env.JWT_SECRET = '12345678901234567890123456789012';
  process.env.JWT_EXPIRES_IN = '1h';
  process.env.JWT_ISSUER = 'task-api-test';
  process.env.JWT_AUDIENCE = 'task-api-clients';
  process.env.CORS_ORIGIN = 'http://localhost:5173';
  process.env.AUTH_RATE_LIMIT_WINDOW_MS = '900000';
  process.env.AUTH_RATE_LIMIT_MAX = '10';
};

test('loadEnvironment includes security configuration values', () => {
  setEnv();
  const env = loadEnvironment();
  assert.strictEqual(env.corsOrigin, 'http://localhost:5173');
  assert.strictEqual(env.authRateLimitWindowMs, 900000);
  assert.strictEqual(env.authRateLimitMax, 10);
});

test('authenticate rejects missing or malformed Authorization headers', async () => {
  setEnv();
  let forwardedError: unknown;
  const req = { header: () => undefined } as any;
  const res = { locals: {} } as any;

  await authenticate(req, res, (error?: unknown) => {
    forwardedError = error;
  });
  assert.ok(forwardedError);
  assert.strictEqual((forwardedError as any).statusCode, 401);

  const malformedReq = { header: () => 'Token abc' } as any;
  const malformedRes = { locals: {} } as any;
  forwardedError = undefined;
  await authenticate(malformedReq, malformedRes, (error?: unknown) => {
    forwardedError = error;
  });
  assert.ok(forwardedError);
  assert.strictEqual((forwardedError as any).statusCode, 401);
});

test('requireRole blocks unauthenticated and non-admin requests', () => {
  let forwardedError: any;

  requireRole('admin')({} as any, { locals: {} } as any, (error?: unknown) => {
    forwardedError = error;
  });
  assert.ok(forwardedError);
  assert.strictEqual(forwardedError.statusCode, 401);

  forwardedError = undefined;
  requireRole('admin')({} as any, { locals: { auth: { userId: '123', email: 'a@b.com', role: 'user' } } } as any, (error?: unknown) => {
    forwardedError = error;
  });
  assert.ok(forwardedError);
  assert.strictEqual(forwardedError.statusCode, 403);
});
