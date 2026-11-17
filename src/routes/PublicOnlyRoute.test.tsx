import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';
import { AuthContext } from '../context/auth-context';
import { PublicOnlyRoute } from './PublicOnlyRoute';

describe('PublicOnlyRoute', () => {
  it('redirige a /tasks cuando el usuario ya está autenticado', () => {
    render(
      <AuthContext.Provider value={{
        status: 'authenticated',
        user: { id: '1', name: 'Ana', email: 'ana@test.com', role: 'user', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
        accessToken: 'abc',
        sessionMessage: '',
        login: async () => ({ id: '1', name: 'Ana', email: 'ana@test.com', role: 'user', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' }),
        register: async () => ({ id: '1', name: 'Ana', email: 'ana@test.com', role: 'user', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' }),
        logout: () => undefined,
        retrySession: async () => undefined,
        clearSessionMessage: () => undefined,
      }}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/tasks" element={<div>Tasks page</div>} />
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<div>Login page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByText('Tasks page')).toBeInTheDocument();
  });
});
