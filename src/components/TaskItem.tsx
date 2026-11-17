import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import type { Task } from '../models/task.interface';
import { TASK_TITLE_MAX_LENGTH, validateTaskTitle } from '../utils/task-validation';
import { formatTaskDate } from '../utils/date';

interface TaskItemProps {
  task: Task;
  canDelete: boolean;
  onToggleStatus: (task: Task) => Promise<boolean>;
  onEditTask: (task: Task, title: string) => Promise<boolean>;
  onDeleteTask: (task: Task) => Promise<boolean>;
}

export function TaskItem({ task, canDelete, onToggleStatus, onEditTask, onDeleteTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [error, setError] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  function startEditing() {
    setDraftTitle(task.title);
    setError('');
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraftTitle(task.title);
    setError('');
    setIsEditing(false);
  }

  function handleDraftChange(value: string) {
    setDraftTitle(value);
    if (error) setError(validateTaskTitle(value) ?? '');
  }

  async function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationMessage = validateTaskTitle(draftTitle);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setIsBusy(true);
    const wasUpdated = await onEditTask(task, draftTitle.trim());
    setIsBusy(false);
    if (wasUpdated) {
      setError('');
      setIsEditing(false);
    }
  }

  async function handleToggle() {
    setIsBusy(true);
    await onToggleStatus(task);
    setIsBusy(false);
  }

  async function handleDelete() {
    setIsBusy(true);
    await onDeleteTask(task);
    setIsBusy(false);
  }

  return (
    <article className={`task-item task-item--${task.status}`} role="listitem" aria-busy={isBusy}>
      <div className="task-item__content">
        {isEditing ? (
          <form className="task-item__edit-form" onSubmit={handleEditSubmit} noValidate>
            <label className="sr-only" htmlFor={`edit-task-${task.id}`}>Editar título de la tarea</label>
            <input
              id={`edit-task-${task.id}`}
              className="task-item__edit-input"
              value={draftTitle}
              onChange={(event) => handleDraftChange(event.target.value)}
              maxLength={TASK_TITLE_MAX_LENGTH}
              disabled={isBusy}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `edit-error-${task.id}` : undefined}
              autoFocus
            />
            {error && (
              <p id={`edit-error-${task.id}`} className="field-error" role="alert">{error}</p>
            )}
            <div className="task-item__edit-actions">
              <button type="submit" disabled={isBusy}>{isBusy ? 'Guardando...' : 'Guardar'}</button>
              <button type="button" onClick={cancelEditing} disabled={isBusy}>Cancelar</button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="task-item__title">
              <Link className="task-title-link" to={`/tasks/${task.id}`}>{task.title}</Link>
            </h3>
            <span className="task-status">{task.status === 'completed' ? 'Completada' : 'Pendiente'}</span>
            <p className="task-item__date">
              Actualizada:{' '}
              <time dateTime={task.updatedAt}>{formatTaskDate(task.updatedAt)}</time>
            </p>
          </>
        )}
      </div>
      <div className="task-item__actions" role="group" aria-label={`Acciones para ${task.title}`}>
        {!isEditing && (
          <Link className="button-link button-link--secondary" to={`/tasks/${task.id}`}>
            Ver detalle
          </Link>
        )}
        <button type="button" onClick={() => void handleToggle()} disabled={isBusy || isEditing}>
          {task.status === 'completed' ? 'Reabrir' : 'Completar'}
        </button>
        <button type="button" onClick={startEditing} disabled={isBusy || isEditing}>Editar</button>
        {canDelete && (
          <button type="button" className="button-danger" onClick={() => void handleDelete()} disabled={isBusy || isEditing}>
            {isBusy ? 'Procesando...' : 'Eliminar'}
          </button>
        )}
      </div>
    </article>
  );
}
