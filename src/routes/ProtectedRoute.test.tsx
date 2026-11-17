import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';
import { AuthContext } from '../context/auth-context';
import { ProtectedRoute } from './ProtectedRoute';

describe('ProtectedRoute', () => {
  it('redirige al login cuando el usuario no está autenticado', () => {
    render(
      <AuthContext.Provider value={{
        status: 'anonymous',
        user: null,
        accessToken: null,
        sessionMessage: '',
        login: async () => ({ id: '1', name: 'Ana', email: 'ana@test.com', role: 'user', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' }),
        register: async () => ({ id: '1', name: 'Ana', email: 'ana@test.com', role: 'user', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' }),
        logout: () => undefined,
        retrySession: async () => undefined,
        clearSessionMessage: () => undefined,
      }}>
        <MemoryRouter initialEntries={['/tasks']}>
          <Routes>
            <Route path="/login" element={<div>Login page</div>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<div>Tasks page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
