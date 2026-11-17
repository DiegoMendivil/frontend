import assert from 'node:assert/strict';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import test from 'node:test';
import { app } from '../src/app.js';
import { validateTaskId } from '../src/middlewares/validate-task-id.middleware.js';
import { validateTaskQuery } from '../src/middlewares/validate-task-query.middleware.js';
import { validateTaskUpdate } from '../src/middlewares/validate-task-update.middleware.js';
import { TASK_STATUSES, TaskModel } from '../src/models/task.js';
import { signAccessToken } from '../src/services/auth.service.js';

const validId = '507f1f77bcf86cd799439011';
const invalidId = '123';

test('TaskModel is available and configured as a MongoDB model', () => {
  assert.ok(TaskModel);
  assert.strictEqual(typeof TaskModel.modelName, 'string');
  assert.strictEqual(TaskModel.modelName, 'Task');
  assert.deepEqual(TASK_STATUSES, ['pending', 'completed']);
});

test('validateTaskId accepts valid Mongo ObjectId values and rejects invalid ones', () => {
  let nextCalled = false;
  let statusCode: number | undefined;

  const req = { params: { id: validId } } as any;
  const res = { locals: {} } as any;
  const next = (error?: unknown) => {
    nextCalled = true;
    if (error) {
      statusCode = (error as any).statusCode;
    }
  };

  validateTaskId(req, res, next);
  assert.strictEqual(nextCalled, true);
  assert.strictEqual(res.locals.taskId, validId);

  nextCalled = false;
  statusCode = undefined;
  const reqInvalid = { params: { id: invalidId } } as any;
  validateTaskId(reqInvalid, res, next);
  assert.strictEqual(nextCalled, true);
  assert.strictEqual(statusCode, 400);
});

test('validateTaskUpdate accepts partial changes and rejects invalid fields', () => {
  const req = { body: { title: 'Nuevo título' } } as any;
  const res = { locals: {} } as any;
  let nextCalled = false;
  let errorForwarded: any;
  validateTaskUpdate(req, res, (error?: unknown) => {
    nextCalled = true;
    errorForwarded = error;
  });
  assert.strictEqual(nextCalled, true);
  assert.strictEqual(errorForwarded, undefined);
  assert.strictEqual(res.locals.taskUpdate.title, 'Nuevo título');

  const badReq = { body: { owner: 'Ana' } } as any;
  const badRes = { locals: {} } as any;
  validateTaskUpdate(badReq, badRes, (error?: unknown) => {
    errorForwarded = error;
  });
  assert.ok(errorForwarded);
  assert.strictEqual((errorForwarded as any).statusCode, 422);
});

test('validateTaskQuery normalizes allowed query parameters and defaults', () => {
  const req = { query: { page: '2', limit: '5', status: 'pending', search: ' api ', sortBy: 'title', order: 'desc' } } as any;
  const res = { locals: {} } as any;
  let forwardedError: unknown;
  validateTaskQuery(req, res, (error?: unknown) => { forwardedError = error; });
  assert.strictEqual(forwardedError, undefined);
  assert.deepEqual(res.locals.taskQuery, {
    page: 2,
    limit: 5,
    status: 'pending',
    search: 'api',
    sortBy: 'title',
    order: 'desc'
  });

  const defaultRes = { locals: {} } as any;
  validateTaskQuery({ query: {} } as any, defaultRes, () => undefined);
  assert.deepEqual(defaultRes.locals.taskQuery, { page: 1, limit: 10, sortBy: 'createdAt', order: 'asc' });
});

test('validateTaskQuery rejects invalid and unknown query parameters with field details', () => {
  const cases = [
    { page: '0' },
    { page: 'abc' },
    { limit: '51' },
    { status: 'archived' },
    { search: '   ' },
    { sortBy: 'priority' },
    { order: 'sideways' },
    { owner: 'ana' },
    { page: ['1', '2'] }
  ];
  for (const query of cases) {
    let forwardedError: any;
    validateTaskQuery({ query } as any, { locals: {} } as any, (error?: unknown) => { forwardedError = error; });
    assert.strictEqual(forwardedError?.statusCode, 422, JSON.stringify(query));
    assert.strictEqual(forwardedError?.code, 'QUERY_VALIDATION_ERROR', JSON.stringify(query));
    assert.ok(Array.isArray(forwardedError?.details), JSON.stringify(query));
  }
});

test('GET /api/tasks returns the uniform 422 response for invalid query input', async () => {
  const server = app.listen(0);
  await once(server, 'listening');
  const address = server.address() as AddressInfo;

  try {
    const token = await signAccessToken({
      id: '507f1f77bcf86cd799439011',
      name: 'Ana',
      email: 'ana@example.com',
      role: 'user',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z')
    });

    const response = await fetch(`http://127.0.0.1:${address.port}/api/tasks?owner=ana`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const body = await response.json() as any;
    assert.strictEqual(response.status, 422);
    assert.strictEqual(body.error.code, 'QUERY_VALIDATION_ERROR');
    assert.ok(Array.isArray(body.error.details));
    assert.strictEqual(body.error.details[0].field, 'owner');
    assert.strictEqual(typeof body.error.requestId, 'string');
  } finally {
    server.close();
    await once(server, 'close');
  }
});
