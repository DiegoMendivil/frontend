import assert from 'node:assert/strict';
import test from 'node:test';
import { loadEnvironment } from '../src/config/env.js';
import { validateLogin, validateRegister } from '../src/middlewares/validate-auth.middleware.js';
import { UserModel } from '../src/models/user.js';
import { signAccessToken, verifyAccessToken } from '../src/services/auth.service.js';

test('UserModel is available and configured with expected auth fields', () => {
  assert.ok(UserModel);
  assert.strictEqual(UserModel.modelName, 'User');
  assert.ok(Array.isArray(UserModel.schema.paths.email?.validators));
});

test('loadEnvironment includes JWT configuration values', () => {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/task_api_test';
  process.env.MONGODB_DB_NAME = 'task_api_test';
  process.env.JWT_SECRET = 'test-secret';
  process.env.JWT_EXPIRES_IN = '1h';
  process.env.JWT_ISSUER = 'task-api-test';
  process.env.JWT_AUDIENCE = 'task-api-clients';

  const env = loadEnvironment();
  assert.strictEqual(env.mongodbUri, 'mongodb://localhost:27017/task_api_test');
  assert.strictEqual(env.mongodbDbName, 'task_api_test');
  assert.strictEqual(env.jwtSecret, 'test-secret');
  assert.strictEqual(env.jwtExpiresIn, '1h');
  assert.strictEqual(env.jwtIssuer, 'task-api-test');
  assert.strictEqual(env.jwtAudience, 'task-api-clients');
});

test('validateRegister accepts valid payloads and rejects invalid email/password values', () => {
  const req = {
    body: {
      name: '  Ana  ',
      email: '  ana@example.com  ',
      password: 'Password123!'
    }
  } as any;
  const res = { locals: {} } as any;
  let forwardedError: any;

  validateRegister(req, res, (error?: unknown) => {
    forwardedError = error;
  });

  assert.strictEqual(forwardedError, undefined);
  assert.strictEqual(res.locals.authRegister.name, 'Ana');
  assert.strictEqual(res.locals.authRegister.email, 'ana@example.com');
  assert.strictEqual(res.locals.authRegister.password, 'Password123!');

  const badReq = { body: { name: 'A', email: 'nope', password: '123' } } as any;
  const badRes = { locals: {} } as any;
  validateRegister(badReq, badRes, (error?: unknown) => {
    forwardedError = error;
  });

  assert.ok(forwardedError);
  assert.strictEqual(forwardedError.statusCode, 422);
  assert.strictEqual(forwardedError.code, 'AUTH_VALIDATION_ERROR');
});

test('validateLogin requires email and password on the request body', () => {
  const req = { body: { email: ' user@example.com ', password: 'Password123!' } } as any;
  const res = { locals: {} } as any;
  let forwardedError: any;

  validateLogin(req, res, (error?: unknown) => {
    forwardedError = error;
  });

  assert.strictEqual(forwardedError, undefined);
  assert.strictEqual(res.locals.authLogin.email, 'user@example.com');
  assert.strictEqual(res.locals.authLogin.password, 'Password123!');

  const badReq = { body: { email: 'bad' } } as any;
  const badRes = { locals: {} } as any;
  validateLogin(badReq, badRes, (error?: unknown) => {
    forwardedError = error;
  });

  assert.ok(forwardedError);
  assert.strictEqual(forwardedError.statusCode, 422);
  assert.strictEqual(forwardedError.code, 'AUTH_VALIDATION_ERROR');
});

test('signAccessToken and verifyAccessToken round-trip a valid JWT payload', async () => {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/task_api_test';
  process.env.MONGODB_DB_NAME = 'task_api_test';
  process.env.JWT_SECRET = 'test-secret';
  process.env.JWT_EXPIRES_IN = '1h';
  process.env.JWT_ISSUER = 'task-api-test';
  process.env.JWT_AUDIENCE = 'task-api-clients';

  const token = await signAccessToken({
    id: '507f1f77bcf86cd799439011',
    name: 'Ana',
    email: 'ana@example.com',
    role: 'user',
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  });

  const payload = await verifyAccessToken(token);
  assert.strictEqual(payload.sub, '507f1f77bcf86cd799439011');
  assert.strictEqual(payload.email, 'ana@example.com');
  assert.strictEqual(payload.role, 'user');
});
