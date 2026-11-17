import { beforeEach, describe, expect, it } from 'vitest';
import { readAccessToken, removeAccessToken, storeAccessToken } from './session.service';

describe('session.service', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('devuelve null cuando no existe un token guardado', () => {
    expect(readAccessToken()).toBeNull();
  });

  it('guarda y devuelve un token existente', () => {
    storeAccessToken('demo-token');

    expect(readAccessToken()).toBe('demo-token');
  });

  it('elimina un token previamente guardado', () => {
    storeAccessToken('demo-token');
    removeAccessToken();

    expect(readAccessToken()).toBeNull();
  });
});
