import { describe, expect, it } from 'vitest';
import { TASK_TITLE_MAX_LENGTH, validateTaskTitle } from './task-validation';

describe('validateTaskTitle', () => {
  it('devuelve error cuando el título está vacío', () => {
    expect(validateTaskTitle('   ')).toBe('Escribe el título de la tarea.');
  });

  it('devuelve error cuando el título tiene menos de 3 caracteres', () => {
    expect(validateTaskTitle('ab')).toBe('El título debe tener al menos 3 caracteres.');
  });

  it('devuelve error cuando supera el máximo permitido', () => {
    const value = 'a'.repeat(TASK_TITLE_MAX_LENGTH + 1);
    expect(validateTaskTitle(value)).toBe(`El título no puede superar ${TASK_TITLE_MAX_LENGTH} caracteres.`);
  });

  it('acepta un título válido', () => {
    expect(validateTaskTitle('  Revisar tareas pendientes  ')).toBeNull();
  });
});
