import { useState } from 'react';
import { AsyncStatus } from '../components/AsyncStatus';
import { TaskFilters } from '../components/TaskFilters';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskPagination } from '../components/TaskPagination';
import { TaskSummary } from '../components/TaskSummary';
import { useAuth } from '../hooks/useAuth';
import { useTaskList } from '../hooks/useTaskList';
import type { SortOrder, TaskListQuery, TaskSortField } from '../models/api.types';
import type { Task } from '../models/task.interface';
import type { TaskFilter, TaskSort } from '../models/task-view.types';
import { getHttpErrorMessage } from '../services/http.service';
import { createTask, deleteTask, updateTask } from '../services/task.api.service';

const PAGE_SIZE = 5;

function mapSort(sort: TaskSort): { sortBy: TaskSortField; order: SortOrder } {
  switch (sort) {
    case 'updated-asc':
      return { sortBy: 'updatedAt', order: 'asc' };
    case 'title-asc':
      return { sortBy: 'title', order: 'asc' };
    case 'title-desc':
      return { sortBy: 'title', order: 'desc' };
    case 'updated-desc':
    default:
      return { sortBy: 'updatedAt', order: 'desc' };
  }
}

export function TasksPage() {
  const { accessToken, user } = useAuth();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sort, setSort] = useState<TaskSort>('updated-desc');
  const [page, setPage] = useState(1);
  const [isMutating, setIsMutating] = useState(false);
  const [operationMessage, setOperationMessage] = useState('');
  const [operationFailed, setOperationFailed] = useState(false);
  const canDelete = user?.role === 'admin';
  const mappedSort = mapSort(sort);
  const taskListQuery: TaskListQuery = {
    page,
    limit: PAGE_SIZE,
    search: query.trim() || undefined,
    status: filter === 'all' ? undefined : filter,
    sortBy: mappedSort.sortBy,
    order: mappedSort.order,
  };
  const { tasks, meta, status, errorMessage, reload } = useTaskList(taskListQuery, accessToken);

  function requireToken(): string | null {
    if (accessToken) return accessToken;
    setOperationFailed(true);
    setOperationMessage('La sesión no está disponible. Inicia sesión nuevamente.');
    return null;
  }

  async function runMutation(operation: () => Promise<unknown>, successMessage: string): Promise<boolean> {
    setIsMutating(true);
    setOperationMessage('');
    setOperationFailed(false);
    try {
      await operation();
      setOperationMessage(successMessage);
      return true;
    } catch (error) {
      setOperationFailed(true);
      setOperationMessage(getHttpErrorMessage(error));
      return false;
    } finally {
      setIsMutating(false);
    }
  }

  function refreshAfterMutation() {
    if (page !== 1) {
      setPage(1);
      return;
    }
    reload();
  }

  async function handleAddTask(title: string): Promise<boolean> {
    const token = requireToken();
    if (!token) return false;
    const created = await runMutation(() => createTask({ title }, token), 'La tarea fue creada.');
    if (created) refreshAfterMutation();
    return created;
  }

  async function handleToggleStatus(task: Task): Promise<boolean> {
    const token = requireToken();
    if (!token) return false;
    const nextStatus = task.status === 'pending' ? 'completed' : 'pending';
    const updated = await runMutation(
      () => updateTask(task.id, { status: nextStatus }, token),
      'El estado fue actualizado.',
    );
    if (updated) reload();
    return updated;
  }

  async function handleEditTask(task: Task, title: string): Promise<boolean> {
    const token = requireToken();
    if (!token) return false;
    const updated = await runMutation(
      () => updateTask(task.id, { title }, token),
      'El título fue actualizado.',
    );
    if (updated) reload();
    return updated;
  }

  async function handleDeleteTask(task: Task): Promise<boolean> {
    const token = requireToken();
    if (!token) return false;
    if (!canDelete) {
      setOperationFailed(true);
      setOperationMessage('Solo el rol admin puede eliminar tareas.');
      return false;
    }
    const confirmed = window.confirm(`¿Eliminar la tarea "${task.title}"?`);
    if (!confirmed) return false;

    const deleted = await runMutation(() => deleteTask(task.id, token), 'La tarea fue eliminada.');
    if (deleted) {
      if (tasks.length === 1 && page > 1) setPage(page - 1);
      else reload();
    }
    return deleted;
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function handleFilterChange(value: TaskFilter) {
    setFilter(value);
    setPage(1);
  }

  function handleSortChange(value: TaskSort) {
    setSort(value);
    setPage(1);
  }

  function handleClear() {
    setQuery('');
    setFilter('all');
    setSort('updated-desc');
    setPage(1);
    setOperationMessage('');
  }

  return (
    <div className="page-stack">
      <section className="page-introduction" aria-labelledby="tasks-page-title">
        <p className="section-heading__eyebrow">Gestión autenticada</p>
        <h2 id="tasks-page-title">Tareas</h2>
        <p>Sesión de {user?.name}. Los cambios se guardan automáticamente.</p>
        {!canDelete && <p className="permission-note">Tu rol puede consultar, crear y actualizar. La eliminación requiere admin.</p>}
      </section>
      <TaskForm isSubmitting={isMutating} onAddTask={handleAddTask} />
      {operationMessage && (
        <p className={operationFailed ? 'operation-message operation-message--error' : 'operation-message'} role={operationFailed ? 'alert' : 'status'}>
          {operationMessage}
        </p>
      )}
      <TaskFilters
        query={query}
        filter={filter}
        sortBy={sort}
        resultCount={meta.total}
        isLoading={status === 'loading'}
        onQueryChange={handleQueryChange}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onClear={handleClear}
      />
      <AsyncStatus status={status} errorMessage={errorMessage} onRetry={reload} />
      {status !== 'error' && (
        <>
          {status !== 'loading' && <TaskSummary tasks={tasks} total={meta.total} />}
          {status !== 'loading' && (
            <TaskList
              tasks={tasks}
              emptyMessage="Utiliza los filtros para encontrar tareas o registra una nueva."
              canDelete={canDelete}
              onToggleStatus={handleToggleStatus}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
          <TaskPagination meta={meta} disabled={status === 'loading' || isMutating} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
