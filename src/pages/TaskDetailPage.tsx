import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import type { Task } from '../models/task.interface';
import { getHttpErrorMessage, isAbortError, isHttpError } from '../services/http.service';
import { deleteTask, getTaskById } from '../services/task.api.service';
import { formatTaskDate } from '../utils/date';
import { NotFoundPage } from './NotFoundPage';

type DetailResult =
  | { taskId: string; status: 'success'; task: Task }
  | { taskId: string; status: 'not-found' | 'error'; errorMessage: string };

export function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  const [result, setResult] = useState<DetailResult | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canDelete = user?.role === 'admin';

  useEffect(() => {
    if (!taskId || !accessToken) return undefined;
    const requestedTaskId = taskId;
    const token = accessToken;

    const controller = new AbortController();
    async function loadTask() {
      try {
        const response = await getTaskById(requestedTaskId, token, controller.signal);
        setResult({ taskId: requestedTaskId, status: 'success', task: response.data.task });
      } catch (error) {
        if (isAbortError(error)) return;
        if (isHttpError(error) && error.status === 404) {
          setResult({ taskId: requestedTaskId, status: 'not-found', errorMessage: '' });
          return;
        }
        setResult({ taskId: requestedTaskId, status: 'error', errorMessage: getHttpErrorMessage(error) });
      }
    }

    void loadTask();
    return () => controller.abort();
  }, [taskId, accessToken, reloadKey]);

  const currentResult = result?.taskId === taskId ? result : null;
  const task = currentResult?.status === 'success' ? currentResult.task : null;

  async function handleDelete() {
    if (!task || !accessToken || !canDelete) return;
    const confirmed = window.confirm(`¿Eliminar la tarea "${task.title}"?`);
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteTask(task.id, accessToken);
      navigate('/tasks', { replace: true });
    } catch (error) {
      setResult({ taskId: task.id, status: 'error', errorMessage: getHttpErrorMessage(error) });
      setIsDeleting(false);
    }
  }

  if (!taskId) {
    return <NotFoundPage title="Tarea no encontrada" message="La dirección no contiene un identificador de tarea válido." />;
  }
  if (!accessToken) {
    return <section className="panel" role="alert"><h2>Sesión no disponible</h2><p>Inicia sesión nuevamente para consultar esta tarea.</p></section>;
  }
  if (!currentResult) {
    return <p className="request-status" role="status">Consultando tarea...</p>;
  }
  if (currentResult.status === 'not-found') {
    return <NotFoundPage title="Tarea no encontrada" message="La tarea no existe o fue eliminada." />;
  }
  if (currentResult.status === 'error') {
    return (
      <section className="panel" role="alert">
        <h2>No fue posible consultar la tarea</h2>
        <p>{currentResult.errorMessage}</p>
        <button type="button" onClick={() => setReloadKey((current) => current + 1)}>Reintentar</button>
      </section>
    );
  }

  if (currentResult.status !== 'success' || !task) return null;

  return (
    <article className="panel task-detail" aria-labelledby="task-detail-title">
      <p className="section-heading__eyebrow">Detalle remoto</p>
      <h2 id="task-detail-title">{task.title}</h2>
      <dl className="task-detail__grid">
        <div><dt>Identificador</dt><dd>{task.id}</dd></div>
        <div><dt>Estado</dt><dd>{task.status === 'completed' ? 'Completada' : 'Pendiente'}</dd></div>
        <div><dt>Fecha de creación</dt><dd><time dateTime={task.createdAt}>{formatTaskDate(task.createdAt)}</time></dd></div>
        <div><dt>Última actualización</dt><dd><time dateTime={task.updatedAt}>{formatTaskDate(task.updatedAt)}</time></dd></div>
      </dl>
      {!canDelete && <p className="permission-note">La eliminación requiere el rol admin.</p>}
      <div className="task-detail__actions">
        <Link className="button-link button-link--secondary" to="/tasks">Volver a tareas</Link>
        {canDelete && (
          <button type="button" className="button-danger" disabled={isDeleting} onClick={() => void handleDelete()}>
            {isDeleting ? 'Eliminando...' : 'Eliminar tarea'}
          </button>
        )}
      </div>
    </article>
  );
}
